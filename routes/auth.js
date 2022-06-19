const { Router } = require('express')
const { check } = require('express-validator')
const { loginUser, logoutUser, createUser, revalidateToken } = require('../controllers/auth')
const validationRoute = require('../middlewares/validateRoutes')
const validateToken = require('../middlewares/validateToken')
const router = Router()

/**
 * Route: '/api/auth'
 */


router.post('/login', [
  check('email', 'The email is required').isEmail(),
  check('password', 'The password is required (+6 characters)').isLength({ min: 6 }),
  validationRoute
  ], 
  loginUser
)

router.post('/logout', [
  check('token', 'The token is required').not().isEmpty(),
  validationRoute
], logoutUser)

router.post('/register',  [
  check('username', 'The username is required').not().isEmpty(),
  check('email', 'The email is required').isEmail(),
  check('password', 'The password is required (+6 characters)').isLength({ min: 6 }),
  validationRoute
  ], 
  createUser
)

router.get('/renew', validateToken, revalidateToken)



module.exports = router