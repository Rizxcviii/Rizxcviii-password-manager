import { Box, Button, Flex, Input, Paragraph } from "@theme-ui/components"
import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

const Keycode = ({ keycode = "" }) => {
  const [code, setCode] = useState(keycode)
  const { signOut } = useAuth()

  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
  }

  const handleSignOut = e => signOut()

  return (
    <Flex sx={{ flexDirection: "column" }} as="form">
      <Box mb={2}>
        {code ? (
          <Paragraph>Please enter your keycode</Paragraph>
        ) : (
          <Paragraph>Please enter a keycode to secure your vault</Paragraph>
        )}
      </Box>
      <Input type="password" placeholder="keycode..." />
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
          onSubmit={handleSubmit}
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
    </Flex>
  )
}

export default Keycode
