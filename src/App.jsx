import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/Shared/Header'
import HomePage from './pages/HomePage'

function App() {
  return(
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
