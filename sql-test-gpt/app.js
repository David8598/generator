const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const port = 3000;

// Защита приложения с помощью Helmet (безопасность HTTP-заголовков)
// app.use(helmet());

// Ограничение числа запросов для защиты от brute-force атак
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Ограничение до 100 запросов с одного IP за 15 минут
});
app.use(limiter);

// Middleware для парсинга данных формы
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение к базе данных SQLite
const db = new sqlite3.Database('./events.db', (err) => {
  if (err) {
    console.error('Ошибка при подключении к базе данных:', err.message);
  } else {
    console.log('Подключение к базе данных SQLite успешно.');

    // Создание таблицы при первом запуске
    db.run(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT NOT NULL,
      name TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL
    )`);
  }
});

// Валидация данных
const isValidInput = (input) => {
  const pattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/u; // Разрешаем только буквы, пробелы и дефисы
  return pattern.test(input);
};

app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для отображения формы (отдача статического HTML файла)
app.get('/admin-panel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-panel', 'index.html'));
});

// Маршрут для обработки данных формы
app.post('/add-event', (req, res) => {
  const { city, name, date, time } = req.body;

  // Валидация данных
  if (!isValidInput(city) || !isValidInput(name)) {
    return res.status(400).send('Неверный ввод: используйте только буквы, пробелы и дефисы.');
  }

  if (!city || !name || !date || !time) {
    return res.status(400).send('Пожалуйста, заполните все поля формы.');
  }

  // Вставка данных в таблицу events
  const query = `INSERT INTO events (city, name, date, time) VALUES (?, ?, ?, ?)`;
  db.run(query, [city, name, date, time], function (err) {
    if (err) {
      console.error('Ошибка при добавлении мероприятия:', err.message);
      return res.status(500).send('Ошибка сервера. Попробуйте позже.');
    } else {
      console.log(`Мероприятие добавлено с ID ${this.lastID}`);
      res.send(`Мероприятие успешно добавлено! ID: ${this.lastID}`);
    }
  });
});

// Обработка 404 ошибки
app.use((req, res) => {
  res.status(404).send('Страница не найдена.');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
