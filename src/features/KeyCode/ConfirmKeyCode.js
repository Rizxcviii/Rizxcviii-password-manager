import { Button, Flex, Input, Paragraph } from "@theme-ui/components"
import React, { useState } from "react"
import { useHistory } from "react-router"
import { useAuth } from "../../contexts/AuthContext"
import { Loader, Notification } from "../ui"

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

export default ConfirmKeyCode
