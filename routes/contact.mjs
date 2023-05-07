import express from "express";
import { body, validationResult } from "express-validator";
import config from "config";
import rateLimit from "express-rate-limit";
import db from "../db/conn.mjs";
import TelegramBot from "node-telegram-bot-api";
import logger from "../logger.mjs";

const bot = new TelegramBot(config.telegram.token, { polling: true });

const router = express.Router();

// Middleware 1:
const checkOrigin = (req, res, next) => {
  const referer = req.get("Referer");
  const allowedOrigin = config.client.url;
  if (referer && referer.startsWith(allowedOrigin)) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
};

// Middleware 2:
const limiter = rateLimit({
  windowMs: config.session.duration,
  max: config.session.maxMessages,
  // eslint-disable-next-line no-unused-vars
  keyGenerator(req, res) {
    return req.session.userId;
  },
  handler(req, res) {
    res
      .status(429)
      .json({ error: "Trop de requêtes, veuillez réessayer plus tard." });
  },
});

const validationRules = [
  // Règles de validation pour le champ 'nom'
  body("name")
    .notEmpty()
    .withMessage("Le champ nom est obligatoire")
    .trim()
    .escape(),

  // Règles de validation pour le champ 'email'
  body("email")
    .notEmpty()
    .withMessage("Le champ email est obligatoire")
    .isEmail()
    .withMessage("L'email n'est pas valide")
    .trim()
    .escape()
    .normalizeEmail(),

  // Règles de validation pour le champ 'message'
  body("message")
    .notEmpty()
    .withMessage("Le champ message est obligatoire")
    .isLength({ max: 2000 })
    .withMessage("Le message ne peut pas dépasser 2000 caractères") // Ajouter une règle pour la taille du message
    .trim()
    .escape(),
];

// Exemple de règles de validation pour un formulaire avec trois champs (nom, email, message)
router.post("/", checkOrigin, limiter, validationRules, async (req, res) => {
  // Traiter les erreurs de validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(`Validation Result Error : ${errors.array()}`);
    return res.status(400).json({ errors: errors.array() });
  }
  // Traitement du formulaire si les données sont valides
  // ... Code de traitement du formulaire ...
  let collection = await db.collection("contacts");
  let newContact = req.body;
  newContact.date = new Date();

  try {
    let result = await collection.insertOne(newContact);
    if (result.acknowledged) {
      logger.debug(
        `Un message de ${newContact.email} a été enregistré avec succès dans la base de données.`
      );
    } else {
      logger.error(
        `Erreur lors de l'enregistrement du contact ${newContact} dans la base de données.`
      );
    }
  } catch (err) {
    logger.error(
      `Erreur lors de l'enregistrement du contact ${newContact} dans la base de données. Erreur : ${err}`
    );
  }

  const groupId = config.telegram.groupId;
  console.log(groupId);

  try {
    bot.sendMessage(
      groupId,
      "<b>Nom:</b> " +
        newContact.name +
        "\n<b>Email:</b> " +
        newContact.email +
        "\n<b>Message:</b> " +
        newContact.message,
      { parse_mode: "HTML" }
    );
  } catch (error) {
    logger.error(`Erreur lors de l'envoi du message sur telegram: ${error}`);
  }

  // message de réussite
  res.status(200).json({ message: "Le formulaire a été envoyé avec succès" });
});
export default router;
