import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './Basic.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styled from "styled-components"
import Swal from 'sweetalert2'
import axios from "axios"
import Navbar from "./components/Navbar"
import MapMoto from './components/MapMoto'
import MapCar from './components/MapCar'

function Car() {
  return (
    <main className='main-view'>
      <div className='row mx-0'>
        <Navbar></Navbar>
        <MapCar></MapCar>
      </div>
    </main>
  );
}

function Moto() {
  return (
    <main className='main-view'>
      <div className='row mx-0'>
        <Navbar></Navbar>
        <MapMoto></MapMoto>
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/car" replace />}
        />
        <Route path="/car" element={<Car />} />
        <Route path="/moto" element={<Moto />} />
      </Routes>
    </Router>
  )
}

export default App;
