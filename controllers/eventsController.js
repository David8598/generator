const eventsModel = require('../models/eventsModel');

// Get all events from dataDb
exports.getAllEvents = (req, res) => {
  eventsModel.getAll((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Get event by ID from dataDb
exports.getEventById = (req, res) => {
  const { id } = req.params;
  eventsModel.getById(id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
};

// Add new event to dataDb
exports.addEvent = (req, res) => {
  const { type, name, city, date, time } = req.body;
  eventsModel.add({ type, name, city, date, time }, (err, lastID) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: lastID });
  });
};

// Update event in dataDb
exports.updateEvent = (req, res) => {
  const { id } = req.params;
  const { type, name, city, date, time } = req.body;
  eventsModel.update(id, { type, name, city, date, time }, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ updated: changes });
  });
};

// Delete event from dataDb
exports.deleteEvent = (req, res) => {
  const { id } = req.params;
  eventsModel.delete(id, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ deleted: changes });
  });
};

// Handle form data and insert into appDb
exports.handleFormData = (req, res) => {
  const { eventType, eventName, eventCity, eventDate, eventTime } = req.query;

  if (!eventType || !eventName || !eventCity || !eventDate || !eventTime) {
    return res.status(400).send('All parameters must be provided.');
  }

  eventsModel.addToAppDb({ eventType, eventName, eventCity, eventDate, eventTime }, (err, lastID) => {
    if (err) {
      return res.status(500).send('Error saving data.');
    }

    const newUrl = `http://localhost:3000/generator?url=${lastID}`;
    res.redirect(newUrl);
  });
};

// Redirect to event page based on ID from appDb
exports.redirectToEvent = (req, res) => {
  const idToSearch = req.query.i;

  eventsModel.getByIdFromAppDb(idToSearch, (err, data) => {
    if (err || !data) {
      return res.status(404).send('Data not found');
    }

    const queryParams = new URLSearchParams({
      id: data.id,
      type: data.eventType,
      name: data.eventName,
      city: data.eventCity,
      date: data.eventDate,
      time: data.eventTime,
    }).toString();

    const fullUrl = `https://localhost:3000/buytickets?${queryParams}`;
    res.redirect(fullUrl);
  });
};
