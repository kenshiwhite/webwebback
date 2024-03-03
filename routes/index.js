const express = require('express');
const router = express.Router();
const axios = require('axios');
const { isAuthenticated } = require('../middlware/authentication');

router.get('', isAuthenticated, async (req, res) => {
    const lang = req.query.lang || 'en';

    try {
        const options = {
            method: 'GET',
            url: 'https://cpu-data.p.rapidapi.com/cpus',
            params: { page: '1' },
            headers: {
                'X-RapidAPI-Key': '60293e93ecmsh246c7aefbd5e3b8p1d569djsn31b53d3c4217',
                'X-RapidAPI-Host': 'cpu-data.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const processors = response.data; // Полученные данные о процессорах

        res.render('index', { processors, lang });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Маршрут для поиска процессора по имени
router.post('/', async (req, res) => {
    const lang = req.query.lang || 'en';
    const processorName = req.body.q.toLowerCase(); // Преобразуем запрос в нижний регистр для удобства поиска

    try {
        const options = {
            method: 'GET',
            url: 'https://cpu-data.p.rapidapi.com/cpus',
            params: { page: '1' },
            headers: {
                'X-RapidAPI-Key': '60293e93ecmsh246c7aefbd5e3b8p1d569djsn31b53d3c4217',
                'X-RapidAPI-Host': 'cpu-data.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const processors = response.data; // Полученные данные о процессорах

        // Фильтруем процессоры по имени
        const filteredProcessors = processors.filter(processor => processor.CPU_Name.toLowerCase().includes(processorName));

        res.render('index', { processors: filteredProcessors, lang });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;