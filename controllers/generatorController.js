const eventsModel = require('../models/eventsModel');

// Generate form data and insert into the database
exports.generateForm = (req, res) => {
  const { eventType, eventName, eventCity, eventDate, eventTime } = req.query;

  if (!eventType || !eventName || !eventCity || !eventDate || !eventTime) {
    return res.status(400).send('All parameters must be provided.');
  }

  eventsModel.addToAppDb({ type: eventType, name: eventName, city: eventCity, date: eventDate, time: eventTime }, (err, lastID) => {
    if (err) {
      return res.status(500).send('Error saving data.');
    }

    const newUrl = `http://localhost:3000/generator?url=${lastID}`;
    res.redirect(newUrl);
  });
};

// Redirect to event page based on ID
exports.redirectToEvent = (req, res) => {
  const idToSearch = req.query.i;

  eventsModel.getById(idToSearch, (err, data) => {
    if (err || !data) {
      return res.status(404).send('Data not found');
    }

    const queryParams = new URLSearchParams({
      id: data.id,
      type: data.type,
      name: data.name,
      city: data.city,
      date: data.date,
      time: data.time,
    }).toString();

    const fullUrl = `https://localhost:3000/buytickets?${queryParams}`;
    res.redirect(fullUrl);
  });
};
