const mongoose = require('mongoose')
const EventModel = require('../models/EventModel')

const createEvent = async (req, res) => {
  const { user, body } = req
  try {
    const event = new EventModel({ ...body, user: user._id })
    await event.save()
    return res.status(201).json(event)

  } catch (error) {
    console.log('createEvent Error: ', error)
    return res.status(500).json({ msg: 'Server Error' })
  }
}

const getEvents = async (req, res) => { 
  try {
    const events = await EventModel.find({}).populate('user', 'username email').lean()
    return res.status(200).json(JSON.parse(JSON.stringify(events)))
  } catch (error) {
    console.log('getEvents Error: ', error)
    return res.status(500).json({ msg: 'Server Error' })
  }
}

const getEventById = async (req, res) => {
  const { id } = req.params
  if (!mongoose.isObjectIdOrHexString(id)) {
    return res.status(400).json({ msg: 'Invalid ID' })
  }

  try {
    const event = await EventModel.findById(id).populate('user', 'username email')
    if (!event) {
      return res.status(400).json({ msg: 'Event not found' })
    }

    return res.status(200).json(event)

  } catch (error) {
    console.log('getEventById Error: ', error)
    return res.status(500).json({ msg: 'Server Error' })
  }
}


const updateEvent = async (req, res) => {
  const { id } = req.params
  if (!mongoose.isObjectIdOrHexString(id)) {
    return res.status(400).json({ msg: 'Invalid ID' })
  }

  try {
    const event = await EventModel.findById(id)
    if (!event) {
      return res.status(400).json({ msg: 'Event not found' })
    }

    const { body, user } = req
    const updatedEvent = await EventModel.findByIdAndUpdate(id, { ...body, user: user._id }, { new: true })

    return res.status(200).json(updatedEvent)
  } catch (error) {
    console.log('getEventById Error: ', error)
    return res.status(500).json({ msg: 'Server Error' })
  }
}

const deleteEvent = async (req, res) => {
  const { id } = req.params
  if (!mongoose.isObjectIdOrHexString(id)) {
    return res.status(400).json({ msg: 'Invalid ID' })
  }

  try {
    const event = await EventModel.findByIdAndDelete(id)
    if (!event) {
      return res.status(400).json({ msg: 'Event not found' })
    }

    return res.status(200).json({ msg: 'Event deleted' })
  } catch (error) {
    console.log('getEventById Error: ', error)
    return res.status(500).json({ msg: 'Server Error' })
  }
}

module.exports = {
  createEvent, 
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
}