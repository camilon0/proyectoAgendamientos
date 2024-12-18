import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  createActivity,
  deleteActivity,
  fetchActivities,
  updateActivity,
} from "./services/api";

// Definir tipos para las actividades
interface Activity {
  activityId: number; // Cambiado a número
  name: string;
  reservationDate: string; // Renombrado
  description: string; // Renombrado
  capacity: number; // Renombrado y definido como número
}

const AppointmentApp = () => {
  const [activities, setActivities] = useState<Activity[]>([]); // Lista de actividades
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  ); // Actividad seleccionada
  const [name, setName] = useState<string>("");
  const [reservationDate, setReservationDate] = useState<string>(""); // Renombrado
  const [description, setDescription] = useState<string>(""); // Renombrado
  const [capacity, setCapacity] = useState<number | "">(""); // Campo numérico

  // Generar activityId aleatorio
  const generateActivityId = () => Math.floor(100 + Math.random() * 900);

  // Cargar actividades al inicio
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

  // Manejar el envío del formulario para crear o actualizar una actividad
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newActivity = {
        activityId: selectedActivity
          ? selectedActivity.activityId
          : generateActivityId(),
        name,
        reservationDate,
        description,
        capacity: Number(capacity), // Convertir capacidad a número
      };

      if (selectedActivity) {
        // Actualizar actividad existente
        await updateActivity(selectedActivity.activityId, newActivity);
        alert("Actividad actualizada con éxito");
      } else {
        // Crear nueva actividad
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

  // Resetear el formulario
  const resetForm = () => {
    setName("");
    setReservationDate("");
    setDescription("");
    setCapacity("");
    setSelectedActivity(null);
  };

  // Manejar la selección de una actividad
  const handleSelectActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setName(activity.name);
    setReservationDate(activity.reservationDate);
    setDescription(activity.description);
    setCapacity(activity.capacity);
  };

  // Manejar la eliminación de una actividad
  const handleDelete = async (activityId: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta actividad?")) {
      try {
        await deleteActivity(activityId);
        alert("Actividad eliminada con éxito");
        const updatedActivities = await fetchActivities();
        setActivities(updatedActivities);
      } catch (error) {
        console.error("Error deleting activity:", error);
        alert("Error eliminando la actividad");
      }
    }
  };

  return (
    <Grid container spacing={4} padding={4}>
      {/* Formulario para crear o editar actividad */}
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
                  label="Fecha de Reservación"
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
                  label="Capacidad"
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
                {selectedActivity ? "Actualizar Actividad" : "Crear Actividad"}
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
                        {activity.reservationDate}
                      </Typography>

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
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AppointmentApp;
