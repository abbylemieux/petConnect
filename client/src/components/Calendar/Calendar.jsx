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
import './Calendar.css'; // Import the updated CSS file

const Calendar = ({ addReminderToFeed }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [reminderType, setReminderType] = useState('');
  const [reminderDescription, setReminderDescription] = useState('');

  useEffect(() => {
    const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setReminders(storedReminders);
  }, []);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const reminderColors = {
    'Vet Appointment': '#FFA07A',
    Shots: '#87CEFA',
    Medications: '#90EE90',
  };

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

  const addReminder = () => {
    if (!selectedDate || !reminderType || !reminderDescription) {
      alert('Please fill in all fields.');
      return;
    }

    const newReminder = {
      id: Date.now(),
      date: format(selectedDate, 'yyyy-MM-dd'),
      type: reminderType,
      description: reminderDescription,
    };

    setReminders([...reminders, newReminder]);
    addReminderToFeed(newReminder);
    setReminderType('');
    setReminderDescription('');
    setSelectedDate(null);
    alert('Reminder added successfully!');
  };

  const remindersForDate = (date) =>
    reminders.filter((reminder) => reminder.date === format(date, 'yyyy-MM-dd'));

  return (
    <div className="calendar-container">
      <h1>Calendar</h1>
      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          ← Previous
        </button>
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          Next →
        </button>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {getDaysInMonth().map((day) => (
          <div
            key={day}
            className={`calendar-day ${
              format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                ? 'selected'
                : ''
            }`}
            onClick={() => setSelectedDate(day)}
          >
            <span>{format(day, 'd')}</span>
            <ul className="reminders-list">
              {remindersForDate(day).map((reminder) => (
                <li
                  key={reminder.id}
                  className="reminder"
                  style={{
                    backgroundColor: reminderColors[reminder.type] || '#ccc',
                  }}
                >
                  {reminder.type}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {selectedDate && (
        <div className="add-reminder">
          <h3>Add Reminder for {format(selectedDate, 'MMMM d, yyyy')}</h3>
          <div className="form-group">
            <label>Reminder Type:</label>
            <select
              value={reminderType}
              onChange={(e) => setReminderType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Vet Appointment">Vet Appointment</option>
              <option value="Shots">Shots</option>
              <option value="Medications">Medications</option>
            </select>
          </div>
          <div className="form-group">
            <label>Reminder Description:</label>
            <input
              type="text"
              value={reminderDescription}
              onChange={(e) => setReminderDescription(e.target.value)}
              placeholder="Enter details"
            />
          </div>
          <button onClick={addReminder}>Add Reminder</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;

/* Updated Code */