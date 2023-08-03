const express = require("express");
const app = express();
const PORT = 3000;
const todoRoutes = require("./routes/todoRoutes");
const db = require("./config/database");
const session = require("express-session");

app.use(express.static("uploads"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(todoRoutes);
db.connectDB();

app.listen(PORT, () => {
    console.log(`Server started successfully at port: ${PORT}`);
});