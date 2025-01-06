const express = require('express');
const Tour = require('../models/Tour');
const router = express.Router();

router.get('/', async (req, res) => {
  const tours = await Tour.find();
  res.json(tours);
});

router.post('/', async (req, res) => {
  const tour = new Tour(req.body);
  await tour.save();
  res.status(201).json(tour);
});

router.put('/:id', async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tour);
});

router.delete('/:id', async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;