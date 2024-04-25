const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); 


app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  exposedHeaders: ['X-Photo-Title', 'X-Photo-Description'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Device-Remember-Token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
}));

app.use(express.json()); 

const uri = "mongodb://localhost:27017/Fraktal";

mongoose.connect(uri)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.error('Échec de la connexion à MongoDB', err));

const conn = mongoose.connection;











const inscriptionSchema = new mongoose.Schema({
    username : String,
    email : String,
    nom : String,
    prénom : String,
    password : String,
});

const Inscription = mongoose.model('Inscription', inscriptionSchema);

app.post('/api/inscription', async (req, res) => {
  const { username, email, nom, prénom, password, confirmPassword } = req.body;

  if (!username || !email || !nom || !prénom || !password) {
    res.status(400).send({error: "Tous les champs du formulaire ne sont pas remplis!"});
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).send({error: "Les mots de passe ne correspondent pas."});
    return;
  }

  const regex = /[<>\/\:\!]/;

  if (regex.test(username) || regex.test(email) || regex.test(nom) || regex.test(prénom)) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("Tentative de hack détectée, IP : " + ip.split(",")[0]); // Prend la première adresse IP dans la liste si plusieurs
    res.status(400).send({error: "Des caractères non autorisés ont été détectés. Votre IP a été enregistrée."});
    return;
  }

  try {
    const inscription = new Inscription({
      username, 
      email, 
      nom, 
      prénom, 
      password
    });

    const nouvelUtilisateur = await inscription.save();
    console.log('Utilisateur enregistré:', nouvelUtilisateur);
    res.status(200).send(nouvelUtilisateur);

  } catch (erreur) {
    console.error('Erreur lors de l\'enregistrement:', erreur);
    res.status(400).send({erreur: "Impossible de mettre le nouvel utilisateur dans la base de données!"});
  }
});













const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});