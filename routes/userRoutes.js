const { Router } = require('express')
const { body, check } = require('express-validator');
const UserController = require('../controllers/UserController');
const router = Router();

const userController = new UserController();


router.post(
    '/',
    body('email').isEmail().normalizeEmail(),
    body('givenName').isLength({ min: 1 }),
    body('familyName').isLength({ min: 1 }),
    userController.createUser
);

router.get('/', userController.indexUsers);
router.get('/:userId', userController.getUser);
router.delete('/:userId', userController.deleteUser);

router.patch('/:userId',
    check('email',"The email is not valid").optional().isEmail(),
    check('givenName',"The givenName is not valid").optional().isLength({ min: 1 }),
    check('familyName',"The familyName is not valid").optional().isLength({ min: 1 }),
    userController.updateUser
);

module.exports = router;