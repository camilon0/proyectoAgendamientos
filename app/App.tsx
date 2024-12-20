import {
  Box,
  Button,
  Card,
  CardContent,
  createTheme,
  Grid,
  Modal,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  createActivity,
  deleteActivity,
  fetchActivities,
  reserveActivity,
  updateActivity,
} from "./services/api";

interface Activity {
  activityId: string;
  name: string;
  reservationDate: string;
  description: string;
  availableCapacity: number;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#F57C00", // Naranja cálido del atardecer
    },
    secondary: {
      main: "#0288D1", // Azul del agua
    },
    background: {
      default: "#FBE9E7", // Fondo beige suave inspirado en el amanecer
      paper: "#FFF3E0", // Fondo de tarjetas
    },
    error: {
      main: "#D32F2F", // Rojo fuerte
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: {
      fontWeight: 700,
      color: "#0288D1", // Azul del agua
    },
    body1: {
      color: "#37474F", // Gris oscuro
    },
    body2: {
      color: "#546E7A", // Gris medio
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 20,
        },
      },
    },
  },
});

const AppointmentApp = () => {
  //Modal Reservation
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [reservationCupo, setReservationCupo] = useState<number>(1);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [name, setName] = useState<string>("");
  const [reservationDate, setReservationDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  ///Login////////////////
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const generateActivityId = () => Math.floor(100 + Math.random() * 900);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    }
  }, []);
  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchActivities();
        setActivities(data);
      } catch (error: any) {
        console.error("Error loading activities:", error.message);
        alert(
          "No se pudieron cargar las actividades. Por favor, intente más tarde."
        );
      }
    };
    loadActivities();
  }, []);

  // Abrir modal para reservar
  const handleReserveClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setReservationModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setReservationModalOpen(false);
    setEmail("");
    setReservationCupo(1);
  };
  //crear actividad
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newActivity: Activity = {
        activityId: selectedActivity
          ? selectedActivity.activityId.toString()
          : generateActivityId().toString(),
        name,
        reservationDate,
        description,
        availableCapacity: Number(capacity),
      };

      if (selectedActivity) {
        await updateActivity(selectedActivity.activityId, newActivity);
        alert("Actividad actualizada con éxito");
      } else {
        await createActivity(newActivity);
        alert("Actividad creada con éxito");
      }

      const updatedActivities = await fetchActivities();
      setActivities(updatedActivities);
      resetForm();
    } catch (error) {
      console.error("Error submitting activity:", error);
      alert("Error al enviar la actividad");
    }
  };

  const resetForm = () => {
    setName("");
    setReservationDate("");
    setDescription("");
    setCapacity("");
    setSelectedActivity(null);
  };

  const handleSelectActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setName(activity.name);
    setReservationDate(activity.reservationDate);
    setDescription(activity.description);
    setCapacity(activity.availableCapacity);
  };

  const handleDelete = async (activityId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta actividad?")) {
      try {
        await deleteActivity(activityId);
        alert("Actividad eliminada con éxito");

        // Actualiza el estado local eliminando la actividad directamente
        setActivities((prevActivities) =>
          prevActivities.filter(
            (activity) => activity.activityId !== activityId
          )
        );
      } catch (error) {
        console.error("Error deleting activity:", error);
        alert("Error eliminando la actividad");
      }
    }
  };

  const handleLogin = () => {
    if (username === "easyreserves@gmail.com" && password === "12345") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      setLoginModalOpen(false);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };
  // Enviar reserva
  const handleSubmitReservation = async () => {
    if (!selectedActivity) return;

    if (reservationCupo > selectedActivity.availableCapacity) {
      alert("No puedes reservar más cupos de los disponibles.");
      return;
    }

    try {
      // Crear reserva
      await reserveActivity({
        activityId: selectedActivity.activityId,
        name: email,
        quantity: reservationCupo,
        reservationDate: selectedActivity.reservationDate,
        status: true,
      });

      // Actualizar capacidad
      const updatedCapacity =
        selectedActivity.availableCapacity - reservationCupo;
      await updateActivity(selectedActivity.activityId, {
        ...selectedActivity,
        capacity: updatedCapacity,
      });

      // Actualizar lista de actividades
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity.activityId === selectedActivity.activityId
            ? { ...activity, capacity: updatedCapacity }
            : activity
        )
      );

      alert("Reserva realizada con éxito");
      handleCloseModal();
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      alert("Error al realizar la reserva. Intenta más tarde.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={4} padding={4} alignItems="flex-start">
        {/* Botón de login/logout */}
        <Grid item xs={12} textAlign="right">
          {isLoggedIn ? (
            <Button variant="outlined" color="secondary" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setLoginModalOpen(true)}
            >
              Admin Login
            </Button>
          )}
        </Grid>

        {/* Logo grande de la empresa (solo cuando no está logeado) */}
        {!isLoggedIn && (
          <Grid item xs={12} md={6} textAlign="center">
            <img
              src="/logo.jpg"
              alt="Logo de la empresa"
              style={{ maxWidth: "100%", height: "auto", marginBottom: "2rem" }}
            />
          </Grid>
        )}

        {/* Formulario para crear o editar actividad */}
        {isLoggedIn && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {selectedActivity ? "Editar Actividad" : "Crear Actividad"}
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Box marginBottom={2}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Box>
                  <Box marginBottom={2}>
                    <TextField
                      fullWidth
                      label="Fecha de la actividad"
                      type="date"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                    />
                  </Box>
                  <Box marginBottom={2}>
                    <TextField
                      fullWidth
                      label="Descripción"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Box>
                  <Box marginBottom={2}>
                    <TextField
                      fullWidth
                      label="Cupos disponibles"
                      type="number"
                      variant="outlined"
                      value={capacity}
                      onChange={(e) =>
                        setCapacity(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </Box>
                  <Button variant="contained" color="primary" type="submit">
                    {selectedActivity
                      ? "Actualizar Actividad"
                      : "Crear Actividad"}
                  </Button>
                  {selectedActivity && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={resetForm}
                      sx={{ marginLeft: 2 }}
                    >
                      Cancelar
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Lista de actividades */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Actividades Disponibles
              </Typography>
              <Grid container spacing={2}>
                {activities.map((activity) => (
                  <Grid item xs={12} sm={6} key={activity.activityId}>
                    <Card
                      onClick={() => handleSelectActivity(activity)}
                      sx={{
                        cursor: "pointer",
                        border:
                          selectedActivity?.activityId === activity.activityId
                            ? "2px solid #1976d2"
                            : "1px solid #e0e0e0",
                        backgroundColor:
                          selectedActivity?.activityId === activity.activityId
                            ? "#e3f2fd"
                            : "white",
                      }}
                    >
                      <CardContent>
                        <Typography variant="body1" fontWeight="bold">
                          {activity.name}
                        </Typography>
                        <Typography variant="body2">
                          Fecha: {activity.reservationDate}
                        </Typography>
                        <Typography variant="body2">
                          {activity.description}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          Cupos: {activity.availableCapacity || 0}
                        </Typography>

                        {isLoggedIn && (
                          <Box marginTop={2}>
                            <Button
                              onClick={() => handleDelete(activity.activityId)}
                              color="error"
                              variant="contained"
                              size="small"
                            >
                              Eliminar
                            </Button>
                          </Box>
                        )}

                        {!isLoggedIn && (
                          <Box marginTop={2}>
                            <Button
                              onClick={() => handleReserveClick(activity)}
                              disabled={activity.availableCapacity <= 0}
                              color="primary"
                              variant="contained"
                              size="small"
                            >
                              Reservar
                            </Button>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* Modal para reservar */}
        <Modal open={reservationModalOpen} onClose={handleCloseModal}>
          <Box
            onClick={(e) => e.stopPropagation()} // Prevenir la propagación
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Reservar: {selectedActivity?.name}
            </Typography>
            <Typography variant="body2">
              Fecha de la actividad: {selectedActivity?.reservationDate}
            </Typography>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Cupos"
              type="number"
              variant="outlined"
              value={reservationCupo}
              onChange={(e) =>
                setReservationCupo(
                  Math.max(
                    1,
                    Math.min(
                      Number(e.target.value),
                      selectedActivity?.availableCapacity || 1
                    )
                  )
                )
              }
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitReservation}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Confirmar Reserva
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
              fullWidth
              sx={{ marginTop: 1 }}
            >
              Cancelar
            </Button>
          </Box>
        </Modal>

        {/* Modal de inicio de sesión */}
        <Modal open={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" marginBottom={2}>
              Iniciar sesión
            </Typography>
            <TextField
              fullWidth
              label="Usuario"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
              >
                Iniciar sesión
              </Button>
            </Box>
          </Box>
        </Modal>
      </Grid>
    </ThemeProvider>
  );
};

export default AppointmentApp;
