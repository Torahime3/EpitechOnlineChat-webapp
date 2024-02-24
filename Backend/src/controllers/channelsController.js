const ChannelModel = require('../models/channels');
const UserChannelModel = require('../models/user_channels');
const MessageModel = require('../models/messages');

async function createChannel(req, res) {
  try {
    const newChannel = new ChannelModel(req.body);
    const savedChannel = await newChannel.save();
    res.status(201).json(savedChannel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllChannels(req, res) {
  try {
    const channels = await ChannelModel.find({ is_private: false });
    res.json(channels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function getChannelById(req, res) {
  try {
    const channel = await ChannelModel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getChannelByName(req, res) {
  try {
    const channelName = req.params.channelName;
    const channel = await ChannelModel.findOne({ channel_name: channelName, is_private: false });

    if (!channel) {
      return res.status(404).json({ message: 'Public channel not found' });
    }

    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function updateChannelById(req, res) {
  try {
    const userId = req.body.user_id;
    const updatedChannel = await ChannelModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedChannel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    req.app.get('socketio').emit('channel_' + userId, {
      userChannel:null
    })

    res.json(updatedChannel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteChannelById(req, res) {
  try {
    const channelId = req.params.id;
    const userId = req.body.user_id;
    const deletedChannel = await ChannelModel.findByIdAndDelete(channelId);

    if (!deletedChannel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    await UserChannelModel.deleteMany({ channel_id: channelId });
    await MessageModel.deleteMany({ channel_id: channelId });

    req.app.get('socketio').emit('channel_' + userId, {
      userChannel:null
    })
    
    res.json({ message: 'Channel and associated records deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createChannel,
  getAllChannels,
  getChannelById,
  getChannelByName,
  updateChannelById,
  deleteChannelById,
};
