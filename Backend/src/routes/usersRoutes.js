const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.get('/username', userController.getAllUsernames);
router.get('/username/:name', userController.getUsersByName);
router.get('/:id', userController.getUserById);
router.get('/login/anonymous', userController.loginAsAnonymousUser);
router.get('/', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;