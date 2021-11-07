import {
  Box,
  Button,
  Flex,
  Heading,
  Paragraph,
  Spinner,
  Text
} from "@theme-ui/components"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import server from "../server"
import Notification from "./ui/Notification"

const Question = ({ question, answer, onClick, inQueue, ...props }) => (
  <Flex
    p={2}
    sx={{
      flexDirection: "column",
      border: inQueue ? "4px solid teal" : "1px solid black",
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
      {inQueue !== false && (
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
          {inQueue + 1}
        </Text>
      )}
    </Flex>
    <Text mb={2}>{question}</Text>
    <Text sx={{ fontSize: 4, fontWeight: "bold" }}>Your response:</Text>
    <Text>{answer}</Text>
  </Flex>
)

const AnswerQuestions = () => {
  const [questionSet, setQuestionSet] = useState([])
  const [questionsAnswered, setQuestionsAnswered] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errMsg, setErrMsg] = useState("")
  const [wordsToScramble, setWordsToScramble] = useState([])
  const history = useHistory()

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

  const handleAnswer = answer => {
    setWordsToScramble(
      wordsToScramble.includes(answer)
        ? wordsToScramble.filter(word => word !== answer)
        : [...wordsToScramble, answer]
    )
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
              `/scramble?${wordsToScramble
                .map(word => "words[]=" + word)
                .join("&")}`
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
      {questionsAnswered.every(answer => answer === "") ? (
        <Paragraph
          sx={{
            fontWeight: "bold",
            fontSize: 5
          }}
        >
          You have not yet answered any questions. Please go to 'Answer
          Questions' to start generating unique passwords!
        </Paragraph>
      ) : (
        <Text
          sx={{
            fontWeight: "bold",
            fontSize: 5
          }}
          mb={1}
        >
          Please select any of the answers below:
        </Text>
      )}
      <Box
        sx={{
          overflowY: "auto"
        }}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          questionSet.map(
            (question, i) =>
              questionsAnswered[i] && (
                <Question
                  key={i}
                  question={question}
                  answer={questionsAnswered[i]}
                  mb={i === questionSet.length - 1 ? 0 : 2}
                  onClick={answer => handleAnswer(answer)}
                  inQueue={
                    wordsToScramble.includes(questionsAnswered[i])
                      ? wordsToScramble.indexOf(i)
                      : false
                  }
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

export default AnswerQuestions
