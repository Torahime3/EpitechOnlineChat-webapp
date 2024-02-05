const UserChannelModel = require('../models/user_channels');
const UserModel = require('../models/users');
const ChannelModel = require('../models/channels');

exports.getAllUserChannels = async (req, res) => {
    const userChannels = await UserChannelModel.find();
    res.status(200).json(userChannels);
}

exports.getUsersByChannelId = async (req, res) => {

        const channelId = req.params.channelId;
        const channelUsers = await UserChannelModel.find({channel_id: channelId});
    
        for(let i = 0; i < channelUsers.length; i++){
            const channelUser = channelUsers[i];
            const username = await UserModel.find({_id: channelUser.user_id}).select('username').then((user) => user[0].username);
            channelUsers[i] = {
                ...channelUser._doc,
                username: username
            };
        }
    
        res.status(200).json(channelUsers);
    }

exports.getChannelsByUserId = async (req, res) => {
    
    const userId = req.params.userId;
    const userChannels = await UserChannelModel.find({user_id: userId});

    for(let i = 0; i < userChannels.length; i++){
        const userChannel = userChannels[i];
        const channel_name = await ChannelModel.find({_id: userChannel.channel_id}).select('channel_name').then((channel) => channel[0].channel_name);
        userChannels[i] = {
            ...userChannel._doc,
            channel_name: channel_name
        };
    }

    res.status(200).json(userChannels);
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

    userChannel.save().then(function(){
        res.status(200).json(userChannel)
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
    }).then(function(){
        res.status(200).json({message: "User removed from channel"});
    }).catch(function(err){
        res.status(500).json(err);
    });

}