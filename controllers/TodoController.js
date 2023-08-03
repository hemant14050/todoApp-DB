const Todo = require("../models/Todo");

exports.addTodo = async(req, res) => {
    try {
        const {todoTitle} = req.body;
        const imageUrl = req.file.filename;
        // console.log(todoTitle, imageUrl);
        const todo = await Todo.create({
            title: todoTitle,
            imageUrl: imageUrl
        });
        res.redirect("/");
        
    } catch(err) {
        console.log("Error while adding todo: ", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

exports.getAllTodo = async(req, res) => {
    try {
        const todoData = await Todo.find({});
        console.log(todoData);
        res.status(200).json({
            success: true,
            todoData: todoData,
            message: "All todo data fetched successfully"
        });
        return;
        
    } catch(err) {
        console.log("Error while fetching todo: ", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

exports.updateTodo = async(req, res) => {
    try {
        const {id} = req.params;
        console.log(id);
        const todoData = await Todo.findOne({createdAt: id});
        const updated = await Todo.findOneAndUpdate({createdAt: id}, {completed: !todoData.completed});
        res.status(200).json({
            success: true,
            message: "success"
        });

    } catch(err) {
        console.log("Error while updating todo: ", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

exports.deleteTodo = async(req, res) => {
    try {
        const {id} = req.params;
        console.log(id);
        const updated = await Todo.findOneAndDelete({createdAt: id});
        res.status(200).json({
            success: true,
            message: "success"
        });

    } catch(err) {
        console.log("Error while updating todo: ", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}