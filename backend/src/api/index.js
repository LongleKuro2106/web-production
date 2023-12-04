const express = require('express');

const emojis = require('./emojis');
const items = require('../routes/items');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/items', items);

module.exports = router;
