const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); 
const session = require('express-session');
const MongoStore = require('connect-mongo');



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

app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 86400000
  },
  store: MongoStore.create({ mongoUrl: uri })
}));

app.use((req, res, next) => {
  console.log('Session Access:', req.sessionID);
  console.log('Session Data:', req.session);
  next();
});

function checkAuth(req, res, next) {
  console.log("Session Data in checkAuth:", req.session);
  if (req.session.userId && req.session.username) {
      next();
  } else {
      console.log("Session or userId not found in checkAuth");
      res.status(401).send({ message: "Non authentifié" });
  }
}







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


app.post('/api/connexion', async (req, res) => {
  const {username, password} = req.body;

  if (!username || !password){
    res.status(400).send({erreur : "!!!!!     Nous n'avons pas recu les id et le password     !!!!!"});
    return;
  };

  try{
    const utilisateur = await Inscription.findOne({username: username});
    if (!utilisateur) {
      return res.status(400).send({ erreur : "!!!!!     Impossible de trouver l'utilisateur     !!!!!"});
    }

    if (utilisateur.password != password) {
      return res.status(400).send({erreur : "!!!!!     Les mots de passe ne correspondent pas      !!!!!"});
    }

    if (utilisateur.username == username && utilisateur.password == password) {
      req.session.userId = utilisateur._id;
      req.session.username = utilisateur.username;

      res.send({
        message: "Connexion réussie !",
        etatDeConnexion: true,
        userId: req.session.userId,
        username: req.session.username,
      });
    } else{
      res.status(400).send({erreur : "Echec de la connexion", etatDeConnexion: false});
    }

  }catch (erreur) {
    console.error(erreur);
    res.status(500).send({ erreur: "Erreur du serveur" });
  }
});

app.get('/api/verifier-connexion', async (req, res) => {
  if (req.session.userId) {
    res.send({ etatDeConnexion : true });
  } else {
    res.send({ etatDeConnexion : false });
  }
});

app.post('/api/deconnexion', (req, res) => {
  req.session.destroy(); 
  res.send({ message: "Déconnexion réussie" });
});







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});