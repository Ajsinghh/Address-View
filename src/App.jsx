import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/Shared/Header'
import HomePage from './pages/HomePage'
import ProfileDetail from './components/ProfileDetails'
import MapView from './components/MapView'

function App() {
  return(
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/profile/:id' element={<ProfileDetail/>}/>
        <Route path='/map/:id' element={<MapView/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
