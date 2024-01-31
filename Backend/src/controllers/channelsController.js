const ChannelModel = require('../models/channels');

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
    const channels = await ChannelModel.find();
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

async function updateChannelById(req, res) {
  try {
    const updatedChannel = await ChannelModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedChannel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    res.json(updatedChannel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteChannelById(req, res) {
  try {
    const deletedChannel = await ChannelModel.findByIdAndDelete(req.params.id);

    if (!deletedChannel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    res.json({ message: 'Channel deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createChannel,
  getAllChannels,
  getChannelById,
  updateChannelById,
  deleteChannelById,
};
