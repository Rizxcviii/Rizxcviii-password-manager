import React from "react"
import { useHistory } from "react-router"
import { Box, Button, Divider, Flex, Heading, IconButton } from "theme-ui"
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
        minHeight: "60px",
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
          fontSize: 5
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
          fontSize: 5
        }}
        onClick={() => history.push("/questions")}
      >
        Answer Questions
      </Button>
      <Button
        variant="nav"
        sx={{
          flexBasis: "100%",
          borderRadius: 0,
          border: "1px solid black",
          borderRight: 0,
          fontSize: 5
        }}
        onClick={() => history.push("/generate")}
      >
        Generate Passwords
      </Button>
    </Flex>
  )
}

const Header = () => {
  const history = useHistory()
  return (
    <Box>
      <Flex
        sx={{
          justifyContent: "space-between",
          px: 3,
          pt: "5px"
        }}
      >
        <Heading as="h1" sx={{ fontSize: 5 }}>
          Rizxcviii Password Manager
        </Heading>
        <IconButton onClick={() => history.push("/settings")}>
          <abbr title="Settings">
            <img
              alt="Access Settings"
              src={`${process.env.PUBLIC_URL}/img/settings.svg`}
              width="24px"
            />
          </abbr>
        </IconButton>
      </Flex>
      <Divider
        sx={{
          width: "90%",
          mx: "auto"
        }}
      />
    </Box>
  )
}

const SignedInLayout = ({ children }) => (
  <BaseLayout pt={0} header={Header()} footer={Footer()}>
    <Box mb="60px">{children}</Box>
  </BaseLayout>
)

export default SignedInLayout
