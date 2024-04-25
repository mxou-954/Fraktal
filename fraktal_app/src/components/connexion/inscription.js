import React, { useState } from 'react';
import '../styles/styles.css';
import { Link, UNSAFE_DataRouterStateContext } from 'react-router-dom';


export default function Inscription() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prénom, setPrénom] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const regex = /[<>\/\:\!]/;

    if (regex.test(username) || regex.test(email) || regex.test(nom) || regex.test(prénom)) {
      alert("Attention ! Des caractères non autorisés ont été détectés dans les entrées. Par précaussion nous enregistons votre adresse IP !");
      return;
    }

    const userData = {
      username,
      email,
      nom,
      prénom,
      password, 
      confirmPassword
    };

    try{
      const response = await fetch('http://localhost:3000/api/inscription', {
        method: 'POST', 
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      console.log(data);

      alert('Inscription réussie !');

    }catch (error) {
      console.error('Erreur lors de l\'envoi des données :', error);
      alert('Erreur lors de l\'inscription.');
    }
  }

    return (
      <div className='div_generale'>
        <div className="container">
          <input type="checkbox" id="signup_toggle" />
          <form className="form" onSubmit={handleSubmit}>
            <div className="form_front">
              <div className="form_details">SignIn</div>
              <div className="pair">
              <input placeholder="Username" className="input" type="text" required value={username} onChange={e => setUsername(e.target.value)} />
              <input placeholder="Email" className="input" type="text" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
  
              <div className="pair">
                <input placeholder="Nom" className="input" type="text" required value={nom} onChange={e => setNom(e.target.value)} />
                <input placeholder="Prénom" className="input" type="text" required value={prénom} onChange={e => setPrénom(e.target.value)}/>
              </div>
              
              <div className="pair">
                <input placeholder="Password" className="input" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                <input placeholder="Confirm Password" className="input" type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>
              
              <button className="btn">SignIn</button>
              <span className="switch">Vous avez un compte ? 
              <Link to="/connexion">
                <label className="signup_tog" htmlFor="signup_toggle">
                  Connexion
                </label>
                </Link>
              </span>
            </div> 
          </form>
        </div>
      </div>
  )
}
