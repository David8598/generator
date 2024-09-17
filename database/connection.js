const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database/main.db', (err) => {
  if (err) {
    console.error('Ошибка при подключении к базе данных:', err.message);
  } else {
    console.log('Подключено к базе данных SQLite.');
    // Создание таблицы для данных мероприятий (admin panel data)
    db.run(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventType TEXT,
      eventName TEXT,
      eventCity TEXT,
      eventDate TEXT,
      eventTime TEXT
    )`);

    // Создание таблицы для хранения информации о событиях (data_events)
    db.run(`CREATE TABLE IF NOT EXISTS events_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      name TEXT,
      city TEXT,
      date TEXT,
      time TEXT,
      description TEXT,
      image TEXT  
    )`);
  }
});

module.exports = { db };
