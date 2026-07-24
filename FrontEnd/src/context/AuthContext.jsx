import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const MOCK_USER = {
  id: 'user_1',
  name: 'Aman ',
  email: 'aman@clouddrive.app',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('cd_token')
    if (token) setUser(MOCK_USER)
    setLoading(false)
  }, [])

  function login(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('cd_token', 'mock_jwt_token')
        setUser(MOCK_USER)
        resolve(MOCK_USER)
      }, )
    })
  }

  function logout() {
    localStorage.removeItem('cd_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}