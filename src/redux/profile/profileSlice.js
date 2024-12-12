import { createSlice } from "@reduxjs/toolkit";

const initialProfiles = [
  {
    id: "1",
    name: "Aarav Mehta",
    photo:
      "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1734029998~exp=1734033598~hmac=fcc0b58cec8df6a64306b1af4ad5b8d789b53ce70b407ba9e1c4b2c0b8f5be97&w=740",
    description:
      "Aarav is a young entrepreneur who has started a small tech company specializing in AI-driven solutions. He is passionate about innovation and enjoys mentoring aspiring developers.",
    address: "MG Road, Bengaluru, Karnataka",
  },
  {
    id: "2",
    name: "Ishani Sharma",
    photo:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid",
    description:
      "Ishani is a classical dancer trained in Bharatanatyam and Kuchipudi. She often performs at cultural festivals and is dedicated to preserving India's rich dance heritage.",
    address: "Connaught Place, New Delhi, Delhi",
  },
  {
    id: "3",
    name: "Kunal Deshmukh",
    photo:
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_640.png",
    description:
      "Kunal is a marine biologist who conducts research on coral reefs and works to protect marine ecosystems in India. He collaborates with NGOs and universities.",
    address: "Marine Drive, Mumbai, Maharashtra",
  },
  {
    id: "4",
    name: "Riya Patel",
    photo:
      "https://cdn.pixabay.com/photo/2020/06/30/10/23/icon-5355896_640.png",
    description:
      "Riya is a baker and owns a popular dessert shop where she experiments with fusion recipes combining Indian and Western flavors.",
    address: "C.G. Road, Ahmedabad, Gujarat",
  },
  {
    id: "5",
    name: "Vikram Reddy",
    photo: "https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638_640.png",
    description:
      "Vikram is a software engineer and open-source contributor, actively involved in the tech community. He conducts workshops on coding and software development.",
    address: "HITEC City, Hyderabad, Telangana",
  },
];

const profileSlice = createSlice({
  name: "profiles",
  initialState: initialProfiles,
  reducers: {
    addProfile: (state, action) => {
      state.push({ id: (state.length + 1).toString(), ...action.payload });
    },
    deleteProfile: (state, action) => {
      return state.filter((profile) => profile.id !== action.payload);
    },
    updateProfile: (state, action) => {
      const index = state.findIndex(
        (profile) => profile.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
  },
});

export const { addProfile, deleteProfile, updateProfile } =
  profileSlice.actions;
export default profileSlice.reducer;
