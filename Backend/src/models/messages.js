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
    system_chat: {
        type: Boolean,
        default: false,
        required: true,
    },
});

messageSchema.index({ sender_id: 1 }); 
messageSchema.index({ message_date: -1 }); 
messageSchema.index({ channel_id: 1 });

const MessageModel = mongoose.model('messages', messageSchema)
module.exports = MessageModel;