import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { register } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    // 👉 DIFFERENT FROM LOGIN: a check that doesn't need the server at all
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    register(name, email, password).then(() => {
      toast.success('Account created!')
      navigate('/dashboard')
    })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 80 }}>
      <form onSubmit={handleSubmit} style={{ width: 300 }}>
        <h2>Create your CloudDrive account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />

        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Create Account
        </button>
      </form>
    </div>
  )
}

export default RegisterPage