import React, { useState } from "react";
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
      { type: "DHPP", validUntil: "06/2024" },
    ],
    medications: [
      { name: "Heartworm Prevention", frequency: "Monthly" },
      { name: "Flea and Tick", frequency: "Weekly" },
    ],
    owner: {
      name: "John Doe",
      phone: "123-456-7890",
      address: "123 Main St, Seattle, WA",
    },
    veterinarian: {
      name: "Dr. Smith",
      phone: "555-123-4567",
      address: "456 Veterinary Rd, Seattle, WA",
    },
    daycare: {
      name: "Happy Tails Daycare",
      phone: "555-987-6543",
      address: "789 Puppy Ln, Seattle, WA",
    },
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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (category, field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const updatedArray = [...profileData[arrayName]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setProfileData((prev) => ({
      ...prev,
      [arrayName]: updatedArray,
    }));
  };

  return (
    <div className="profile">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={profilePhoto} alt="Profile Avatar" />
          <div className="upload-overlay">
            <label htmlFor="upload-input">
              <img
                src={cameraIcon}
                alt="Upload Camera Icon"
                className="camera-icon"
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
                onChange={(e) => handleChange("name", e.target.value)}
                className="input-field name-input"
              />
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="input-field location-input"
              />
            </>
          ) : (
            <>
              <h2>{profileData.name}</h2>
              <p>{profileData.location}</p>
            </>
          )}
          <button
            onClick={handleEditToggle}
            className="edit-profile-button"
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Details Section */}
      <div className="profile-details">
        <div className="details-card">
          <h4>Owner Info</h4>
          {isEditing ? (
            <>
              <input
                type="text"
                value={profileData.owner.name}
                onChange={(e) =>
                  handleNestedChange("owner", "name", e.target.value)
                }
                className="input-field"
                placeholder="Owner Name"
              />
              <input
                type="text"
                value={profileData.owner.phone}
                onChange={(e) =>
                  handleNestedChange("owner", "phone", e.target.value)
                }
                className="input-field"
                placeholder="Phone"
              />
              <input
                type="text"
                value={profileData.owner.address}
                onChange={(e) =>
                  handleNestedChange("owner", "address", e.target.value)
                }
                className="input-field"
                placeholder="Address"
              />
            </>
          ) : (
            <>
              <p>Name: {profileData.owner.name}</p>
              <p>Phone: {profileData.owner.phone}</p>
              <p>Address: {profileData.owner.address}</p>
            </>
          )}
        </div>
        <div className="details-card">
          <h4>Veterinarian</h4>
          {isEditing ? (
            <>
              <input
                type="text"
                value={profileData.veterinarian.name}
                onChange={(e) =>
                  handleNestedChange("veterinarian", "name", e.target.value)
                }
                className="input-field"
                placeholder="Vet Name"
              />
              <input
                type="text"
                value={profileData.veterinarian.phone}
                onChange={(e) =>
                  handleNestedChange("veterinarian", "phone", e.target.value)
                }
                className="input-field"
                placeholder="Phone"
              />
              <input
                type="text"
                value={profileData.veterinarian.address}
                onChange={(e) =>
                  handleNestedChange("veterinarian", "address", e.target.value)
                }
                className="input-field"
                placeholder="Address"
              />
            </>
          ) : (
            <>
              <p>Name: {profileData.veterinarian.name}</p>
              <p>Phone: {profileData.veterinarian.phone}</p>
              <p>Address: {profileData.veterinarian.address}</p>
            </>
          )}
        </div>
        <div className="details-card">
          <h4>Daycare</h4>
          {isEditing ? (
            <>
              <input
                type="text"
                value={profileData.daycare.name}
                onChange={(e) =>
                  handleNestedChange("daycare", "name", e.target.value)
                }
                className="input-field"
                placeholder="Daycare Name"
              />
              <input
                type="text"
                value={profileData.daycare.phone}
                onChange={(e) =>
                  handleNestedChange("daycare", "phone", e.target.value)
                }
                className="input-field"
                placeholder="Phone"
              />
              <input
                type="text"
                value={profileData.daycare.address}
                onChange={(e) =>
                  handleNestedChange("daycare", "address", e.target.value)
                }
                className="input-field"
                placeholder="Address"
              />
            </>
          ) : (
            <>
              <p>Name: {profileData.daycare.name}</p>
              <p>Phone: {profileData.daycare.phone}</p>
              <p>Address: {profileData.daycare.address}</p>
            </>
          )}
        </div>
      </div>

      {/* Records Section */}
      <div className="records-section">
        <h3>Shot Records</h3>
        {profileData.shotRecords.map((record, index) => (
          <p key={index}>
            {record.type}: Valid until {record.validUntil}
          </p>
        ))}
        <h3>Medications</h3>
        {profileData.medications.map((med, index) => (
          <p key={index}>
            {med.name}: {med.frequency}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Profile;
