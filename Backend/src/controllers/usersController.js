//Constante permettant de récupérer le model des users
const UserModel = require('../models/users');

exports.loginUser = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const user = await UserModel.findOne({username: username, password: password}).catch(err => {
        res.status(500).json(err);
    });

    if(user) {
        res.status(200).json({
            message: "success",
            data: user
        });
    } else {
        res.status(500).json({message: 'User not found'});
    }
}

exports.getAllUsers = async (req, res) => {
    const result = await UserModel.find().select('-token').catch(err => {
        res.status(500).json(err);
    });

    res.json({
        success: true,
        result: result
    });
};

exports.getUserById = async (req, res) => {

    const result = await UserModel.findById(req.params.id).select('-token').catch(err => {
        res.status(500).json(err);
    });

    res.json({
        success: true,
        result: result
    });

};

exports.createUser = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let token = require('crypto').randomBytes(32).toString('hex')
    let role = 0;

    const user = new UserModel({
        username: username,
        password: password,
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
