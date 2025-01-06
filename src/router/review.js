const express = require('express');
const Tour = require('../models/Tour');
const router = express.Router();

router.post('/:tourId', async (req, res) => {
  const { tourId } = req.params;
  const { name, rating } = req.body;

  const tour = await Tour.findById(tourId);
  tour.reviews.push({ name, rating });
  tour.avgRating = tour.reviews.reduce((acc, review) => acc + review.rating, 0) / tour.reviews.length;
  await tour.save();

  res.status(201).json(tour);
});

module.exports = router;