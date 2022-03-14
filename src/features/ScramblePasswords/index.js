import { Button, Flex, Paragraph, Spinner } from "@theme-ui/components"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { joinWords, scrambleWords } from "../../helpers"
import server from "../../server"
import { Notification } from "../ui"
import FilterModal from "./FilterModal"
import ScrambledPassword from "./ScrambledPassword"

const LIMIT = 50

const ScramblePasswords = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [scrambledWords, setScrambledWords] = useState([])
  const [errMsg, setErrMsg] = useState("")
  const [filters, setFilters] = useState({
    separator: ",",
    remove: "",
    upperCase: false,
    lowerCase: false,
    numbers: false,
    symbols: false
  })
  const [msg, setMsg] = useState("")

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
        LIMIT,
        filters
      )
      const scrambledWords = joinWords(scrambledWordsArr, LIMIT, filters)
      setScrambledWords(scrambledWords)
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => scramble(), [filters])

  return (
    <Flex
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        height: "470px"
      }}
    >
      <FilterModal filters={filters} setFilters={setFilters} />
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
                Here are a selection of {scrambledWords.length} randomly
                generated passwords, scrambled based on your filters/choices of
                responses.
              </Paragraph>
              <Button
                onClick={() => scramble()}
                sx={{
                  mt: 2
                }}
              >
                Generate new passwords
              </Button>
              <Paragraph mb={1} mt={1}>
                Click on a password to add it to your your vault.
              </Paragraph>
              <Paragraph
                sx={{
                  fontWeight: "bold"
                }}
                mb={3}
              >
                NOTE: The following passwords are not the maximum number of
                combinations, but only a subset.
              </Paragraph>
            </>
          )}
          <Flex
            sx={{
              height: "600px",
              flexDirection: "column",
              overflowY: "scroll"
            }}
          >
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
