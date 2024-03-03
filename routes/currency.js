const axios = require('axios');
const express = require('express');
const router = express.Router();

// GET-запрос на страницу с формой
router.get('/', (req, res) => {
    res.render('currency', { lang: req.query.lang });
});

// POST-запрос для обработки формы и генерации пароля
router.post('/', async (req, res) => {
    try {
        // Получаем длину пароля из формы
        const length = req.body.q;
        const apiKey = 'q4YjfLLRB1wOsGwjQ2sM9w==oQt9XwQklFEfSS6s';

        // Отправляем запрос к API для генерации пароля
        const response = await axios.get('https://api.api-ninjas.com/v1/passwordgenerator', {
            params: { length: length },
            headers: { 'X-Api-Key': apiKey }
        });

        // Отправляем сгенерированный пароль на страницу
        res.render('currency', { random_password: response.data.random_password, lang: req.query.lang });
    } catch (error) {
        console.error('Request failed:', error);
        res.render('error');
    }
});

module.exports = router;
