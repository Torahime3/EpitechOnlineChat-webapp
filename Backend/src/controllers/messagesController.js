const MessageModel = require('../models/messages');
const UserModel = require('../models/users');

exports.getAllMessages = async (req, res) => {
    try {
    
        const result = await MessageModel.find();
        res.json({
            success: true,
            result: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getMessageByChannelId = async (req, res) => {
 

    try {
        const channelId = req.params.channelId;
        const messages = await MessageModel.find({ channel_id: channelId });
        
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            const user = await UserModel.findOne({ _id: message.sender_id }).select('username').then((user) => user.username);
            messages[i] = {
                ...message._doc,
                sender_username: user
            };
        }

        res.json({
            success: true,
            result: messages
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            result: err
        });
    }
};

exports.createMessage = async (req, res) => {
    try {

        const sender_id = req.body.user_id;
        const message_content = req.body.message_content;
        const channelId = req.params.channelId;

        const message = new MessageModel({
            sender_id: sender_id,
            message_content: message_content,
            channel_id: channelId
        });

        await message.save();

        res.json({
            success: true,
            message: 'Message créé',
            result: message
        });

    } catch (err) {
        res.status(500).json({
            err: err
        });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const result = await MessageModel.updateOne({ _id: req.params.messageId }, req.body);
        res.json({
            success: true,
            message: 'Message modifié',
            result: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const result = await MessageModel.deleteOne({ _id: req.params.messageId });
        res.json({
            success: true,
            message: 'Message supprimé',
            result: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};
