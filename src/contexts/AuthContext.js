import { createContext, useContext, useEffect, useState } from "react"
import server from "../server"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currenntUser, setCurrenntUser] = useState()
  const [loading, setLoading] = useState(true)

  const login = (email, password) => server.signIn(email, password)

  const signOut = () => server.singOut()

  const signUp = (email, password) => server.createUser(email, password)

  const getUser = () => server.getUser()

  useEffect(() => {
    const unsubsribe = server.onAuthChange(user => {
      setCurrenntUser(user)
      setLoading(false)
    })

    return unsubsribe
  }, [])

  const value = {
    currenntUser,
    getUser,
    signUp,
    signOut,
    login,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
