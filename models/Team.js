import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  bio: { type: String },
  experience: { type: String },
  socialLinks: {
    instagram: { type: String },
    linkedin: { type: String },
    facebook: { type: String },
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})

const Team = mongoose.model('Team', teamSchema)
export default Team