import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const requiredEnv = [
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD'
]

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`)
  }
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.query('SELECT NOW()')
  .then(() => {
    console.log('PostgreSQL connected ✅')
  })
  .catch(err => {
    console.error('PostgreSQL connection failed ❌')
    console.error('Error:', err.message)
  })

pool.on('error', err => {
  console.error('Unexpected PostgreSQL pool error:', err)
})

export default pool