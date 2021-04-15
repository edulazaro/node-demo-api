
/*
const express = require("express");

const UserController = require('../controllers/UserController');

userRoutes.get('/', async (req, res) => {
  const params = req.body;
  res.json({ users: [{ name: 'Timmy' }] });
});

module.exports = userRoutes;
*/




const { Router } = require('express');
const userRoutes = require('./userRoutes.js');

/**
 * Class to manage routes
 */
 class RouteManager
 {
     /**
      * Constructor
      *
      * @var {Object} app The app class instance
      * @constructor
      */
     constructor(app)
     {
         this.router = Router();
         this.app = app;
     }
 
     /**
      * Configure route files
      *
      * @return {void}
      */
     config()
     {
        this.router.use('/users', userRoutes);
 
        this.router.use(function(req, res) {
          res.status(404).json({
              error: true,
              message: 'Not Found'
          });
        });
 
        this.app.use('/api', this.router);
     }
 }
 
 module.exports = RouteManager;