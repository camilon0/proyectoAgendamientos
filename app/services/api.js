import axios from "axios";
import { API_ROUTES } from "./apiConfig";

// Crear instancia de Axios
const axiosInstance = axios.create({
  baseURL: API_ROUTES.baseURL, // Define una clave baseURL en apiConfig
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5 segundos
});

// Interceptor para manejar errores globalmente
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

// Obtener las actividades
export const fetchActivities = async () => {
  const response = await axiosInstance.get(API_ROUTES.listActivities);
  return response.data;
};

// Crear una nueva actividad
export const createActivity = async (activity) => {
  const response = await axiosInstance.post(
    API_ROUTES.createActivity,
    activity
  );
  return response.data;
};

// Editar una actividad existente
export const updateActivity = async (activityId, updatedActivity) => {
  const response = await axiosInstance.put(
    API_ROUTES.editActivity(activityId),
    updatedActivity
  );
  return response.data;
};

// Eliminar una actividad
export const deleteActivity = async (activityId) => {
  await axiosInstance.delete(API_ROUTES.deleteActivity(activityId));
  console.log(
    "Deleting activity with URL:",
    API_ROUTES.deleteActivity(activityId)
  );
};

axiosInstance.interceptors.request.use((request) => {
  console.log("Request Config:", request);
  return request;
});

/////// Reservar Actividades ///

// Crear una nueva reserva
export const reserveActivity = async (activity) => {
  const response = await axiosInstance.post(API_ROUTES.reservations, activity);
  return response.data;
};
