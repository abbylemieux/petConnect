import React, { useState } from 'react';
import './AvatarUpload.css';

function AvatarUpload() {
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-upload w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
      <div>
        <input 
          type="file" 
          id="avatar-input" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
        />
        <label htmlFor="avatar-input">
          <img 
            src={avatar} 
            alt="Pet Avatar" 
            className="w-full h-full object-cover"
          />
          <div className="upload-overlay">
            <i className="fas fa-camera text-white text-2xl"></i>
          </div>
        </label>
      </div>
    </div>
  );
}

export default AvatarUpload;

/* Updated Code */