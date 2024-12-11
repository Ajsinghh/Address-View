import  { useState } from "react";
import ProfileCard from "./ProfileCard";
import profiles from "../data/profile.json"; // Assuming this is the path to the profile data

const ProfileList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter profiles based on the search term
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSummaryClick = (id) => {
    // Navigate to the map view with the selected profile id
    window.location.href = `/map/${id}`;
  };

  const handleDetailsClick = (id) => {
    // Navigate to the profile details view with the selected profile id
    window.location.href = `/profile/${id}`;
  };

  return (
    <div className="profile-list">
      <h1>Profiles</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search profiles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Render Profile Cards */}
      <div className="profile-cards">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onSummaryClick={handleSummaryClick}
              onDetailsClick={handleDetailsClick}
            />
          ))
        ) : (
          <p>No profiles found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileList;
