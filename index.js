const express = require("express");
const app = express();
const PORT = 3000;
const todoRoutes = require("./routes/todoRoutes");
const db = require("./config/database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Server is running fine");
});

app.use(todoRoutes);
db.connectDB();

app.listen(PORT, () => {
    console.log(`Server started successfully at port: ${PORT}`);
});