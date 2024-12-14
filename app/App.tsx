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
  id: number;
  name: string;
  reservationDate: string;
  description: string;
  type: string;
  capacity: number;
}

const AppointmentApp = () => {
  const [activities, setActivities] = useState<Activity[]>([]); // Lista de actividades
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  ); // Actividad seleccionada
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [reservationDate, setreservationDate] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [activityType, setActivityType] = useState<string>("");

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
        name,
        date,
        reservationDate,
        details,
        type: activityType,
      };

      if (selectedActivity) {
        // Actualizar actividad existente
        await updateActivity(selectedActivity.id, newActivity);
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
    setDate("");
    setreservationDate("");
    setDetails("");
    setActivityType("");
    setSelectedActivity(null);
  };

  // Manejar la selección de una actividad
  const handleSelectActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setName(activity.name);
    setDate(activity.reservationDate);
    setreservationDate(activity.reservationDate);
    setDetails(activity.description);
    setActivityType(activity.type);
  };

  // Manejar la eliminación de una actividad
  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta actividad?")) {
      try {
        await deleteActivity(id);
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
                  label="Fecha"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  fullWidth
                  label="Hora"
                  type="reservationDate"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={reservationDate}
                  onChange={(e) => setreservationDate(e.target.value)}
                />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  fullWidth
                  label="Tipo de Actividad"
                  select
                  variant="outlined"
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                >
                  {activities.map((option) => (
                    <MenuItem key={option.id} value={option.type}>
                      {option.type}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box marginBottom={2}>
                <TextField
                  fullWidth
                  label="Detalles"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
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
                <Grid item xs={12} sm={6} key={activity.id}>
                  <Card
                    onClick={() => handleSelectActivity(activity)}
                    sx={{
                      cursor: "pointer",
                      border:
                        selectedActivity?.id === activity.id
                          ? "2px solid #1976d2"
                          : "1px solid #e0e0e0",
                      backgroundColor:
                        selectedActivity?.id === activity.id
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
                          onClick={() => handleDelete(activity.id)}
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
