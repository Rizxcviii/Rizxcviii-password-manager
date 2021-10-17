import {
  Alert,
  Button,
  Flex,
  Input,
  Paragraph,
  Spinner,
  Text
} from "@theme-ui/components"
import React, { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"

const SignUp = () => {
  const [pass1, setPass1] = useState("")
  const [pass2, setPass2] = useState("")
  const [email, setEmail] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const { signUp, getIsLoading } = useAuth()

  useEffect(
    () => setTimeout(() => errorMsg && setErrorMsg(""), 3000),
    [errorMsg]
  )

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await signUp(email, pass1)
    if (res.error) {
      switch (res.code) {
        case "auth/email-already-in-use":
          setErrorMsg("The email address is already in use.")
          break
        default:
          return
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
      <Paragraph mb={2}>Please sign up below:</Paragraph>
      <Input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        required
      />
      <Input
        mt={3}
        type="password"
        placeholder="Password"
        onChange={e => setPass1(e.target.value)}
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
        onChange={e => setPass2(e.target.value)}
        minLength={6}
        required
      />
      <Text>Minimum 6 characters are required</Text>
      {getIsLoading() ? (
        <Spinner sx={{ alignSelf: "center" }} />
      ) : (
        <Button
          sx={{
            width: "180px",
            fontSize: 5,
            alignSelf: "center",
            background: pass1 !== pass2 || !pass1 ? "grey" : "primary",
            "&:hover": {
              cursor: pass1 !== pass2 || !pass1 ? "not-allowed" : "pointer"
            }
          }}
          mt={3}
          type="submit"
          disabled={pass1 !== pass2 || !pass1}
        >
          Register
        </Button>
      )}
      {errorMsg && (
        <Alert
          variant="error"
          sx={{
            position: "fixed",
            bottom: "150px",
            alignSelf: "center"
          }}
        >
          {errorMsg}
        </Alert>
      )}
    </Flex>
  )
}

export default SignUp
