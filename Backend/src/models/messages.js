const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        ref: 'users'
    },
    message_content: {
        type: String,
        maxLength: 500

    },
    message_date: {
        type: Date,
        default: Date.now
    },

    channel_id: {
        type: Number,
        ref: 'channels'
    },
});

const MessageModel = mongoose.model('messages', messageSchema)
module.exports = MessageModel;