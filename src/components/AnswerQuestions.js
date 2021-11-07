import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
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
      <Input onChange={e => onChange(e.target.value)} value={answer} mt={1} />
    </Flex>
  )
}

const AnswerQuestions = () => {
  const [questionSet, setQuestionSet] = useState([])
  const [questionsAnswered, setQuestionsAnswered] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errMsg, setErrMsg] = useState("")

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadQuestionSet(), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadAnsweredQuestions(), [questionSet])

  const handleSave = async () => {
    setIsLoading(true)
    const res = await server.update("", "answers", questionsAnswered)
    if (res?.err) {
      setErrMsg("There has been an error, code: " + res?.code)
      setIsLoading(false)
      return
    } else {
      await loadAnsweredQuestions()
      setIsLoading(false)
    }
  }

  return (
    <Flex
      sx={{
        flexDirection: "column",
        height: "500px"
      }}
    >
      <Heading as="h1">Answer Questions</Heading>
      <Paragraph mb={2}>
        Feel free to answer any of the questions asked below. Once you do,
        please click the 'Save' button to record your changes.
      </Paragraph>
      <Button mb={2} type="button" onClick={handleSave}>
        Save
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
          overflowY: "auto"
        }}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          questionSet.map((question, i) => (
            <Question
              key={i}
              question={question}
              answer={questionsAnswered?.[i] || ""}
              mb={i === questionSet.length - 1 ? 0 : 2}
              onChange={answer =>
                setQuestionsAnswered([
                  ...questionsAnswered.slice(0, i),
                  answer,
                  ...questionsAnswered.slice(i + 1)
                ])
              }
            />
          ))
        )}
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
