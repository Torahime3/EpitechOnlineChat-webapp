const MessageModel = require('../models/messages');

exports.getAllMessages = async (req, res) => {
    try {
        const channelId = req.params.channelId;
        const result = await MessageModel.find({ channel_id: channelId }).populate('user_id').populate('channel_id').exec();
        res.json({
            success: true,
            result: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const result = await MessageModel.findById(req.params.messageId).populate('user_id').populate('channel_id').exec();
        res.json({
            success: true,
            result: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.createMessage = async (req, res) => {
    try {
        const { user_id, message_content } = req.body;
        const channelId = req.params.channelId;

        const message = new MessageModel({
            user_id: user_id,
            message_content: message_content,
            channel_id: channelId
        });
        await message.save();

        res.status(200).json(message);
    } catch (err) {
        res.status(500).json(err);
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
