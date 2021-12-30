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
  const [questionAnswerSet, setQuestionAnswerSet] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errMsg, setErrMsg] = useState("")

  const loadAnsweredQuestions = async () => {
    setIsLoading(true)
    const answers = await server.read("answers")
    const questions = await server.readRoot("questions")
    if (answers?.err) {
      setErrMsg("There has been an error, code: " + answers?.code)
      setIsLoading(false)
      return
    } else if (questions?.err) {
      setErrMsg("There has been an error, code: " + questions?.code)
      setIsLoading(false)
      return
    } else {
      const answerSet = answers.val()
      const questionSet = questions.val().reduce((acc, question, i) => {
        const params = {
          questionId: question.id,
          question: question.question
        }
        const answer = answerSet
          ? answerSet.find(a => a.questionId === question.id)
          : ""
        if (answer) {
          params.answer = answer.answer
        }
        acc.push(params)
        return acc
      }, [])
      setQuestionAnswerSet(questionSet)
    }
    setIsLoading(false)
  }

  useEffect(() => loadAnsweredQuestions(), [])

  const handleChange = (answer, id) => {
    const newQuestionAnswerSet = [...questionAnswerSet]
    const oldAnswer = newQuestionAnswerSet.find(qa => qa.questionId === id)
    oldAnswer.answer = answer
    setQuestionAnswerSet(newQuestionAnswerSet)
  }

  const handleSave = async () => {
    setIsLoading(true)
    const answers = questionAnswerSet.reduce((acc, qa) => {
      if (qa.answer) {
        acc.push({
          questionId: qa.questionId,
          answer: qa.answer
        })
      }
      return acc
    }, [])
    const res = await server.update("", "answers", answers)
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
          questionAnswerSet.map((qa, i) => (
            <Question
              key={qa.id}
              question={qa.question}
              answer={qa.answer}
              mb={i === questionAnswerSet.length - 1 ? 0 : 2}
              onChange={answer => handleChange(answer, qa.questionId)}
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
