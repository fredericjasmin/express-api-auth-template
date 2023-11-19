const { Router } = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.post('/register',
    [
        check("name", "The name is required").not().isEmpty(),
        check("email", "The email is required").isEmail(),
        check("password", "The password must be a minimum of 5 characters.").isLength({ min: 5 }),
        validateFields
    ],
    registerUser)
router.post('/login',
    [
        check("email", "The email is required").isEmail(),
        check("password", "The password must be a minimum of 5 characters.").isLength({ min: 5 }),
        validateFields
    ]
    , loginUser)
router.get('/renew',
    validateJWT
    , revalidateToken)

module.exports = router;