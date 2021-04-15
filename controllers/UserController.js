const User = require('../models/User.js');
const { validationResult } = require('express-validator');

/**
 * User controller
 */
class UserController {

  /**
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {function} next The callback to the next program handler
   * @return {Object} res The response object
   */
  createUser = async (req, res, next) => {

    try {
      const email = req.body.email;
      const givenName = req.body.givenName;
      const familyName = req.body.familyName;

      const errors = validationResult(req);
      const existingUser = await User.findOne({ where: { email: email } });

      if (existingUser !== null) {
        errors.errors.push({
          value: email,
          msg: 'A user with the specified email already exists',
          param: 'email',
          location: 'body'
        });
      }

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const user = await User.create({ email, givenName, familyName });

      return res.status(201).json({
        success: true,
        data: user
      });

    } catch (e) {
      console.log(e);
      res.status(500).json({
        error: true,
        message: e.toString()
      });
    }
  }

  /**
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {function} next The callback to the next program handler
   * @return {Object} res The response object
   */
  indexUsers = async (req, res, next) => {

    try {

      const where = {};

      if (req.query.email !== undefined) where['email'] = req.query.email;
      if (req.query.givenName !== undefined) where['givenName'] = req.query.givenName;
      if (req.query.familyName !== undefined) where['familyName'] = req.query.familyName;

      const users = await User.findAll({ where });

      return res.status(200).json({
        success: true,
        data: users
      });

    } catch (e) {
      console.log(e);
      res.status(500).json({
        error: true,
        message: e.toString()
      });
    }
  }

  /**
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {function} next The callback to the next program handler
   * @return {Object} res The response object
   */
  getUser = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const user = await User.findByPk(userId);

      if (user === null) {

        return res.status(404).json({
          success: false,
          errors: [{
            value: userId,
            msg: 'The user with the specified userId was not found',
            param: 'userId',
            location: 'route'
          }]
        });
      }

      return res.status(200).json({
        success: true,
        data: user
      });

    } catch (e) {
      console.log(e);
      res.status(500).json({
        error: true,
        message: e.toString()
      });
    }
  }

  /**
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {function} next The callback to the next program handler
   * @return {Object} res The response object
   */
   deleteUser = async (req, res, next) => {

    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (user === null) {

      return res.status(404).json({
        success: false,
        errors: [{
          value: userId,
          msg: 'The user with the specified userId was not found',
          param: 'userId',
          location: 'route'
        }]
      });
    }

    try {
      await user.destroy();
        return res.status(204).json({
          success: true,
        });       
    } catch (e) {
      console.log(e);
      res.status(500).json({
        error: true,
        message: e.toString()
      });
    }
  }

  /**
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {function} next The callback to the next program handler
   * @return {Object} res The response object
   */
  updateUser = async (req, res, next) => {
    try {

      const userId = req.params.userId;
      const user = await User.findByPk(userId);
  
      if (user === null) {
        return res.status(404).json({
          success: false,
          errors: [{
            value: userId,
            msg: 'The user with the specified userId was not found',
            param: 'userId',
            location: 'route'
          }]
        });
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      if (req.body.email !== undefined) user.email = req.body.email;
      if (req.body.givenName !== undefined) user.givenName = req.body.givenName;
      if (req.body.familyName !== undefined) user.familyName = req.body.familyName;

      await user.save();

      return res.status(200).json({
        success: true,
        data: user
      });

    } catch (e) {
      console.log(e);
      res.status(500).json({
        error: true,
        message: e.toString()
      });
    }
  }
}

module.exports = UserController;