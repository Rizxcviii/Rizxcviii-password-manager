import { Button, Flex, Input, Paragraph, Spinner } from "@theme-ui/components"
import React, { useState } from "react"
import { useHistory } from "react-router"
import { useAuth } from "../../contexts/AuthContext"
import server from "../../server"

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

export default CreateKeyCode
