import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  bookingLink: { type: String, required: true },
  category: { type: String, default: 'Adventure' },
  createdAt: { type: Date, default: Date.now },
})

const Event = mongoose.model('Event', eventSchema)
export default Event
