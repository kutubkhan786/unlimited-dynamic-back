import express from 'express'
import Team from '../models/Team.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find({ isActive: true }).sort({ createdAt: -1 })
    res.json(teams)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load team members' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
    if (!team) return res.status(404).json({ error: 'Team member not found' })
    res.json(team)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load the team member' })
  }
})

router.post('/', async (req, res) => {
  try {
    const team = new Team(req.body)
    const saved = await team.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ error: 'Team member creation failed', details: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updated = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: 'Team member not found' })
    res.json(updated)
  } catch (error) {
    res.status(400).json({ error: 'Team member update failed', details: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const removed = await Team.findByIdAndDelete(req.params.id)
    if (!removed) return res.status(404).json({ error: 'Team member not found' })
    res.json({ message: 'Team member deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team member' })
  }
})

export default router