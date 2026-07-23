import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    login(email, password).then(() => {
      toast.success('Logged in!')
      navigate('/dashboard')
    })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 80 }}>
      <form onSubmit={handleSubmit} style={{ width: 300 }}>
        <h2>Login to CloudDrive</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />

        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Log In
        </button>
      </form>
    </div>
  )
}

export default LoginPage