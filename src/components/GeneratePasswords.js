import {
  Box,
  Button,
  Flex,
  Paragraph,
  Spinner,
  Text
} from "@theme-ui/components"
import React, { useEffect, useState } from "react"
import server from "../server"
import Notification from "./ui/Notification"

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
      <Text>{answer}</Text>
    </Flex>
  )
}

const AnswerQuestions = () => {
  const [questionSet, setQuestionSet] = useState([])
  const [questionsAnswered, setQuestionsAnswered] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errMsg, setErrMsg] = useState("")
  const [wordsToScramble, setWordsToScramble] = useState([])

  const loadQuestionSet = async () => {
    setIsLoading(true)
    const res = await server.readRoot("questions")
    if (res?.err) {
      setErrMsg("There has been an error, code: " + res?.code)
      setIsLoading(false)
      return
    } else {
      setQuestionSet(res.val())
    }
    setIsLoading(false)
  }

  const loadAnsweredQuestions = async () => {
    if (!questionSet.length) return
    setIsLoading(true)
    const res = await server.read("answers")
    if (res?.err) {
      setErrMsg("There has been an error, code: " + res?.code)
      setIsLoading(false)
      return
    } else {
      if (res.val() && questionSet.length - res.val().length !== 0) {
        setQuestionsAnswered([
          ...res.val(),
          ...new Array(questionSet.length - res.val().length).fill("")
        ])
      } else if (res.val()) {
        setQuestionsAnswered([...res.val()])
      } else {
        setQuestionsAnswered(new Array(questionSet.length).fill(""))
      }
    }
    setIsLoading(false)
  }

  const handleScramble = () => null

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadQuestionSet(), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadAnsweredQuestions(), [questionSet])

  if (isLoading) return <Spinner />

  return (
    <Flex
      sx={{
        flexDirection: "column",
        height: "500px"
      }}
    >
      <Paragraph mb={2}>
        Click on any number of responses below. Afterwards, click generate to
        generate a memorable password!
      </Paragraph>
      <Button mb={2} type="button" onClick={() => handleScramble()}>
        Scramble
      </Button>
      <Text
        sx={{
          fontWeight: "bold"
        }}
        mb={1}
      >
        Please answer the questions below:
      </Text>
      <Box
        sx={{
          overflowY: "scroll"
        }}
      >
        {questionSet.map((question, i) => (
          <Question
            key={i}
            question={question}
            answer={questionsAnswered?.[i] || ""}
            mb={i === questionSet.length - 1 ? 0 : 2}
            onClick={() => setWordsToScramble(i)}
            border={wordsToScramble === i ? "1px solid primary" : 0}
          />
        ))}
      </Box>
      {errMsg && (
        <Notification
          variant={errMsg ? "error" : "primary"}
          message={errMsg}
          count={2000}
          setMessage={setErrMsg}
        />
      )}
    </Flex>
  )
}

export default AnswerQuestions
