import express from 'express'
import Contact from '../models/Contact.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load contact details' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ error: 'Contact not found' })
    res.json(contact)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load the contact' })
  }
})

router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body)
    const saved = await contact.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ error: 'Contact creation failed', details: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: 'Contact not found' })
    res.json(updated)
  } catch (error) {
    res.status(400).json({ error: 'Contact update failed', details: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const removed = await Contact.findByIdAndDelete(req.params.id)
    if (!removed) return res.status(404).json({ error: 'Contact not found' })
    res.json({ message: 'Contact deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' })
  }
})

export default router