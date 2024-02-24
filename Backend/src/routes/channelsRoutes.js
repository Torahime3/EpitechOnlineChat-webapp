const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelsController');

router.post('/', channelController.createChannel);
router.get('/', channelController.getAllChannels);
router.get('/:id', channelController.getChannelById);
router.get('/name/:channelName', channelController.getChannelByName);
router.put('/:id', channelController.updateChannelById);
router.delete('/:id', channelController.deleteChannelById);

module.exports = router;