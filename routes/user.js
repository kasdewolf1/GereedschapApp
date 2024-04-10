const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Definieer de route om een specifieke gebruiker op te halen op basis van userId
router.get('/:userId', userController.getUserById);

module.exports = router;






module.exports = router;