import { Box, Input, Paragraph } from "@theme-ui/components"
import React from "react"

const SignIn = () => {
  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <Box className="flex-auto flex-col w-auto">
      <Paragraph>Please sign in below:</Paragraph>
      <Input type="email" mb={3} required />
      <Input type="password" mb={3} required />
      <Input type="submit" mb={3} onClick={handleSubmit} />
    </Box>
  )
}

export default SignIn
