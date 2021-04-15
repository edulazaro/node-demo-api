const userRoutes = require('./RouteManager');
const express = require("express");

const router = express.Router();

router.use('/users', userRoutes);

module.exports = router;