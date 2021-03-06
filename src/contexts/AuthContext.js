import { createContext, useContext, useEffect, useState } from "react"
import server from "../server"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [keyCode, setKeyCode] = useState("")
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const onLoadKeyCode = async () => {
    setIsLoading(true)
    const res = await server.read("settings/keycode")
    if (res.error) setIsLoading(false)
    setKeyCode(res.val())
  }

  const signIn = async (email, password) => {
    setIsLoading(true)
    const res = await server.signIn(email, password)
    if (res.error) setIsLoading(false)
    return res
  }

  const signOut = async () => {
    setIsLoading(true)
    const res = await server.signOut()
    if (res?.error) setIsLoading(false)
    else setIsConfirmed(false)
    return res
  }

  const signUp = async (email, password) => {
    setIsLoading(true)
    const res = await server.createUser(email, password)
    if (res.error) setIsLoading(false)
    return res
  }

  const getCurrentUser = () => currentUser

  const getIsLoading = () => isLoading

  const getKeyCode = () => keyCode

  const getIsConfirmed = () => isConfirmed

  useEffect(() => {
    const unsubsribe = server.onAuthChange(async user => {
      if (user) {
        await onLoadKeyCode()
      } else {
        setKeyCode("")
      }
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
    getIsLoading,
    getKeyCode,
    getIsConfirmed,
    setIsConfirmed
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
