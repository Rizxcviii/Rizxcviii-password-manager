import { createContext, useContext, useEffect, useState } from "react"
import server from "../server"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const signIn = async (email, password) => {
    setIsLoading(true)
    const res = await server.signIn(email, password)
    if (res.error) setIsLoading(false)
    return res
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

  const getCurrentUser = () => currentUser

  const getIsLoading = () => isLoading

  useEffect(() => {
    const unsubsribe = server.onAuthChange(user => {
      setCurrentUser(user)
      setIsLoading(false)
    })

    return unsubsribe
  }, [])

  const value = {
    getCurrentUser,
    signUp,
    signOut,
    signIn,
    getIsLoading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
