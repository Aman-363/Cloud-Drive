import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'
import { v4 as uuidv4 } from 'uuid'

function generateToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// POST /api/auth/register
export async function register(req, res) {
  const { name, email, password } = req.body

  try {
    // 1. Check all fields provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // 2. Check if email already exists
    const existing = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email already in use' })
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4. Save user to database
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, storage_used, storage_limit, created_at`,
      [name, email, hashedPassword]
    )

    const user = result.rows[0]

    // 5. Return token + user
    res.status(201).json({
      token: generateToken(user.id),
      user,
    })

  } catch (err) {
    console.error('Register error:', err.message)
    res.status(500).json({ error: 'Server error' })
  }
}

// POST /api/auth/login
export async function login(req, res) {
  const { email, password } = req.body

  try {
    // 1. Find user by email
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const user = result.rows[0]

    // 2. Compare password with hash
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // 3. Return token + user
    res.json({
      token: generateToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        storage_used: user.storage_used,
        storage_limit: user.storage_limit,
      }
    })

  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ error: 'Server error' })
  }
}

// GET /api/auth/me
export async function getMe(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, name, email, storage_used, storage_limit FROM users WHERE id = $1',
      [req.userId]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json({ user: result.rows[0] })
  } catch (err) {
    console.error('GetMe error:', err.message)
    res.status(500).json({ error: 'Server error' })
  }
}