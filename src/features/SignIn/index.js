import { Button, Flex, Input, Paragraph } from "@theme-ui/components"
import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Loader, Notification } from "../ui"

const SignIn = () => {
  const { signIn, getIsLoading } = useAuth()
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData(e.target)
    const email = data.get("email")
    const password = data.get("password")
    const res = await signIn(email, password)
    if (res.error) {
      switch (res.code) {
        case "auth/wrong-password":
          setErrorMsg("You have entered the incorrect password.")
          break
        case "auth/user-not-found":
          setErrorMsg(
            "We cannot find an account associated with this email address."
          )
          break
        case "auth/too-many-requests":
          setErrorMsg(
            "You have tried too many attempts, please try again later"
          )
          break
        default:
          setErrorMsg("An unknown error occurred, code: " + res.code)
      }
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
      <Paragraph mb={2}>Please sign in below:</Paragraph>
      <Input type="email" name="email" placeholder="Email" mb={3} required />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        mb={3}
        required
      />
      {getIsLoading() ? (
        <Loader message="Authenticating your login credentials..." />
      ) : (
        <Button
          sx={{
            width: "180px",
            fontSize: 5,
            alignSelf: "center"
          }}
          type="submit"
          mb={3}
        >
          Login
        </Button>
      )}
      <Notification
        variant="error"
        message={errorMsg}
        setMessage={setErrorMsg}
        count={5000}
      />
    </Flex>
  )
}

export default SignIn
