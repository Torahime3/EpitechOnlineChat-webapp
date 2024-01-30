const express = require('express');
const router = express.Router();
const privateMessageController = require('../controllers/privateMessageController');

router.get('/', privateMessageController.getAllPrivateMessages);
router.get('/:id', privateMessageController.getPrivateMessageById);
router.post('/', privateMessageController.createPrivateMessage);
router.put('/:id', privateMessageController.updatePrivateMessage);
router.delete('/:id', privateMessageController.deletePrivateMessage);

module.exports = router;
