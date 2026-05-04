import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admin users can log in here' })
    }

    const { _id, name, email, role } = user
    res.json({ user: { id: _id, name, username, email, role } })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

export default router
