import React from 'react';
import '../styles/styles.css';
import { Link } from 'react-router-dom';


export default function Connexion() {
  return (
    <div className='div_generale'>
    <div className="container">
      <input type="checkbox" id="signup_toggle" />
      <form className="form">
        <div className="form_front">
          <div className="form_details">Login</div>
          <input placeholder="Username" className="input" type="text" />
          <input placeholder="Password" className="input" type="text" />
          <button className="btn">Login</button>
          <span className="switch">Vous n'avez pas de compte ?
          <Link to="/inscription">
            <label className="signup_tog" htmlFor="signup_toggle">
              Inscription
            </label>
            </Link>
          </span>
        </div> 
      </form>
    </div>
    </div>
  );
}