const express = require("express");
const router = express.Router();
const {signUp, login} = require("../controllers/AuthController");
const {home} = require("../controllers/HomeController");
const {addTodo, getAllTodo, updateTodo, deleteTodo} = require("../controllers/TodoController");
const multer  = require('multer');
const { isLoggedIn } = require("../middlewares/isLogggedIn");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
  
const upload = multer({ storage: storage });

router.get("/test", (req, res) => {
    res.send("Welcome to TEst!");
});

// add middleware to check if user is logged in
router.get("/", home);    

router.get("/signUp", (req, res) => {
    res.render("pages/signUp", {error: null});
});
router.get("/login", (req, res) => {
    res.render("pages/login", {error: null});
});

router.post("/addTodo", isLoggedIn, upload.single("todoImage"), addTodo);
router.get("/getAllTodo", isLoggedIn, getAllTodo);
router.patch("/updateTodo/:id", isLoggedIn, updateTodo);
router.delete("/deleteTodo/:id", isLoggedIn, deleteTodo);

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;