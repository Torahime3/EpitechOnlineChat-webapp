//Constante permettant de récupérer le model des users
const UserModel = require('../models/users');

exports.getAllUsers = async (req, res) => {
    res.status(200).send(`All the users`);
};

exports.getUserById = async (req, res) => {
    res.status(200).send(`The user with id ${req.params.id}`);
};

exports.createUser = async (req, res) => {
    res.status(200).send('Create user');
};

exports.updateUser = async (req, res) => {
    res.status(200).send(`Update user with id ${req.params.id}`);
};

exports.deleteUser = async (req, res) => {
    res.status(200).send(`Delete user with id ${req.params.id}`);
};