import {createSlice} from '@reduxjs/toolkit'

const initialProfiles = [
  {
    id: "1",
    name: "John Doe",
    photo: "https://via.placeholder.com/150",
    description: "Software developer specializing in frontend technologies.",
    address: "jind Haryana, India",
  },
  {
    id: "2",
    name: "Jane Smith",
    photo: "https://via.placeholder.com/150",
    description: "Graphic designer with a passion for branding and UI design.",
    address: "456 Elm St, Los Angeles, CA, USA",
  },
  {
    id: "3",
    name: "Alice Johnson",
    photo: "https://via.placeholder.com/150",
    description: "Data analyst with expertise in visualization and insights.",
    address: "789 Oak St, Chicago, IL, USA",
  },
  {
    id: "4",
    name: "Michael Brown",
    photo: "https://via.placeholder.com/150",
    description: "Full-stack developer with experience in cloud solutions.",
    address: "101 Pine St, San Francisco, CA, USA",
  },
  {
    id: "5",
    name: "Emily Davis",
    photo: "https://via.placeholder.com/150",
    description: "Digital marketer specializing in SEO and content strategy.",
    address: "202 Maple St, Austin, TX, USA",
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

export const {addProfile, deleteProfile, updateProfile} = profileSlice.actions;
export default profileSlice.reducer;