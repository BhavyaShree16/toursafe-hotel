import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const saved = localStorage.getItem('hotel')
    if (token && saved) {
      setHotel(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('hotel', JSON.stringify(data.hotel))
    setHotel(data.hotel)
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('hotel')
    setHotel(null)
  }

  return (
    <AuthContext.Provider value={{ hotel, login, logout, loading, isLoggedIn: !!hotel }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)