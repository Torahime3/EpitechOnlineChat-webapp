const ChannelModel = require('../models/channels');

async function getAllChannels(req, res) {
    try {
      const channels = await ChannelModel.find();
      res.json(channels);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

async function getChannelById(req, res) {
    res.json(res.channels);
  }


async function createChannels(req, res) {
    const channels = new ChannelModel(req.body);
    try {
      const newChannel = await channels.save();
      res.status(201).json(newChannel);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
