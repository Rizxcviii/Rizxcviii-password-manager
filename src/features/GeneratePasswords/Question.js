import { Flex, Text } from "@theme-ui/components"
import React from "react"

const Question = ({ question, answer, onClick, queueNum, ...props }) => (
  <Flex
    p={2}
    sx={{
      flexDirection: "column",
      border: queueNum !== -1 ? "4px solid teal" : "1px solid black",
      borderRadius: 6,
      "&:hover": {
        cursor: "pointer"
      }
    }}
    onClick={() => onClick(answer)}
    {...props}
  >
    <Flex
      sx={{
        justifyContent: "space-between"
      }}
    >
      <Text sx={{ fontSize: 4, fontWeight: "bold" }}>Question:</Text>
      {queueNum !== -1 && (
        <Text
          sx={{
            fontSize: 6,
            fontWeight: "bold",
            color: "light",
            backgroundColor: "primary",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            textAlign: "center"
          }}
        >
          {queueNum + 1}
        </Text>
      )}
    </Flex>
    <Text mb={2}>{question}</Text>
    <Text sx={{ fontSize: 4, fontWeight: "bold" }}>Your response:</Text>
    <Text>{answer}</Text>
  </Flex>
)

export default Question
