const { Router } = require('express')
const { check } = require('express-validator')
const validationRoute = require('../middlewares/validateRoutes')
const validateToken = require('../middlewares/validateToken')
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/event')

const router = Router()

/**
 * Route: '/api/event'
 */

router.post('/', [
  validateToken,
  check('title', 'The title is required (+4 Characters)').isLength({ min: 5 }),
  check('start', 'Date init is required').isISO8601().toDate(),
  check('end', 'Date init is required').isISO8601().toDate(),
  validationRoute
], createEvent)


router.get('/', validateToken, getEvents)
router.get('/:id', validateToken, getEventById)
router.put('/:id',[
  validateToken,
  check('title', 'The title is required (+4 Characters)').isLength({ min: 5 }),
  check('start', 'Date init is required').isISO8601().toDate(),
  check('end', 'Date init is required').isISO8601().toDate(),
  validationRoute
],  updateEvent)


router.delete('/:id', validateToken, deleteEvent)


module.exports = router