import express from 'express';
import { calendar } from '../utils/googleClient.js';

const router = express.Router();

// Fetch events
router.get('/events', async (req, res) => {
  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    res.json(response.data.items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add event
router.post('/events', async (req, res) => {
  try {
    const event = req.body;
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update event
router.put('/events/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = req.body;
    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId: eventId,
      resource: event,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete event
router.delete('/events/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;