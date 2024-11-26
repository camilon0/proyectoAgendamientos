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
import { useState } from "react";

interface Appointment {
  id: number;
  date: string;
  time: string;
}

const appointments: Appointment[] = [
  { id: 1, date: "2024-03-15", time: "10:00 AM" },
  { id: 2, date: "2024-03-15", time: "11:00 AM" },
  { id: 3, date: "2024-03-15", time: "2:00 PM" },
  { id: 4, date: "2024-03-16", time: "9:00 AM" },
  { id: 5, date: "2024-03-16", time: "10:00 AM" },
  { id: 6, date: "2024-03-16", time: "3:00 PM" },
  { id: 7, date: "2024-03-17", time: "10:00 AM" },
  { id: 8, date: "2024-03-17", time: "1:00 PM" },
  { id: 9, date: "2024-03-18", time: "9:00 AM" },
  { id: 10, date: "2024-03-18", time: "2:00 PM" },
  { id: 11, date: "2024-03-20", time: "10:00 AM" },
  { id: 12, date: "2024-03-20", time: "11:00 AM" },
  { id: 13, date: "2024-03-22", time: "9:00 AM" },
  { id: 14, date: "2024-03-22", time: "3:00 PM" },
  { id: 15, date: "2024-03-25", time: "10:00 AM" },
];

const activities = [
  "Reservar vuelo",
  "Reservar hotel",
  "Tour guiado",
  "Rentar auto",
  "Planificar itinerario",
];
const AppointmentApp = () => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState("");
  const [activity, setActivity] = useState("");

  const handleSelectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDate(appointment.date);
    setTime(convertTimeTo24Hour(appointment.time)); // Convertimos la hora al formato compatible con `<input type="time">`
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que la fecha y la hora coincidan con una cita disponible
    const isValidAppointment = appointments.some(
      (appointment) =>
        appointment.date === date &&
        appointment.time === convertTimeTo12Hour(time)
    );

    if (!isValidAppointment) {
      alert("La fecha y hora seleccionadas no están disponibles.");
      return;
    }

    console.log("Appointment booked:", { name, date, time, details });
    alert("¡Cita agendada exitosamente!");
  };

  const convertTimeTo24Hour = (time12Hour: string): string => {
    const [time, period] = time12Hour.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours < 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const convertTimeTo12Hour = (time24Hour: string): string => {
    const [hours, minutes] = time24Hour.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const normalizedHours = hours % 12 || 12;
    return `${normalizedHours}:${String(minutes).padStart(2, "0")} ${period}`;
  };

  return (
    <Grid container spacing={4} padding={4}>
      {/* Booking Form */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Book an Appointment
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box marginBottom={2}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  fullWidth
                  label="Date"
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
                  label="Time"
                  type="time"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  fullWidth
                  label="Activity"
                  select
                  variant="outlined"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                >
                  {activities.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box marginBottom={2}>
                <TextField
                  fullWidth
                  label="Details"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </Box>
              <Button variant="contained" color="primary" type="submit">
                Book Appointment
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* Appointment List */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Available Appointments
            </Typography>
            <Grid container spacing={2}>
              {appointments.map((appointment) => (
                <Grid item xs={12} sm={6} key={appointment.id}>
                  <Card
                    onClick={() => handleSelectAppointment(appointment)}
                    sx={{
                      cursor: "pointer",
                      border:
                        selectedAppointment?.id === appointment.id
                          ? "2px solid #1976d2"
                          : "1px solid #e0e0e0",
                      backgroundColor:
                        selectedAppointment?.id === appointment.id
                          ? "#e3f2fd"
                          : "white",
                    }}
                  >
                    <CardContent>
                      <Typography variant="body1" fontWeight="bold">
                        {appointment.date}
                      </Typography>
                      <Typography variant="body2">
                        {appointment.time}
                      </Typography>
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
