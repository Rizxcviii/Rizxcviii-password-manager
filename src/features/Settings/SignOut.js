import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "theme-ui"
import { useAuth } from "../../contexts/AuthContext"

const SingOut = ({ setErrMsg }) => {
  const { signOut } = useAuth()
  const history = useHistory()

  const handleSignOut = async () => {
    const res = await signOut()
    if (!res) {
      history.push("/")
    } else {
      setErrMsg("There has been an error signing out, error: " + res.err)
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
