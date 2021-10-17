import { createContext, useContext, useEffect, useState } from "react"
import server from "../server"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = (email, password) => {
    setIsLoading(true)
    return server.signIn(email, password)
  }

  const signOut = () => {
    setIsLoading(true)
    return server.singOut()
  }

  const signUp = async (email, password) => {
    setIsLoading(true)
    const res = await server.createUser(email, password)
    if (res.error) setIsLoading(false)
    return res
  }

  const getUser = () => server.getUser()

  const getIsLoading = () => isLoading

  useEffect(() => {
    const unsubsribe = server.onAuthChange(user => {
      setCurrentUser(user)
      setIsLoading(false)
    })

    return unsubsribe
  }, [])

  const value = {
    currentUser,
    getUser,
    signUp,
    signOut,
    login,
    getIsLoading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
