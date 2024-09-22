const express = require('express');
const axios = require('axios');
const router = express.Router();

router.use(express.json()); // Используем встроенный json parser Express

const TELEGRAM_TOKEN = '6778092428:AAEPFXFBCnhDL76DyNghIjWA6-sX4yxhFVg';
const CHAT_ID = '1015804637';

// Обработчик формы
router.post('/', async (req, res) => {
    const { name, city, date, time } = req.body;  // Получаем данные из запроса

    // Формируем сообщение для отправки в Telegram
    const text = `
        Новое сообщение с формы:
        Имя: ${name}
        Город: ${city}
        Дата: ${date}
        Время: ${time}
    `;

    // Отправка данных в Telegram через Telegram Bot API
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    try {
        const response = await axios.post(url, {
            chat_id: CHAT_ID,
            text: text
        });

        if (response.data.ok) {
            res.json({ success: true, message: 'Данные успешно отправлены в Telegram' });
        } else {
            res.json({ success: false, message: 'Ошибка при отправке данных в Telegram' });
        }
    } catch (error) {
        console.error('Ошибка при отправке в Telegram:', error);
        res.json({ success: false, message: 'Ошибка на сервере' });
    }
});

module.exports = router;
