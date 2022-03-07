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
import { createPortal } from "react-dom"
import { useLocation } from "react-router"
import { joinWords, scrambleWords } from "../helpers"
import server from "../server"
import { Modal, Notification } from "./ui"

const LIMIT = 50
const appRoot = () =>
  typeof document !== "undefined" && document.getElementById("root")

const ScrambledPassword = ({ password, setMsg, setErrMsg, lastEl }) => {
  const [showAddPassword, setShowAddPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const falesValues = [".", "#", "$", "/", "[", "]"]

  const handleAddPassword = async e => {
    e.preventDefault()
    setIsSaving(true)
    const data = new FormData(e.target)
    const useCase = data.get("useCase")
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
          cursor: !showAddPassword ? "pointer" : "default",
          backgroundColor: !showAddPassword ? "grey" : "initial"
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

const FilterModal = ({ filters, setFilters }) => {
  const [showFilter, setShowFilter] = useState(false)

  const handleChangeFilter = e => {
    e.preventDefault()
    const form = new FormData(e.target)
    setFilters({
      ...filters,
      separator: form.get("separator") || ",",
      remove: form.get("remove") || "",
      upperCase: form.get("upperCase") || false,
      lowerCase: form.get("lowerCase") || false,
      numbers: form.get("numbers") || false,
      symbols: form.get("symbols") || false
    })
    setShowFilter(false)
  }

  if (!showFilter) {
    return (
      <Button onClick={() => setShowFilter(true)} mb={2}>
        Filter
      </Button>
    )
  }

  return createPortal(
    <Modal onClose={() => setShowFilter(false)} width="100%">
      <Box
        as="form"
        sx={{
          bg: "white",
          border: "1px solid",
          borderRadius: "5px",
          p: 2,
          mx: 4,
          boxShadow:
            "0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)"
        }}
        onClick={e => e.stopPropagation()}
        onSubmit={handleChangeFilter}
      >
        <Flex
          sx={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Box mb={2}>
            <Label htmlFor="separator">
              Separator (Defaults to ',' [comma])
            </Label>
            <Input
              id="separator"
              type="text"
              defaultValue={filters.separator}
              name="separator"
              placeholder="Separator"
            />
          </Box>
          <Box mb={2}>
            <Label htmlFor="remove">Remove</Label>
            <Input
              id="remove"
              type="text"
              name="remove"
              defaultValue={filters.remove}
              placeholder="Characters to remove"
            />
          </Box>
          <Flex
            sx={{
              justifyContent: "space-around",
              flexDirection: "row"
            }}
          >
            <Flex
              sx={{
                flexDirection: "column",
                justifyContent: "space-around"
              }}
            >
              <Label htmlFor="upperCase">
                <input
                  id="upperCase"
                  type="checkbox"
                  name="upperCase"
                  defaultChecked={filters.upperCase}
                />
                Upper case
              </Label>
              <Label htmlFor="lowerCase">
                <input
                  id="lowerCase"
                  type="checkbox"
                  name="lowerCase"
                  defaultChecked={filters.lowerCase}
                />
                Lower case
              </Label>
            </Flex>
            <Flex
              sx={{
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Label htmlFor="numbers">
                <input
                  id="numbers"
                  type="checkbox"
                  name="numbers"
                  defaultChecked={filters.numbers}
                />
                Numbers
              </Label>
              <Label htmlFor="symbols">
                <input
                  id="symbols"
                  type="checkbox"
                  name="symbols"
                  defaultChecked={filters.symbols}
                />
                Symbols
              </Label>
            </Flex>
          </Flex>
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
              width: "140px"
            }}
          >
            Filter
          </Button>
          <Button
            sx={{
              width: "140px"
            }}
            variant="outline.primary"
            onClick={() => setShowFilter(false)}
            type="button"
          >
            Close
          </Button>
        </Flex>
      </Box>
    </Modal>,
    appRoot()
  )
}

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
        { remove: filters.remove }
      )
      const scrambledWords = joinWords(scrambledWordsArr, LIMIT, {
        separator: filters.separator
      })
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
