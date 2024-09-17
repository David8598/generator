const { db } = require('../database/connection');

// Get all events 
exports.getAll = (callback) => {
  const query = 'SELECT * FROM events_data';
  db.all(query, [], callback);
};

// Get event by ID 
exports.getById = (id, callback) => {
  const query = 'SELECT * FROM events_data WHERE id = ?';
  db.get(query, [id], callback);
};

// Add new event 
exports.add = ({ type, name, city, date, time, description, image }, callback) => {
  const query = 'INSERT INTO events_data (type, name, city, date, time, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.run(query, [type, name, city, date, time, description, image], function (err) {
    callback(err, this.lastID);
  });
};

// Update event in dataDb
exports.update = (id, { type, name, city, date, time, description, image }, callback) => {
  const query = 'INSERT INTO events_data (type, name, city, date, time, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.run(query, [type, name, city, date, time, description, image], function(err) {
    callback(err, this.changes);
  });
};

// Delete event from dataDb
exports.delete = (id, callback) => {
  const query = 'DELETE FROM events_data WHERE id = ?';
  db.run(query, [id], function (err) {
    callback(err, this.changes);
  });
};

// Add new event to appDb
exports.addToAppDb = ({ eventType, eventName, eventCity, eventDate, eventTime }, callback) => {
  const query = 'INSERT INTO events (eventType, eventName, eventCity, eventDate, eventTime) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [eventType, eventName, eventCity, eventDate, eventTime], function (err) {
    callback(err, this.lastID);
  });
};

// Get event by ID from appDb
exports.getByIdFromAppDb = (id, callback) => {
  const query = 'SELECT * FROM events WHERE id = ?';
  db.get(query, [id], callback);
};
