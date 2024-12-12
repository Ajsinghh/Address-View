import  { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProfile, deleteProfile, updateProfile } from "../redux/profile/profileSlice";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import "../App.css"; 

const AdminDashboard = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const profiles = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  const nameInputRef = useRef(null);
  const adminRef = useRef(null);


  useEffect(() => {
    if (file) {
        console.log("File selected:", file);
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setNewProfile({ ...newProfile, photo: downloadURL });
        });
      }
    );
  };

  const [newProfile, setNewProfile] = useState({
    name: "",
    address: "",
    photo:
      "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_640.png",
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
      setNewProfile({
        name: "",
        address: "",
        photo:
          "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_640.png",
        description: "",
      });
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
    nameInputRef.current.focus();
    adminRef.current.scrollIntoView({ behavior: "smooth" });
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
      <h1 ref={adminRef}>Admin Dashboard</h1>

      <div className="add-profile">
        <h3>{editingProfileId ? "Edit Profile" : "Add New Profile"}</h3>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="profile-pic"
          src={newProfile.photo || "https://pixabay.com/illustrations/icon-user-male-avatar-business-5359553/"}
        />
        <p className="text-center text-sm">
          {fileUploadError ? (
            <span className="text-red-700">Error Image Upload</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image Sucessfully Uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProfile.name}
          onChange={handleInputChange}
          ref={nameInputRef}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newProfile.address}
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
