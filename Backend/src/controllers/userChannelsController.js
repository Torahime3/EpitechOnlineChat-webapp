const UserChannelModel = require('../models/user_channels');

exports.getAllUserChannels = async (req, res) => {
    const userChannels = await UserChannelModel.find();
    res.status(200).json(userChannels);
}

exports.getChannelsByUserId = async (req, res) => {
    
    const userId = req.params.userId;
    const channels = await UserChannelModel.find({user_id: userId});
    res.status(200).json(channels);
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