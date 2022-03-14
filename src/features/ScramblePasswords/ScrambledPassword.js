import {
  Box,
  Button,
  Flex,
  Input,
  Paragraph,
  Spinner
} from "@theme-ui/components"
import React, { useState } from "react"
import server from "../../server"

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

export default ScrambledPassword
