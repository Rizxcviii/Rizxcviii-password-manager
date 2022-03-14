import { Button, Flex, Input, Paragraph, Text } from "@theme-ui/components"
import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import server from "../../server"
import { Loader, Notification } from "../ui"

const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState("")
  const { signUp, getIsLoading } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData(e.target)
    const email = data.get("email")
    const password = data.get("password")
    const confirmPassword = data.get("confirm-password")
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.")
      return
    }
    const res = await signUp(email, password)
    if (res.error) {
      switch (res.code) {
        case "auth/email-already-in-use":
          setErrorMsg("The email address is already in use.")
          break
        default:
          setErrorMsg("An unknown error occurred, code: " + res.code)
      }
    } else {
      server.write("passwords", "rizxcviii-pm", password)
    }
  }

  return (
    <Flex
      sx={{
        flexDirection: "column"
      }}
      as="form"
      onSubmit={handleSubmit}
    >
      <Paragraph mb={2}>Please sign up below:</Paragraph>
      <Input type="email" placeholder="Email" name="email" required />
      <Input
        mt={3}
        type="password"
        placeholder="Password"
        name="password"
        minLength={6}
        required
        mb={1}
      />
      <Text sx={{ fontFamily: "Centra", fontWeight: 300 }} m={0}>
        Minimum 6 characters are required
      </Text>
      <Input
        mt={3}
        mb={1}
        type="password"
        placeholder="Confirm Password"
        name="confirm-password"
        minLength={6}
        required
      />
      <Text>Minimum 6 characters are required</Text>
      {getIsLoading() ? (
        <Loader message="Creating your account..." />
      ) : (
        <Button
          sx={{
            width: "180px",
            fontSize: 5,
            alignSelf: "center"
          }}
          mt={3}
          type="submit"
        >
          Register
        </Button>
      )}
      <Notification
        variant="error"
        setMessage={setErrorMsg}
        message={errorMsg}
        count={5000}
      />
    </Flex>
  )
}

export default SignUp
