import { Box, Button, Flex } from "@theme-ui/components"
import React from "react"
import { useHistory } from "react-router-dom"

const LoginLayout = ({ children }) => {
  const history = useHistory()
  return (
    <Box py={3} px={5}>
      {children}
      <Flex width={1 / 1} sx={{ alignItems: "stretch" }}>
        <Button
          sx={{
            width: "50%",
            borderRadius: 0,
            border: "1px solid black",
            borderRight: 0
          }}
          onClick={() => history.push("/login")}
        >
          Sing In
        </Button>
        <Button
          sx={{
            width: "50%",
            borderRadius: 0,
            border: "1px solid black"
          }}
          onClick={() => history.push("/register")}
        >
          Sign Up
        </Button>
      </Flex>
    </Box>
  )
}

export default LoginLayout
