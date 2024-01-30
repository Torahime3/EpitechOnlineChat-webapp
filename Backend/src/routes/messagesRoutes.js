const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messagesController');

router.get('/channels/:channelId/messages', messageController.getAllMessages);
router.post('/channels/:channelId/messages', messageController.createMessage);
router.delete('/channels/:channelId/messages/:messageId', messageController.deleteMessage);
router.get('/channels/:channelId/messages/:messageId', messageController.getMessageById);
router.put('/channels/:channelId/messages/:messageId', messageController.updateMessage);

module.exports = router;
