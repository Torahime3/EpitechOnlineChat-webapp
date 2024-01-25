//Constante permettant de récupérer le model des users
const UserModel = require('../models/users');

exports.getAllUsers = async (req, res) => {
    const result = await UserModel.find().catch(err => {
        res.status(500).json(err);
    });

    res.json({
        success: true,
        result: result
    });
};

exports.getUserById = async (req, res) => {

    const result = await UserModel.findById(req.params.id).catch(err => {
        res.status(500).json(err);
    });

    res.json({
        success: true,
        result: result
    });

};

exports.createUser = async (req, res) => {
    let username = req.body.username;
    let token = require('crypto').randomBytes(32).toString('hex')
    let role = 0;

    const user = new UserModel({
        username: username,
        token: token,
        role: role
    })

    user.save().then(function(){
        res.status(200).json(user)
    }).catch(function(err){
        res.status(500).json(err)
    })
};

exports.updateUser = async (req, res) => {

    const result = await UserModel.updateOne({_id: req.params.id}, req.body).catch(err => {
        res.status(500).json(err);
    });

    res.json({
        success: true,
        message: 'User updated',
        result: result
    });

};

exports.deleteUser = async (req, res) => {
    const result = await UserModel.deleteOne({_id: req.params.id}).catch(err => {
        res.status(500).json(err);
    });

    res.json({
        success: true,
        message: 'User deleted',
        result: result
    });
};
