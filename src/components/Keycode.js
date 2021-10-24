import {
  Box,
  Button,
  Flex,
  Input,
  Paragraph,
  Spinner
} from "@theme-ui/components"
import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import server from "../server"

const Keycode = ({ keycode = "" }) => {
  const [code, setCode] = useState(keycode)
  const [isLoading, setIsLoading] = useState(false)
  const { signOut } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    const res = await server.write("settings", "keycode", code)
    setIsLoading(false)
    if (res?.error) {
      console.log(res.code)
    }
  }

  const handleSignOut = e => signOut()

  return (
    <Flex sx={{ flexDirection: "column" }} as="form" onSubmit={handleSubmit}>
      <Box mb={2}>
        {keycode ? (
          <Paragraph>Please enter your keycode</Paragraph>
        ) : (
          <Paragraph>Please enter a keycode to secure your vault</Paragraph>
        )}
      </Box>
      <Input
        onChange={e => setCode(e.target.value)}
        value={code}
        type="password"
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

export default Keycode
