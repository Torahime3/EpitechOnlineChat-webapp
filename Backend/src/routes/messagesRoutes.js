const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messagesController');

router.get('/', messageController.getAllMessages);
router.get('/:channelId', messageController.getMessageByChannelId);
router.post('/:channelId', messageController.createMessage);
router.delete('/:messageId', messageController.deleteMessage);
// router.put('/channels/:channelId/messages/:messageId', messageController.updateMessage);

module.exports = router;
