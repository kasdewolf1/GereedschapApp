const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.post('/login', userController.viewUser);
router.post('/logout', userController.logoutUser);
router.post('/delete', userController.deleteUser);
router.post('/edit', userController.editUser);






module.exports = router;