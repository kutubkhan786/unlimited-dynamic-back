import express from 'express'
import Event from '../models/Event.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 })
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load events' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ error: 'Event not found' })
    res.json(event)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load the event' })
  }
})

router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body)
    const saved = await event.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ error: 'Event creation failed', details: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: 'Event not found' })
    res.json(updated)
  } catch (error) {
    res.status(400).json({ error: 'Event update failed', details: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const removed = await Event.findByIdAndDelete(req.params.id)
    if (!removed) return res.status(404).json({ error: 'Event not found' })
    res.json({ message: 'Event deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Event deletion failed' })
  }
})

export default router
