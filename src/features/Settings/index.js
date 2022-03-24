import React, { useState } from "react"
import { Flex, Heading } from "theme-ui"
import Notification from "../ui/Notification"
import KeyCode from "./KeyCode"
import SignOut from "./SignOut"

const MSG_TIMEOUT = 2000

const Settings = () => {
  const [msg, setMsg] = useState("")
  const [isError, setIsError] = useState(false)

  const handleError = msg => {
    setMsg(msg)
    setIsError(true)
    setTimeout(() => setIsError(false), MSG_TIMEOUT)
  }

  return (
    <Flex sx={{ flexDirection: "column", height: "470px" }}>
      <Heading as="h1">Settings</Heading>
      <KeyCode handleError={handleError} setMsg={setMsg} />
      <SignOut handleError={handleError} />
      {msg && (
        <Notification
          variant={isError ? "error" : "primary"}
          message={msg}
          count={MSG_TIMEOUT}
          setMessage={setMsg}
        />
      )}
    </Flex>
  )
}

export default Settings
