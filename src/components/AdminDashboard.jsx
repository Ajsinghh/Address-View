import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProfile, deleteProfile, updateProfile } from "../redux/profile/profileSlice";
import "../App.css"; // Optional: Add styles for the component

const AdminDashboard = () => {
  const profiles = useSelector((state) => state.profiles);
  const dispatch = useDispatch();

  const [newProfile, setNewProfile] = useState({
    name: "",
    address: "",
    photo: "",
    description: "",
  });

  const [editingProfileId, setEditingProfileId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProfile = () => {
    if (newProfile.name && newProfile.address && newProfile.description) {
      dispatch(addProfile(newProfile));
      setNewProfile({ name: "", address: "", photo: "", description: "" });
    }
  };

  const handleEditProfile = (profile) => {
    setEditingProfileId(profile.id);
    setNewProfile({
      name: profile.name,
      address: profile.address,
      photo: profile.photo,
      description: profile.description,
    });
  };

  const handleUpdateProfile = () => {
    if (editingProfileId) {
      dispatch(updateProfile({ id: editingProfileId, ...newProfile }));
      setEditingProfileId(null);
      setNewProfile({ name: "", address: "", photo: "", description: "" });
    }
  };

  const handleDeleteProfile = (id) => {
    dispatch(deleteProfile(id));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="add-profile">
        <h3>{editingProfileId ? "Edit Profile" : "Add New Profile"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProfile.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newProfile.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={newProfile.photo}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProfile.description}
          onChange={handleInputChange}
        ></textarea>
        {editingProfileId ? (
          <button onClick={handleUpdateProfile}>Update Profile</button>
        ) : (
          <button onClick={handleAddProfile}>Add Profile</button>
        )}
      </div>

      <div className="profile-list">
        <h3>Existing Profiles</h3>
        {profiles.map((profile) => (
          <div key={profile.id} className="profile-item">
            <p>
              <strong>{profile.name}</strong>: {profile.address}
            </p>
            <p>{profile.description}</p>
            {profile.photo && (
              <img
                src={profile.photo}
                alt={profile.name}
                style={{ width: "100px" }}
              />
            )}
            <button onClick={() => handleEditProfile(profile)}>Edit</button>
            <button onClick={() => handleDeleteProfile(profile.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
