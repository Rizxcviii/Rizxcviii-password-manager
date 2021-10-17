import { Box, Button, Flex } from "@theme-ui/components"
import React from "react"
import { useHistory } from "react-router-dom"

const LoginLayout = ({ children }) => {
  const history = useHistory()
  return (
    <Box height={1 / 1}>
      <Box p={3}>{children}</Box>
      <Flex
        sx={{
          alignItems: "stretch",
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: "60px"
        }}
      >
        <Button
          variant="nav"
          sx={{
            width: "50%",
            borderRadius: 0,
            border: "1px solid black",
            borderRight: 0,
            fontSize: 6
          }}
          onClick={() => history.push("/login")}
        >
          Sign In
        </Button>
        <Button
          variant="nav"
          sx={{
            width: "50%",
            borderRadius: 0,
            border: "1px solid black",
            fontSize: 6
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
