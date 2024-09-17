const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

// Get all events
router.get('/events', eventsController.getAllEvents);

// Get event by ID
router.get('/events/:id', eventsController.getEventById);

// Add new event
router.post('/events', eventsController.addEvent);

// Update event
router.put('/events/:id', eventsController.updateEvent);

// Delete event
router.delete('/events/:id', eventsController.deleteEvent);

module.exports = router;
