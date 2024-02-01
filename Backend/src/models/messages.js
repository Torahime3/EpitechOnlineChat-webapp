const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender_id: {
        type: String,
        ref: 'users',
        required: true,
    },
    message_content: {
        type: String,
        maxLength: 500,
        required: true,
    },
    message_date: {
        type: Date,
        default: Date.now,
        required: true,
    },

    channel_id: {
        type: String,
        ref: 'channels',
        required: true,
    },
});

const MessageModel = mongoose.model('messages', messageSchema)
module.exports = MessageModel;