import React, { useState } from "react"
import { Button, Flex, Heading, Input, Label } from "theme-ui"
import { useAuth } from "../../contexts/AuthContext"
import server from "../../server"

const KeyCode = ({ handleError, setMsg }) => {
  const [isSaving, setIsSaving] = useState(false)
  const { setKeyCode, getKeyCode } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const currentKeyCode = formData.get("currentKeyCode")
    const newKeyCode = formData.get("newKeyCode")
    if (currentKeyCode !== getKeyCode()) {
      handleError("Current key code is incorrect")
      return
    }
    if (!newKeyCode) {
      handleError("Please enter a new key code.")
      return
    }
    if (newKeyCode === getKeyCode()) {
      handleError("New key code must be different from current key code")
      return
    }
    setIsSaving(true)
    const res = await server.update("settings", "keycode", newKeyCode)
    if (res?.error) {
      setIsSaving(false)
      handleError(
        "There has been an error saving your key code. Error: " + res.code
      )
      return
    }
    setKeyCode(newKeyCode)
    setIsSaving(false)
    setMsg("Key code updated successfully")
  }

  return (
    <Flex
      sx={{
        flexDirection: "column",
        border: "1px solid black",
        borderRadius: 4
      }}
      p={2}
      mb={3}
      as="form"
      onSubmit={handleSubmit}
    >
      <Heading as="h2" sx={{ mb: 3 }}>
        Key Code
      </Heading>
      <Label htmlFor="currentKeyCode">Current Key Code</Label>
      <Input
        placeholder="Current Keycode"
        id="currentKeyCode"
        name="currentKeyCode"
        type="text"
        mb={2}
      />
      <Label htmlFor="newKeyCode">New Key Code</Label>
      <Input
        placeholder="New Keycode"
        id="newKeyCode"
        name="newKeyCode"
        type="text"
      />
      <Flex
        sx={{
          justifyContent: "space-between"
        }}
        mt={2}
      >
        <Button
          type="submit"
          sx={{
            width: "170px",
            ":disabled": isSaving
          }}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
        <Button
          type="button"
          sx={{
            variant: "outline.primary",
            width: "170px"
          }}
        >
          Cancel
        </Button>
      </Flex>
    </Flex>
  )
}

export default KeyCode
