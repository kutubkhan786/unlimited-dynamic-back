import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import eventsRouter from './routes/events.js'
import usersRouter from './routes/users.js'
import contactsRouter from './routes/contacts.js'
import teamsRouter from './routes/teams.js'
import authRouter from './routes/auth.js'
import { seedAdmin } from './utils/seedAdmin.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER 

if (!dbPassword) {
  console.error('Missing DB_PASSWORD in environment.')
  process.exit(1)
}

const mongoUri = `mongodb+srv://${dbUser}:${encodeURIComponent(dbPassword)}@cluster0.hgzownj.mongodb.net/${dbName}?appName=Cluster0`

app.use(
  cors({
    origin: process.env.FRONTEND_URL || true,
    credentials: true,
  })
)
app.use(express.json())
app.use('/api/events', eventsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/teams', teamsRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Unlimited Trekers backend is running.' })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log('Connected to MongoDB Atlas')
    try {
      await seedAdmin()
    } catch (error) {
      console.error('Super admin initialization error:', error)
    }
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
