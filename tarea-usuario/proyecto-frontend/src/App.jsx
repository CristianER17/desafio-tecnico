import { useState } from 'react'
import { Formik } from 'formik'
//import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/pages/home/Home'
import Register from './components/pages/register/Register'
import Login from './components/pages/login/Login'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
