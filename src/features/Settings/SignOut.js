import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "theme-ui"
import { useAuth } from "../../contexts/AuthContext"

const SingOut = ({ handleError }) => {
  const { signOut } = useAuth()
  const history = useHistory()

  const handleSignOut = async () => {
    const res = await signOut()
    if (!res) {
      history.push("/")
    } else {
      handleError("There has been an error signing out, error: " + res.err)
    }
  }
  return (
    <Button
      type="button"
      variant="outline.primary"
      onClick={() => handleSignOut()}
      sx={{
        width: "150px",
        alignSelf: "center"
      }}
    >
      Sign Out
    </Button>
  )
}

export default SingOut
