import React, { useState } from "react"
import { Flex, Heading } from "theme-ui"
import Notification from "../ui/Notification"
import SignOut from "./SignOut"

const Settings = () => {
  const [errMsg, setErrMsg] = useState("")

  return (
    <Flex sx={{ flexDirection: "column", height: "470px" }}>
      <Heading as="h1">Settings</Heading>
      <SignOut setErrMsg={setErrMsg} />
      {errMsg && (
        <Notification message={errMsg} count={2000} setMessage={setErrMsg} />
      )}
    </Flex>
  )
}

export default Settings
