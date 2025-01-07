import React, { useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,  
  addMonths,
  subMonths,
} from 'date-fns';
import { fetchEvents, addEvent, updateEvent, deleteEvent } from '../../api/calendarApi';

const Calendar = ({ addReminderToFeed }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [reminderType, setReminderType] = useState('');
  const [reminderDescription, setReminderDescription] = useState('');

  // Load reminders from backend on mount
  useEffect(() => {
    const loadEvents = async () => {
      const events = await fetchEvents();
      setReminders(events);
    };
    loadEvents();
  }, []);

  const reminderColors = {
    'Vet Appointment': '#FFA07A', // Light salmon
    Shots: '#87CEFA',             // Light blue
    Medications: '#90EE90',       // Light green
  };

  // Get the days to display in the calendar grid
  const getDaysInMonth = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));

    const days = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  // Add event to Google Calendar
  const handleAddEvent = async () => {
    const newEvent = {
      summary: reminderType,
      description: reminderDescription,
      start: {
        dateTime: selectedDate.toISOString(),
      },
      end: {
        dateTime: addDays(selectedDate, 1).toISOString(),
      },
    };
    const addedEvent = await addEvent(newEvent);
    setReminders([...reminders, addedEvent]);
  };

  // Update event in Google Calendar
  const handleUpdateEvent = async (eventId, updatedEvent) => {
    const updated = await updateEvent(eventId, updatedEvent);
    setReminders(reminders.map(event => (event.id === eventId ? updated : event)));
  };

  // Delete event from Google Calendar
  const handleDeleteEvent = async (eventId) => {
    await deleteEvent(eventId);
    setReminders(reminders.filter(event => event.id !== eventId));
  };

  return (
    <div>
      {/* Your existing calendar UI */}
      <button onClick={handleAddEvent}>Add Event</button>
    </div>
  );
};

export default Calendar;