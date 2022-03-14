import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Flex, Heading } from "theme-ui"
import { useAuth } from "../../contexts/AuthContext"
import Notification from "../ui/Notification"

const Settings = () => {
  const [errMsg, setErrMsg] = useState("")
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
    <Flex sx={{ flexDirection: "column", height: "470px" }}>
      <Heading as="h1">Settings</Heading>
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
      {errMsg && (
        <Notification message={errMsg} count={2000} setMessage={setErrMsg} />
      )}
    </Flex>
  )
}

export default Settings
