# portfolioServer
Ce projet est une api Express.js pour la gestion du formulaire de contact de mon portfolio.
Le serveur est configuré pour permettre l'intégration facile de nouveaux services.
## Fonctionnalités
Le site comprend les fonctionnalités suivantes :
* Gestion de la soumission du formulaire de contact.
* Configuration de l'environnement de travail pour faciliter le passage du développement et la production.
* Système de log dynamique adapté à l'environnement.
* Protection contre les attaques CSRF.
* Limitation du nombre de soumissions du formulaire à 3 toutes les 24 heures grâce à une session.
* Stockage des données dans une base de données MongoDB.
* Notification en temps réel via Telegram.
## Pour installer le projet en local, suivez les étapes suivantes :
1. Clonez le repo :
`git clone https://github.com/saoudi-h/PortExpress.git`
2. Installez les dépendances nécessaires :
`cd PortExpress`
`npm install`
3. Pour lancer le serveur en mode developpement, exécutez la commande suivante :
`npm run dev`
3. Pour lancer le serveur en mode production, exécutez la commande suivante :
`npm run start`
## Contributeurs
Ce projet a été développé par Hakim Saoudi.
## Licence
Ce projet est sous licence [MIT](https://opensource.org/licenses/MIT).
