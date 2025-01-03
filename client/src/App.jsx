import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Calendar from './components/Calendar/Calendar';
import Blog from './components/Blog/Blog';
import Avatar from './components/AvatarUpload/AvatarUpload';
import Recommendations from './components/Recommendations/Recommendations';
import Reminders from './components/Reminders/Reminders';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
