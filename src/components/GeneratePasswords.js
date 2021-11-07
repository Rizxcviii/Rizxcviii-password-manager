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

const Question = ({
  question,
  answer,
  onChange,
  sxProps,
  inQueue,
  ...props
}) => (
  <Flex
    p={2}
    sx={{
      flexDirection: "column",
      border: "1px solid black",
      borderRadius: 6,
      "&:hover": {
        cursor: "pointer"
      },
      ...sxProps
    }}
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
  const [homoglyphs, setHomoglyphs] = useState([])

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

  const loadHomoglpyhs = async () => {
    const res = await server.readRoot("homoglyphs")
    if (res?.err) {
      setErrMsg("There has been an error, code: " + res?.code)
      setIsLoading(false)
      return
    } else {
      setHomoglyphs(res.val())
    }
    setIsLoading(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadQuestionSet(), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadAnsweredQuestions(), [questionSet])

  useEffect(() => loadHomoglpyhs(), [])

  const handleScramble = () => null

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
          Please answer the questions below:
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
                  onClick={() =>
                    setWordsToScramble(
                      wordsToScramble.includes(i)
                        ? [...wordsToScramble].filter(x => x !== i)
                        : [...wordsToScramble, i]
                    )
                  }
                  sxProps={{
                    border: wordsToScramble.includes(i)
                      ? "4px solid teal"
                      : "1px solid black"
                  }}
                  inQueue={
                    wordsToScramble.includes(i)
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
