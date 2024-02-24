const UserChannelModel = require('../models/user_channels');
const UserModel = require('../models/users');
const ChannelModel = require('../models/channels');
const MessageModel = require('../models/messages');
const { createMessage } = require('./messagesController');

exports.getAllUserChannels = async (req, res) => {
    const userChannels = await UserChannelModel.find();
    res.status(200).json(userChannels);
}

exports.getUsersByChannelId = async (req, res) => {

        const channelId = req.params.channelId;
        const channelUsers = await UserChannelModel.find({channel_id: channelId})
            .populate('user_id', 'username connected');
        res.status(200).json(channelUsers);
    }

exports.getChannelsByUserId = async (req, res) => {
    
    try {
        const userId = req.params.userId;
        const userChannels = await UserChannelModel.find({ user_id: userId })
            .populate('channel_id', 'channel_name channel_description channel_creation_date is_private');

        res.status(200).json(userChannels);
    } catch (err) {
        res.status(500).json({
            success: false,
            result: err
        });
    }
}

exports.addUserToChannel = async (req, res) => {

    const userId = req.body.user_id;
    const channelId = req.body.channel_id;

    const userChannel = new UserChannelModel({
        user_id: userId,
        channel_id: channelId
    });

    if (await UserChannelModel.findOne({user_id: userId, channel_id: channelId})) {
        res.status(500).json({message: "User already in channel"});
        return;
    }

    userChannel.save().then(async function(){

        sendConnexionMessage(req, userId, channelId, true);

        await req.app.get('socketio').emit('channel_' + userId, {
            userChannel
        });

        await req.app.get('socketio').emit('members')
        
        res.status(200).json(userChannel);

    }).catch(function(err){
        res.status(500).json(err);
    });

}

exports.removeUserFromChannel = async (req, res) => {

    const userId = req.body.user_id;
    const channelId = req.body.channel_id;

    await UserChannelModel.findOneAndDelete({
        user_id: userId,
        channel_id: channelId
    }).then(async function(){

        sendConnexionMessage(req, userId, channelId, false);

        req.app.get('socketio').emit('channel_' + userId, {
            userChannel: null
        });
        
        req.app.get('socketio').emit('members')
        res.status(200).json({message: "User removed from channel"});


    }).catch(function(err){
        res.status(500).json(err);
    });

}

const sendConnexionMessage = async (req, userId, channelId, join) => {

    const username = await UserModel.findOne({_id: userId}).select('username').then(username => { return username.username });
        const message = new MessageModel({
            sender_id: userId,
            message_content: username + " a " + (join ? " rejoint " : " quitté ") + "le channel",
            channel_id: channelId,
            system_chat: true,
        });
        await message.save();

        const clientMessage = await MessageModel.find({ _id: message._id }).populate('sender_id', 'username');
        req.app.get('socketio').emit('message_' + channelId, {
            clientMessage
        });
    }
