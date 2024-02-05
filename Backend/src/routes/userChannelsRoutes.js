const express = require('express');
const router = express.Router();
const userChannelsController = require('../controllers/userChannelsController');

router.get('/', userChannelsController.getAllUserChannels);
router.get('/channel/:channelId', userChannelsController.getUsersByChannelId);
router.get('/:userId', userChannelsController.getChannelsByUserId);
router.post('/', userChannelsController.addUserToChannel);
router.delete('/', userChannelsController.removeUserFromChannel);

module.exports = router;