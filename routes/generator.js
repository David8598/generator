const express = require('express');
const router = express.Router();
const generatorController = require('../controllers/eventsController');
const eventsController = require('../controllers/eventsController');
const path = require('path')


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'admin', 'generator.html'));
});

// Form generator
router.get('/form', eventsController.handleFormData);

// Event ID redirect handler
router.get('/r', generatorController.redirectToEvent);

module.exports = router;
