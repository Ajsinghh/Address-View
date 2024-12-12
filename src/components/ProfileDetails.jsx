import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import profiles from "../data/profile.json"; // Assuming this is the path to the profile data
import "../App.css"; // Optional: Add styles for the component

const ProfileDetail = () => {
  const { id } = useParams(); // Get the profile ID from the route params
  const navigate = useNavigate(); // For navigation

  // Find the profile by ID
  const profile = profiles.find((profile) => profile.id === id);

  if (!profile) {
    return (
      <div className="profile-detail">
        <h2>Profile Not Found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="profile-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="profile-content">
        <img
          className="profile-photo"
          src={profile.photo || "https://via.placeholder.com/150"}
          alt={`${profile.name}'s photo`}
        />
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-description">{profile.description}</p>
        <p className="profile-address">Address: {profile.address}</p>
      </div>
    </div>
  );
};

export default ProfileDetail;
