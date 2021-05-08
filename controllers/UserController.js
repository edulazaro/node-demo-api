const User = require('../models/User.js');
const UserTransformer = require('../transformers/UserTransformer.js');
const { validationResult } = require('express-validator');

const asyncRedis = require("async-redis");
const redisClient = asyncRedis.createClient();

redisClient.on("error", function (error) {
  console.error(error);
});

/**
 * User controller
 */
class UserController {

  constructor() {
    this.userTransformer = new UserTransformer();
  }

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
      await redisClient.flushall();

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
      let userData = null;
      let cacheKey = 'users';

      if (req.query.email !== undefined) where['email'] = req.query.email;
      if (req.query.givenName !== undefined) where['givenName'] = req.query.givenName;
      if (req.query.familyName !== undefined) where['familyName'] = req.query.familyName;


      for (const key in where) {
        if (!where.hasOwnProperty(key)) continue;
        cacheKey = cacheKey + '_' + key + '-' + where[key];
      }


      const userCacheData = await redisClient.get(cacheKey);

      if (userCacheData !== null) {
        userData = JSON.parse(userCacheData);
      } else {
        const users = await User.findAll({ where });
        userData = this.userTransformer.transformMany(users);
        await redisClient.set(cacheKey, JSON.stringify(userData));
      }

      return res.status(200).json({
        success: true,
        data: userData
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
      let userData = null;

      const userCacheData = await redisClient.get('user_' + userId);

      if (userCacheData !== null) {
        userData = JSON.parse(userCacheData);
      } else {
        const user = await User.findByPk(userId);
        userData = this.userTransformer.transform(user);
        await redisClient.set('user_' + userId, JSON.stringify(userData));
      }

      if (userData === null || !userData) {

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
        data: userData
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
      await redisClient.flushall();
      return res.status(200).json({
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
      await redisClient.flushall();

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