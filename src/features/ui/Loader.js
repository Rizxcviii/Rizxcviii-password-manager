import React from "react"
import { Flex, Spinner, Text } from "theme-ui"

const Loader = ({ message = "" }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Spinner size={150} />
      <Text
        sx={{
          fontSize: 5
        }}
      >
        {message}
      </Text>
    </Flex>
  )
}

export default Loader
