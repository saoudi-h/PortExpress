const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Port d'écoute du serveur

// Middleware pour analyser les requêtes HTTP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration des routes
// Ajoutez ici vos routes pour gérer le formulaire de contact

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});