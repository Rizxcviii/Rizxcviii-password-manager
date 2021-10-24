import { Button, Flex, Input, Paragraph, Spinner } from "@theme-ui/components"
import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import Notification from "./ui/Notification"

const SignIn = () => {
  const { signIn, getIsLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
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
    >
      <Paragraph mb={2}>Please sign in below:</Paragraph>
      <Input
        onChange={e => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email"
        mb={3}
        required
      />
      <Input
        onChange={e => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
        mb={3}
        required
      />
      {getIsLoading() ? (
        <Spinner sx={{ alignSelf: "center" }} />
      ) : (
        <Button
          sx={{
            width: "180px",
            fontSize: 5,
            alignSelf: "center",
            background: email && password ? "primary" : "grey",
            "&:hover": {
              cursor: email && password ? "pointer" : "not-allowed"
            }
          }}
          type="submit"
          mb={3}
          onClick={handleSubmit}
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
