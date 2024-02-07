const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: Number,
        required: true,
        default: 0
    },
    connected: {
        type: Boolean,
        required: true,
        default: false
    }
})

UserSchema.index({ username: 1 }); // Index ascendant sur le champ username
UserSchema.index({ token: 1 }, { unique: true });

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;