import React, { useState, useRef } from 'react';
import './Profile.css';

function Profile() {
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc");
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="profile" className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-start space-x-6">
        <div className="avatar-upload">
          <input 
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <img 
            src={avatar} 
            alt="Pet Avatar" 
          />
          <div className="upload-overlay" onClick={handleAvatarClick}>
            <i className="fas fa-camera text-white text-2xl"></i>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 
                className="text-2xl font-bold font-sans text-gray-800 mb-1" 
                id="pet-name"
                style={{
                  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif'
                }}
              >
                Max
              </h1>
              <p className="text-gray-600" id="pet-location">Seattle, WA</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Edit Profile
            </button>
          </div>
          
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Shot Records</h2>
            <div className="space-y-2">
              <div className="p-2 bg-gray-50 rounded">
                <span className="font-medium">Rabies:</span> Valid until 12/2024
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <span className="font-medium">DHPP:</span> Valid until 06/2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;