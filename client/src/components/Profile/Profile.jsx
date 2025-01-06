import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import cameraIcon from "../../assets/White_camera_icon.png";
import profileAvatar from "../../assets/vitor-fontes-SxLe8EHtC3U-unsplash.jpg";

const Profile = () => {
  const [profilePhoto, setProfilePhoto] = useState(profileAvatar);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Max",
    location: "Seattle, WA",
    shotRecords: [
      { type: "Rabies", validUntil: "12/2024" },
      { type: "DHPP", validUntil: "06/2024" }
    ]
  });

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

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleShotRecordChange = (index, field, value) => {
    const updatedRecords = [...profileData.shotRecords];
    updatedRecords[index] = {
      ...updatedRecords[index],
      [field]: value
    };
    setProfileData(prev => ({
      ...prev,
      shotRecords: updatedRecords
    }));
  };

  return (
    <div className="profile">
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
                  style={{ width: "49.4531px", height: "49.4531px", objectFit: "contain" }}
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
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="text-2xl font-bold border rounded px-2 py-1"
                />
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="mt-2 border rounded px-2 py-1"
                />
                <div className="shot-records mt-4">
                  <h3>Shot Records</h3>
                  {profileData.shotRecords.map((record, index) => (
                    <div key={index} className="flex space-x-2 mt-2">
                      <input
                        type="text"
                        value={record.type}
                        onChange={(e) => handleShotRecordChange(index, 'type', e.target.value)}
                        className="border rounded px-2 py-1"
                      />
                      <input
                        type="text"
                        value={record.validUntil}
                        onChange={(e) => handleShotRecordChange(index, 'validUntil', e.target.value)}
                        className="border rounded px-2 py-1"
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 id="pet-name" className="text-2xl font-bold">{profileData.name}</h2>
                <p>{profileData.location}</p>
                <div className="shot-records">
                  <h3>Shot Records</h3>
                  {profileData.shotRecords.map((record, index) => (
                    <p key={index}>
                      {record.type}: Valid until {record.validUntil}
                    </p>
                  ))}
                </div>
              </>
            )}
            <button
              onClick={handleEdit}
              className="edit-profile-button"
            >
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
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
