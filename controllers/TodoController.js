const Todo = require("../models/Todo");

exports.addTodo = async(req, res) => {
    try {

    } catch(err) {
        console.log("Error while adding todo: ", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

exports.updateTodo = async(req, res) => {
    try {

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

    } catch(err) {
        console.log("Error while deleting todo: ", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}