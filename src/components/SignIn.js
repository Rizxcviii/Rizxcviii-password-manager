import { Button, Flex, Input, Paragraph } from "@theme-ui/components"
import React, { useState } from "react"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <Flex
      sx={{
        flexDirection: "column"
      }}
    >
      <Paragraph mb={2}>Please sign in below:</Paragraph>
      <Input
        onChange={e => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        mb={3}
        required
      />
      <Input
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        mb={3}
        required
      />
      <Button
        sx={{
          width: "180px",
          fontSize: 5,
          alignSelf: "center",
          background: email && password ? "primary" : "grey",
          "&:hover": {
            cursor: email && password ? "not-allowed" : "pointer"
          }
        }}
        type="submit"
        mb={3}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Flex>
  )
}

export default SignIn
