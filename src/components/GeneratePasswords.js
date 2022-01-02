import {
  Box,
  Button,
  Flex,
  Heading,
  Paragraph,
  Text
} from "@theme-ui/components"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import server from "../server"
import Loader from "./ui/Loader"
import Notification from "./ui/Notification"

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

const GeneratePasswords = () => {
  const [questionsAnswered, setQuestionsAnswered] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errMsg, setErrMsg] = useState("")
  const [wordsToScramble, setWordsToScramble] = useState([])
  const history = useHistory()

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
      const questionSet = questions.val()
      const answerSet = answers.val().reduce((acc, answer, i) => {
        const params = {
          ...answer,
          question: questionSet.find(q => q.id === answer.questionId).question
        }
        acc.push(params)
        return acc
      }, [])
      if (answerSet.length) {
        setQuestionsAnswered(answerSet)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => loadAnsweredQuestions(), [])

  const handleClick = (answer, questionId) => {
    const newWordsToScramble = [...wordsToScramble]
    const answerIndex = newWordsToScramble.findIndex(
      qa => qa.questionId === questionId
    )
    if (answerIndex === -1) {
      newWordsToScramble.push({
        questionId,
        answer
      })
    } else {
      newWordsToScramble.splice(answerIndex, 1)
    }
    setWordsToScramble(newWordsToScramble)
  }

  return (
    <Flex
      sx={{
        flexDirection: "column",
        height: "500px"
      }}
    >
      <Heading as="h1">Generate Passwords</Heading>
      <Paragraph mb={2}>
        Click on any number of responses below. Afterwards, click 'Scramble' to
        generate a list of memorable passwords!
      </Paragraph>
      <abbr
        title={
          !wordsToScramble.length
            ? "Please select at least one answer"
            : "Click to scramble"
        }
      >
        <Button
          mb={2}
          type="button"
          onClick={() =>
            history.push(
              `/scramble?words=${wordsToScramble
                .map(answer => answer.answer)
                .join(",")}`
            )
          }
          disabled={!wordsToScramble.length}
          sx={{
            "&:hover": {
              cursor: !wordsToScramble.length ? "not-allowed" : "pointer"
            },
            width: "100%"
          }}
        >
          Scramble
        </Button>
      </abbr>
      <Paragraph mb={2}>
        NOTE: The order in which you select the questions will be the order in
        which the words will be scrambled.
      </Paragraph>
      <Paragraph
        sx={{
          fontWeight: "bold",
          fontSize: 5
        }}
      >
        {questionsAnswered.every(answer => answer === "")
          ? "You have not yet answered any questions. Please go to 'Answer Questions' to start generating unique passwords!"
          : "Please select any of the answers below:"}
      </Paragraph>
      <Box
        sx={{
          overflowY: "auto"
        }}
      >
        {isLoading ? (
          <Loader message="Loading answered questions..." />
        ) : (
          questionsAnswered.map(
            (qa, i) =>
              questionsAnswered[i] && (
                <Question
                  key={qa.questionId}
                  question={qa.question}
                  answer={qa.answer}
                  mb={i === questionsAnswered.length - 1 ? 0 : 2}
                  onClick={() => handleClick(qa.answer, qa.questionId)}
                  queueNum={wordsToScramble.findIndex(
                    answerObj => answerObj.questionId === qa.questionId
                  )}
                />
              )
          )
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

export default GeneratePasswords
