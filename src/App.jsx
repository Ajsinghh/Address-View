import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/Shared/Header'
import HomePage from './pages/HomePage'
import ProfileDetail from './components/ProfileDetails'
import MapView from './components/MapView'
import AdminDashboard from './components/AdminDashboard'
import NotFound from './pages/NotFound'


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:id" element={<ProfileDetail />} />
        <Route path="/map/:id" element={<MapView />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
