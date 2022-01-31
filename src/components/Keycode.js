import { Button, Flex, Input, Paragraph, Spinner } from "@theme-ui/components"
import React, { useState } from "react"
import { useHistory } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import server from "../server"
import Loader from "./ui/Loader"
import Notification from "./ui/Notification"

const CreateKeyCode = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { signOut, setIsConfirmed } = useAuth()
  const history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    const data = new FormData(e.target)
    const keycode = data.get("keycode")
    const res = await server.write(`settings`, "keycode", keycode)
    if (res?.err) {
      console.log(res)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setIsConfirmed(true)
      history.push("/passwords")
    }
  }

  const handleSignOut = () => signOut()

  return (
    <Flex sx={{ flexDirection: "column" }} as="form" onSubmit={handleSubmit}>
      <Paragraph>Please enter a keycode to secure your vault</Paragraph>
      <Input
        required
        mt={2}
        type="password"
        name="keycode"
        placeholder="keycode..."
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <Flex
          mt={2}
          sx={{
            justifyContent: "space-between"
          }}
        >
          <Button
            sx={{
              width: "180px",
              fontSize: 5,
              alignSelf: "center"
            }}
            type="submit"
          >
            Submit
          </Button>
          <Button
            sx={{
              width: "180px",
              fontSize: 5,
              alignSelf: "center"
            }}
            type="button"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

const ConfirmKeyCode = ({ keycode }) => {
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const [errMsg, setErrMsg] = useState("")
  const { signOut, setIsConfirmed } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    const data = new FormData(e.target)
    const code = data.get("keycode")
    if (code === keycode) {
      setIsConfirmed(true)
      setIsLoading(false)
      history.push("/passwords")
    } else {
      setErrMsg("Incorrect keycode, please try again.")
      setIsLoading(false)
    }
  }

  const handleSignOut = () => signOut()

  return (
    <Flex sx={{ flexDirection: "column" }} as="form" onSubmit={handleSubmit}>
      <Paragraph>Please enter you keycode</Paragraph>
      <Input
        required
        mt={2}
        type="password"
        name="keycode"
        placeholder="keycode..."
      />
      {isLoading ? (
        <Loader message="Verfiying your keycode..." />
      ) : (
        <Flex
          mt={2}
          sx={{
            justifyContent: "space-between"
          }}
        >
          <Button
            sx={{
              width: "180px",
              fontSize: 5,
              alignSelf: "center"
            }}
            type="submit"
          >
            Submit
          </Button>
          <Button
            sx={{
              width: "180px",
              fontSize: 5,
              alignSelf: "center"
            }}
            type="button"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Flex>
      )}
      {errMsg && (
        <Notification
          variant="error"
          message={errMsg}
          setMessage={setErrMsg}
          count={2000}
        />
      )}
    </Flex>
  )
}

const Keycode = () => {
  const { getKeyCode, getIsLoading: getIsKeyCodeLoading } = useAuth()

  if (getIsKeyCodeLoading()) return <Spinner />

  return getKeyCode() ? (
    <ConfirmKeyCode keycode={getKeyCode()} />
  ) : (
    <CreateKeyCode />
  )
}

export default Keycode
