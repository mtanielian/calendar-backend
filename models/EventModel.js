const { Schema, model } = require('mongoose')

const EventSchema = new Schema({
  title: { type: String, required: true, minlength: 5 },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  notes: { type: String},
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
},
{timestamps: true}
)


module.exports = model('Event', EventSchema)