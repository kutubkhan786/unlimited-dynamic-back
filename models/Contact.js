import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  instagram: { type: String },
  facebook: { type: String },
  whatsapp: { type: String },
  createdAt: { type: Date, default: Date.now },
})

const Contact = mongoose.model('Contact', contactSchema)
export default Contact