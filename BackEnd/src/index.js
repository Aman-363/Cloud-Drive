import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import './config/db.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'CloudDrive API is running ✅' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})