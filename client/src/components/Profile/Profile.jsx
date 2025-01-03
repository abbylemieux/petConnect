import React, { useState } from "react";
import "./Profile.css";
import cameraIcon from "../../assets/White_camera_icon.png";
import profileAvatar from "../../assets/vitor-fontes-SxLe8EHtC3U-unsplash.jpg";

const Profile = () => {
  const [profilePhoto, setProfilePhoto] = useState(profileAvatar);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile">
      <nav className="profile-nav">
        <a href="/profile">Profile</a>
        <a href="/calendar">Calendar</a>
        <a href="/blog">Blog</a>
        <a href="/recommendations">Recommendations</a>
      </nav>

      <div className="profile-main">
        <div className="profile-card">
          <div className="profile-avatar" style={{ backgroundColor: profilePhoto ? 'transparent' : '#ccc' }}>
            {profilePhoto ? (
              <img
                id="profile-photo"
                src={profilePhoto}
                alt="Profile Avatar"
              />
            ) : (
              <div className="default-avatar"></div>
            )}
            <div className="upload-overlay">
              <label htmlFor="upload-input">
                <img 
                  src={cameraIcon} 
                  alt="Upload Camera Icon" 
                  className="camera-icon"
                  style={{ width: "16px", height: "16px" }}
                />
              </label>
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="profile-info">
            <h2 id="pet-name" className="text-2xl font-bold">Max</h2>
            <p>Seattle, WA</p>
            <div className="shot-records">
              <h3>Shot Records</h3>
              <p>Rabies: Valid until 12/2024</p>
              <p>DHPP: Valid until 06/2024</p>
            </div>
            <button className="edit-profile-button">Edit Profile</button>
          </div>
        </div>

        <div className="profile-details">
          <div className="details-card">
            <h4>Vet Appointments</h4>
            <p>Annual Checkup</p>
            <p>March 15, 2024</p>
          </div>
          <div className="details-card">
            <h4>Vaccinations Due</h4>
            <p>Bordetella</p>
            <p>April 1, 2024</p>
          </div>
          <div className="details-card">
            <h4>Medications</h4>
            <p>Heartworm Prevention</p>
            <p>Monthly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
