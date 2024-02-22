const express = require('express');
const router = express.Router();
const DogRouter = require('./DogRouter');
const TemperamentRouter = require('./temperamentRouter');

router.use('/dogs', DogRouter);
router.use('/temperament', TemperamentRouter);

module.exports = router;