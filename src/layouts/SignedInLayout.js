import React from "react"
import { useHistory } from "react-router"
import { Button, Flex } from "theme-ui"
import BaseLayout from "./BaseLayout"

const Footer = () => {
  const history = useHistory()
  return (
    <Flex
      sx={{
        alignItems: "stretch",
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "60px",
        flexBasis: 1 / 3
      }}
    >
      <Button
        variant="nav"
        sx={{
          flexBasis: "100%",
          width: "auto",
          borderRadius: 0,
          border: "1px solid black",
          borderRight: 0,
          fontSize: 6
        }}
        onClick={() => history.push("/passwords")}
      >
        Your Vault
      </Button>
      <Button
        variant="nav"
        sx={{
          flexBasis: "100%",
          borderRadius: 0,
          border: "1px solid black",
          borderRight: 0,
          fontSize: 6
        }}
        onClick={() => history.push("/generate")}
      >
        Generate Passwords
      </Button>
      <Button
        variant="nav"
        sx={{
          flexBasis: "100%",
          borderRadius: 0,
          border: "1px solid black",
          fontSize: 6
        }}
        onClick={() => history.push("/questions")}
      >
        Answer Questions
      </Button>
    </Flex>
  )
}

const SignedInLayout = ({ children }) => (
  <BaseLayout footer={Footer()}>{children}</BaseLayout>
)

export default SignedInLayout
