import {
  Box,
  Button,
  Flex,
  Input,
  Label,
  Paragraph,
  Spinner
} from "@theme-ui/components"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { joinWords, scrambleWords } from "../helpers"
import server from "../server"
import Notification from "./ui/Notification"

const LIMIT = 50

const ScrambledPassword = ({ password, setMsg, setErrMsg, lastEl }) => {
  const [showAddPassword, setShowAddPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const falesValues = [".", "#", "$", "/", "[", "]"]

  const handleAddPassword = async e => {
    e.preventDefault()
    setIsSaving(true)
    const form = new FormData(e.target)
    const useCase = form.get("useCase")
    if (!useCase) {
      setErrMsg("Please enter a use case.")
      setIsSaving(false)
      return
    }
    if (falesValues.some(el => useCase.includes(el))) {
      setErrMsg(
        "The use case cannot contain the following characters: " +
          falesValues.join(` , `)
      )
      return
    }
    const res = await server.update("passwords", useCase, password)
    if (res?.error) {
      console.log(res)
      setErrMsg(
        "There was an error adding your password. Please try again later."
      )
    } else {
      setMsg("Password " + useCase + " added.")
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
      as="form"
      onSubmit={handleAddPassword}
      onClick={() => !showAddPassword && setShowAddPassword(true)}
    >
      <Paragraph>{password}</Paragraph>
      {showAddPassword && (
        <Box mt={1}>
          <Input placeholder="Use Case" name="useCase" />
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
                  type="submit"
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

const Filter = ({ filters, setFilters }) => {
  const [showFilter, setShowFilter] = useState(false)

  const handleChangeFilter = e => {
    e.preventDefault()
    const form = new FormData(e.target)
    setFilters({
      ...filters,
      separator: form.get("separator") || ",",
      remove: form.get("remove") || ""
    })
  }

  if (!showFilter) {
    return (
      <Button onClick={() => setShowFilter(true)} mb={2}>
        Filter
      </Button>
    )
  }

  return (
    <Box
      as="form"
      sx={{
        border: "1px solid",
        borderRadius: "5px",
        mb: 2,
        p: 2
      }}
      onSubmit={handleChangeFilter}
    >
      <Paragraph
        sx={{
          fontSize: 4
        }}
        mb={1}
      >
        Here you can add filters, to either change the separator, or remove
        certain characters from results!
      </Paragraph>
      <Flex
        sx={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <Label htmlFor="separator">Separator (Defaults to ',' [comma])</Label>
        <Input type="text" name="separator" placeholder="Separator" mb={2} />
        <Label htmlFor="remove">Remove</Label>
        <Input type="text" name="remove" placeholder="Characters to remove" />
      </Flex>
      <Flex
        sx={{
          width: "100%",
          justifyContent: "space-between"
        }}
        mt={2}
      >
        <Button
          type="submit"
          sx={{
            width: "150px"
          }}
        >
          Filter
        </Button>
        <Button
          sx={{
            width: "150px"
          }}
          variant="outline.primary"
          onClick={() => setShowFilter(false)}
          type="button"
        >
          Close
        </Button>
      </Flex>
    </Box>
  )
}

const ScramblePasswords = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [scrambledWords, setScrambledWords] = useState([])
  const [errMsg, setErrMsg] = useState("")
  const [filters, setFilters] = useState({
    separator: ",",
    remove: ""
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
        LIMIT
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
        height: "500px"
      }}
    >
      <Filter filters={filters} setFilters={setFilters} />
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
                NOTE: The following passwords are not the maximum combinations,
                but only a subset.
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
