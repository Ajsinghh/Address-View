
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css";

const ProfileDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const profiles = useSelector(store => store.profiles)
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
