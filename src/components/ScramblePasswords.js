import { Button, Flex, Spinner } from "@theme-ui/components"
import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router"
import { joinWords, scrambleWords } from "../helpers"
import server from "../server"

const LIMIT = 15

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
      const scrambledWordsArr = scrambleWords(params.split(","), homoglyphs)
      console.log(joinWords(scrambledWordsArr, ","))
      setScrambledWords(scrambledWordsArr)
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  console.log(scrambledWords)

  useEffect(() => scramble(), [])

  if (isLoading) {
    return (
      <Flex
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <Spinner />
      </Flex>
    )
  }

  return (
    <Flex
      sx={{
        flexDirection: "column"
      }}
    >
      <Button onClick={() => history.goBack()}>Go back</Button>
    </Flex>
  )
}

export default ScramblePasswords
