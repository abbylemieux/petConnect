import axios from 'axios';

const API_URL = 'http://localhost:5173/api/calendar';

export const fetchEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const addEvent = async (event) => {
  const response = await axios.post(`${API_URL}/events`, event);
  return response.data;
};

export const updateEvent = async (eventId, event) => {
  const response = await axios.put(`${API_URL}/events/${eventId}`, event);
  return response.data;
};

export const deleteEvent = async (eventId) => {
  await axios.delete(`${API_URL}/events/${eventId}`);
};