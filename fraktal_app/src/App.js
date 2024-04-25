import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./components/styles/styles.css";

import Home from "./components/home/home";
import Connexion from './components/connexion/connexion';
import Inscription from './components/connexion/inscription';
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar></Navbar>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;