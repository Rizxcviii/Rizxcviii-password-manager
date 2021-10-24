import { Button, Flex } from "@theme-ui/components"
import React from "react"
import { useHistory } from "react-router-dom"
import BaseLayout from "./BaseLayout"

const Nav = () => {
  const history = useHistory()
  return (
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
        onClick={() => history.push("/")}
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
  )
}

const LoginLayout = ({ children }) => {
  return <BaseLayout footer={Nav()}>{children}</BaseLayout>
}

export default LoginLayout
