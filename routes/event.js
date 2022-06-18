const { Router } = require('express')
const { check } = require('express-validator')
const validationRoute = require('../middlewares/validateRoutes')
const validateToken = require('../middlewares/validateToken')
const { createEvent } = require('../controllers/event')

const router = Router()


router.post('/', [
  validateToken,
  check('title', 'The title is required (+4 Characters)').isLength({ min: 5 }),
  check('start', 'Date init is required').isISO8601().toDate(),
  check('end', 'Date init is required').isISO8601().toDate(),
  validationRoute
], createEvent)



/*
router.get('/', [], getEvents)
router.get('/:id', [], getEventById)
router.put('/:id', [], updateEvent)
router.delete('/:id', [], deleteEvent)
*/


module.exports = router