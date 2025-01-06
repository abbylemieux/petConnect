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

const Calendar = ({ addReminderToFeed }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [reminderType, setReminderType] = useState('');
  const [reminderDescription, setReminderDescription] = useState('');

  // Load reminders from localStorage on mount
  useEffect(() => {
    const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setReminders(storedReminders);
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

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

  // Add a new reminder
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

  // Filter reminders for a specific date
  const remindersForDate = date =>
    reminders.filter(reminder => reminder.date === format(date, 'yyyy-MM-dd'));

  return (
    <div className="calendar-container" style={{ padding: '20px', animation: 'fadeIn 0.3s ease-in' }}>
      <h1 style={{ marginTop: '70px' }}>Calendar</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>← Previous</button>
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>Next →</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {day}
          </div>
        ))}
        {getDaysInMonth().map(day => (
          <div
            key={day}
            onClick={() => setSelectedDate(day)}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              textAlign: 'center',
              backgroundColor:
                format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? '#f0f8ff' : '#fff',
              cursor: 'pointer',
            }}
          >
            {format(day, 'd')}
            <ul style={{ padding: '5px', listStyle: 'none' }}>
              {remindersForDate(day).map(reminder => (
                <li
                  key={reminder.id}
                  style={{
                    fontSize: '10px',
                    color: '#fff',
                    backgroundColor: reminderColors[reminder.type] || '#ccc',
                    padding: '2px 5px',
                    borderRadius: '5px',
                    marginBottom: '5px',
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
        <div style={{ marginTop: '20px' }}>
          <h3>Add Reminder for {format(selectedDate, 'MMMM d, yyyy')}</h3>
          <div>
            <label>
              Reminder Type:
              <select
                value={reminderType}
                onChange={e => setReminderType(e.target.value)}
                style={{ margin: '10px' }}
              >
                <option value="">Select</option>
                <option value="Vet Appointment">Vet Appointment</option>
                <option value="Shots">Shots</option>
                <option value="Medications">Medications</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Reminder Description:
              <input
                type="text"
                value={reminderDescription}
                onChange={e => setReminderDescription(e.target.value)}
                placeholder="Enter details"
                style={{ margin: '10px', width: '300px' }}
              />
            </label>
          </div>
          <button onClick={addReminder} style={{ padding: '10px' }}>
            Add Reminder
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
