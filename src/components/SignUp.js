import { Box, Input, Paragraph, Text } from "@theme-ui/components"
import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

const SignUp = () => {
  const [pass1, setPass1] = useState("")
  const [pass2, setPass2] = useState("")
  const [email, setEmail] = useState("")
  const { signUp } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await signUp(email, pass1)
    console.log(res.code)
    console.log(res.message)
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Paragraph>Please sign up below:</Paragraph>
      <Input type="email" onChange={e => setEmail(e.target.value)} required />
      <Input
        mt={3}
        type="password"
        onChange={e => setPass1(e.target.value)}
        minLength={6}
        required
      />
      <Text sx={{ fontFamily: "Centra", fontWeight: 300 }} m={0}>
        Minimum 6 characters are required
      </Text>
      <Input
        mt={3}
        type="password"
        onChange={e => setPass2(e.target.value)}
        minLength={6}
        required
      />
      <Text>Minimum 6 characters are required</Text>
      <Input mt={3} type="submit" disabled={pass1 !== pass2 || !pass1} />
    </Box>
  )
}

export default SignUp
