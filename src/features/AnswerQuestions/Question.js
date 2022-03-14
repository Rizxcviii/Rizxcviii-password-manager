import { Flex, Input, Text } from "@theme-ui/components"
import React from "react"

const Question = ({ question, answer, onChange, ...props }) => {
  return (
    <Flex
      p={2}
      sx={{
        flexDirection: "column",
        border: "1px solid black",
        borderRadius: 6
      }}
      {...props}
    >
      <Text sx={{ fontSize: 4, fontWeight: "bold" }}>Question:</Text>
      <Text mb={2}>{question}</Text>
      <Text sx={{ fontSize: 4, fontWeight: "bold" }}>Your response:</Text>
      <Input onChange={e => onChange(e.target.value)} value={answer} mt={1} />
    </Flex>
  )
}

export default Question
