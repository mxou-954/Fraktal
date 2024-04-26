import '../styles/styles.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useUser } from '../../UserContext'; 




export default function Connexion() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [etatDeConnexion, setEtatDeConnexion] = useState(false);
  const { setUser } = useUser();




  useEffect(() => {
    fetch('http://localhost:3000/api/verifier-connexion', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (data.etatDeConnexion) {
        setEtatDeConnexion(true); 
      };
      console.log(data);
    })
    .catch(error => console.error('Erreur lors de la vérification de la connexion :', error));
  }, []);





  const handleConnexion = async (event) => {
    event.preventDefault();

    const userData = {
      username, 
      password,
    };

    try{
      const response = await fetch('http://localhost:3000/api/connexion', {
        method: 'POST', 
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        setEtatDeConnexion(true);
      }else{
        throw new Error(data.message || 'Quelque chose a mal tourné lors de la connexion.');
      }

      alert('Connexion réussie !');

    } catch (error){
      console.error('Erreur lors de l\'envoi des données :', error);
      alert('Erreur lors de la connexion.');
    }
  }





  const handleDeconnexion = async (event) => {
    try {
      const response = await fetch('http://localhost:3000/api/deconnexion', {
        method: 'POST', 
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('userId');
        setUser({ name: '', accountId: '' });
        setEtatDeConnexion(false); 
      } else {
        throw new Error('Quelque chose a mal tourné lors de la déconnexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };





if (etatDeConnexion == true) {
  return (
    <div className='div_generale'>
    <div className="container">
    <p className="title">Vous êtes connecté !</p>
    <button className='deconnexion' onClick={handleDeconnexion}>Déconnexion</button>
    </div>
    </div>
  );
} else {
  return (
    <div className='div_generale'>
    <div className="container">
      <input type="checkbox" id="signup_toggle" />
      <form className="form" onSubmit={handleConnexion}>
        <div className="form_front">
          <div className="form_details">Login</div>
          <input placeholder="Username" className="input" type="text" required value={username} onChange={e => setUsername(e.target.value)}/>
          <input placeholder="Password" className="input" type="text" required value={password} onChange={e => setPassword(e.target.value)}/>
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
}