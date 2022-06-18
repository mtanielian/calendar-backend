const createEvent = async(req, res) => {
  const { title, start, end, notes } = req.body
  const { user } = req
  
  return res.status(201).json({
    _id: 'id de mentira',
    title, start, end, notes,
    user
  })

  
  /*
  const event = new EventModel({ title, start, end })
  event.save()
    .then(event => res.json(event))
    .catch(error => res.status(500).json({ message: 'Server Error' }))
  */
}




module.exports = {
  createEvent
}