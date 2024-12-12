// ProfileCard.js
import PropTypes from "prop-types";
import "../App.css";

const ProfileCard = ({ profile, onSummaryClick, onDetailsClick }) => {
  return (
    <div className="profile-card">
      <img
        src={profile.picture}
        alt={`${profile.name}'s profile`}
        className="profile-pic"
      />
      <div className="profile-details">
        <h3>{profile.name}</h3>
        <p>{profile.description}</p>
      </div>
      <div className="profile-actions">
        <button
          onClick={() => onSummaryClick(profile.id)}
          className="summary-btn"
        >
          Summary
        </button>
        <button
          onClick={() => onDetailsClick(profile.id)}
          className="details-btn"
        >
          Details
        </button>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onSummaryClick: PropTypes.func.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
};

export default ProfileCard;
