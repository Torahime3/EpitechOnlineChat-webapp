const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/login/anonymous', userController.loginAsAnonymousUser)
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;