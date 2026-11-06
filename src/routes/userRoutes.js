const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

// As nossas 4 rotas do CRUD de utilizadores:
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;