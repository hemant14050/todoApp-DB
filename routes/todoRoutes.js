const express = require("express");
const router = express.Router();
const {signUp, login} = require("../controllers/AuthController");

router.get("/test", (req, res) => {
    res.send("Welcome to TEst!");
});

router.get("/signUp", (req, res) => {
    res.render("pages/signUp", {error: null});
});
router.get("/login", (req, res) => {
    res.render("pages/login", {error: null});
});

router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;