import PropTypes from "prop-types";
import "./App.css"; 

const ProfileCard = ({ profile, onSummaryClick, onDetailsClick }) => {
  return (
    <div className="profile-card">
      <img
        className="profile-photo"
        src={profile.photo || "https://via.placeholder.com/150"}
        alt={`${profile.name}'s photo`}
      />
      <div className="profile-info">
        <h3 className="profile-name">{profile.name}</h3>
        <p className="profile-description">{profile.description}</p>
      </div>
      <div className="profile-actions">
        <button
          className="btn btn-summary"
          onClick={() => onSummaryClick(profile.id)}
        >
          Summary
        </button>
        <button
          className="btn btn-details"
          onClick={() => onDetailsClick(profile.id)}
        >
          Details
        </button>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onSummaryClick: PropTypes.func.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
};

export default ProfileCard;
