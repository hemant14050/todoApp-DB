const express = require("express");
const router = express.Router();
const {signUp, login} = require("../controllers/AuthController");
const {home} = require("../controllers/HomeController");
const {addTodo, getAllTodo, updateTodo, deleteTodo} = require("../controllers/TodoController");
const multer  = require('multer');

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

router.get("/", home);

router.get("/signUp", (req, res) => {
    res.render("pages/signUp", {error: null});
});
router.get("/login", (req, res) => {
    res.render("pages/login", {error: null});
});

router.post("/addTodo", upload.single("todoImage"), addTodo);
router.get("/getAllTodo", getAllTodo);
router.patch("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;