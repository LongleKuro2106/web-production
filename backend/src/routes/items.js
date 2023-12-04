const express = require('express');

const router = express.Router();

const ITEMS = [
  {
    id: 1,
    name: 'banana',
    quantity: 1,
  },
  {
    id: 2,
    name: 'apple',
    quantity: 2,
  },
  {
    id: 3,
    name: 'orange',
    quantity: 3,
  },
];

router.get('/', (req, res) => {
  res.json(ITEMS);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = ITEMS.find((i) => i.id === id);
  if (!item) {
    res.status(404).json({ message: 'Not found' });
  }
  res.json(item);
});

router.post('/', (req, res) => {
  const item = {
    id: ITEMS.length + 1,
    name: req.body.name,
    quantity: req.body.quantity,
  };

  ITEMS.push(item);
  res.send(item);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = ITEMS.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    res.status(404).send('Not found');
    return;
  }
  ITEMS[itemIndex].name = req.body.name;
  ITEMS[itemIndex].quantity = req.body.quantity;
  res.json(ITEMS[itemIndex]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = ITEMS.find((c) => c.id === id);
  if (!item) {
    res.status(404).send('Not found');
    return;
  }
  const index = ITEMS.indexOf(item);
  ITEMS.splice(index, 1);
  res.status(204).json({ message: 'Item deleted' });
});

module.exports = router;
