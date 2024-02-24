const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.setUserStatus = (setConnected, userToken, app) => {
    UserModel.updateOne({ token: userToken }, { connected: setConnected }).then(async () => {
        await app.get('socketio').emit('members')
    }).catch(err => {
        console.log(err);
    });
}

exports.loginUser = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const user = await UserModel.findOne({ username: username }).catch(err => {
        res.status(500).json(err);
    });


    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (validPassword) {
        res.status(200).json({
            message: "success",
            data: user
        });

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

exports.getAllUsernames = async (req, res) => {
    const users = await UserModel.find().select('-token').catch(err => {
        res.status(500).json(err);
    });

    res.json({
        success: true,
        result: users.map(user => user.username),
    });
}

exports.getUsersByName = async (req, res) => {
    try {
        const name = req.params.name;
        const users = await UserModel.find({ username: { $regex: new RegExp(name, 'i') } }).select('-token');
        res.json({
            success: true,
            result: users.map(user => user._id),
        });
    } catch (err) {
        res.status(500).json(err);
    }
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

exports.loginAsAnonymousUser = async (req, res) => {
    const username = 'Anonymous' + Math.floor(Math.random() * 100000);
    const password = require('crypto').randomBytes(16).toString('hex');

    this.createUser({ body: { username: username, password: password } }, res);
}

exports.createUser = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    usernameExist = await UserModel.findOne({username: username});
    if(usernameExist){
        return res.status(400).json({message: 'Username already exists'});
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    let token = require('crypto').randomBytes(32).toString('hex')
    let role = 0;

    const user = new UserModel({
        username: username,
        password: passwordHash,
        token: token,
        role: role
    })

    await user.save().then(function(){
        res.status(200).json({
            message: "success",
            data: user
        })
    }).catch(function(err){
        res.status(500).json(err)
    })
};

exports.updateUser = async (req, res) => {

    const result = await UserModel.updateOne({ _id: req.params.id }, req.body).then(() => {
        req.app.get('socketio').emit('members')
    })
        .catch(err => {
            res.status(500).json(err);
        });


    res.json({
        success: true,
        message: 'User updated',
        result: result
    });

};

exports.deleteUser = async (req, res) => {
    const result = await UserModel.deleteOne({ _id: req.params.id }).catch(err => {
        res.status(500).json(err);
    });

    res.json({
        success: true,
        message: 'User deleted',
        result: result
    });
};
