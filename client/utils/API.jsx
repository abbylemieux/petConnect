import axios from 'axios';

const API_URL = 'http://localhost:5173/api/calendar'; // Update this URL if your backend is deployed

// Fetch events from Google Calendar
export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Add an event to Google Calendar
export const addEvent = async (event) => {
  try {
    const response = await axios.post(`${API_URL}/events`, event);
    return response.data;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

// Update an event in Google Calendar
export const updateEvent = async (eventId, event) => {
  try {
    const response = await axios.put(`${API_URL}/events/${eventId}`, event);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// Delete an event from Google Calendar
export const deleteEvent = async (eventId) => {
  try {
    await axios.delete(`${API_URL}/events/${eventId}`);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};