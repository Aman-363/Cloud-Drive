import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

pool.connect()
  .then(client => {
    console.log('PostgreSQL connected ✅')
    client.release()
  })
  .catch(err => {
    console.error('Connection failed!')
    console.error('Error message:', err.message)
  })

export default pool