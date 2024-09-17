const express = require('express');
const router = express.Router();
const generatorController = require('../controllers/eventsController');
const eventsController = require('../controllers/eventsController');

// Form generator
// router.get('/generator/form', eventsController.handleFormData);
router.get('/', (req, res) => {
    console.log('log')
  });


// Event ID redirect handler
router.get('/r', generatorController.redirectToEvent);

module.exports = router;
