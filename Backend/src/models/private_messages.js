const mongoose = require('mongoose');

const privateMessageSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        ref: 'users',
        required: true
    },
    pm_message_content: {
        type: String,
        required: true,
        maxlength: 500
    },
    pm_message_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    target_id: {
        type: Number,
        ref: 'users',
        required: true
    },
});

const PrivateMessage = mongoose.model('privatemessage', privateMessageSchema)
module.exports = PrivateMessage;