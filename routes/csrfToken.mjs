import express from "express";

const router = express.Router();

// Route pour générer un token CSRF
router.get("/token", (req, res) => {
  try {
    if (!req.session.csrfToken) {
      const csrfToken = req.csrfToken();
      req.session.csrfToken = csrfToken;
    }
    console.log(req.session.csrfToken);
    res.json({ csrfToken: req.session.csrfToken });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la génération du jeton CSRF" });
  }
});

export default router;
