import bcrypt from 'bcryptjs'
import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load users' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load the user' })
  }
})

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body)
    const saved = await user.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ error: 'User creation failed', details: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updateData = { ...req.body }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10)
    }

    const updated = await User.findByIdAndUpdate(req.params.id, updateData, { new: true })
    if (!updated) return res.status(404).json({ error: 'User not found' })
    res.json(updated)
  } catch (error) {
    res.status(400).json({ error: 'User update failed', details: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const removed = await User.findByIdAndDelete(req.params.id)
    if (!removed) return res.status(404).json({ error: 'User not found' })
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

export default router