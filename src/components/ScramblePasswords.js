import {
  Box,
  Button,
  Flex,
  Input,
  Paragraph,
  Spinner
} from "@theme-ui/components"
import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router"
import { joinWords, scrambleWords } from "../helpers"
import server from "../server"
import Notification from "./ui/Notification"

const LIMIT = 50

const ScrambledPassword = ({ password, setMsg, setErrMsg, lastEl }) => {
  const [showAddPassword, setShowAddPassword] = useState(false)
  const [useCaseInput, setUseCaseInput] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const falesValues = [".", "#", "$", "/", "[", "]"]

  const handleAddPassword = async () => {
    setIsSaving(true)
    if (!useCaseInput) {
      setErrMsg("Please enter a use case.")
      setIsSaving(false)
      return
    }
    if (falesValues.some(el => useCaseInput.includes(el))) {
      setErrMsg(
        "The use case cannot contain the following characters: " +
          falesValues.join(` , `)
      )
      return
    }
    const res = await server.update("passwords", useCaseInput, password)
    if (res?.error) {
      console.log(res)
      setErrMsg(
        "There was an error adding your password. Please try again later."
      )
    } else {
      setMsg("Password " + useCaseInput + " added.")
      setShowAddPassword(false)
    }
    setIsSaving(false)
  }

  return (
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "5px",
        textAlign: "center",
        ":hover": {
          cursor: !showAddPassword ? "pointer" : "default"
        },
        p: 2,
        mb: lastEl ? 0 : 2
      }}
      onClick={() => !showAddPassword && setShowAddPassword(true)}
    >
      <Paragraph>{password}</Paragraph>
      {showAddPassword && (
        <Box mt={1}>
          <Input
            placeholder="Use Case"
            onChange={e => setUseCaseInput(e.target.value)}
          />
          <Flex
            sx={{
              width: "100%",
              justifyContent: "space-between"
            }}
            mt={2}
          >
            {isSaving ? (
              <Spinner
                sx={{
                  alignSelf: "center"
                }}
              />
            ) : (
              <>
                <Button
                  sx={{
                    width: "150px"
                  }}
                  onClick={() => handleAddPassword()}
                >
                  Add
                </Button>
                <Button
                  variant="outline.primary"
                  onClick={() => setShowAddPassword(false)}
                  sx={{
                    width: "150px",
                    zIndex: 10
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  )
}

const ScramblePasswords = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [scrambledWords, setScrambledWords] = useState([])
  const [errMsg, setErrMsg] = useState("")
  const [msg, setMsg] = useState("")
  const history = useHistory()

  const { search } = useLocation()
  const params = new URLSearchParams(search).get("words")

  const scramble = async () => {
    setIsLoading(true)
    const res = await server.readRoot("homoglyphs")
    if (res?.err) {
      setErrMsg("There has been an error, code: " + res?.code)
      setIsLoading(false)
      return
    } else {
      const homoglyphs = res.val()
      const scrambledWordsArr = scrambleWords(
        params.split(","),
        homoglyphs,
        LIMIT
      )
      const scrambledWords = joinWords(scrambledWordsArr, ",", LIMIT)
      setScrambledWords(scrambledWords)
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  useEffect(() => scramble(), [])

  return (
    <Flex
      sx={{
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Button
        onClick={() => history.goBack()}
        sx={{
          mb: 3
        }}
      >
        Go back
      </Button>
      {isLoading ? (
        <Flex
          sx={{
            flexDirection: "column"
          }}
        >
          <Spinner
            size={150}
            sx={{
              borderRadius: "50%",
              alignSelf: "center"
            }}
          />
          <Paragraph
            sx={{
              textAlign: "center",
              fontSize: "1.5rem"
            }}
          >
            Scrambling words...
          </Paragraph>
        </Flex>
      ) : (
        <>
          {scrambledWords && (
            <>
              <Paragraph>
                Here are a selection of 50 randomly generated passwords,
                scrambled based on your filters/choices of responses. If you
                would like to generate a new set of passwords, click the button
                below.
              </Paragraph>
              <Button
                onClick={() => scramble()}
                sx={{
                  mt: 2
                }}
              >
                Generate new passwords
              </Button>
              <Paragraph mb={3} mt={1}>
                Click on a password to add it to your your vault.
              </Paragraph>
            </>
          )}
          <Flex sx={{ flexDirection: "column", overflowY: "scroll" }}>
            {scrambledWords.map((password, i) => (
              <ScrambledPassword
                key={i}
                password={password}
                lastEl={i === scrambledWords.length - 1}
                setErrMsg={setErrMsg}
                setMsg={setMsg}
              />
            ))}
          </Flex>
        </>
      )}
      {errMsg && (
        <Notification
          variant="error"
          message={errMsg}
          setMessage={setErrMsg}
          count={2000}
        />
      )}
      {msg && (
        <Notification
          variant="success"
          message={msg}
          setMessage={setMsg}
          count={2000}
        />
      )}
    </Flex>
  )
}

export default ScramblePasswords
