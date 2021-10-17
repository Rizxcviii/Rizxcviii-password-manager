import { Box, Button, Input } from "@theme-ui/components"
import React, { useState } from "react"

const Keycode = ({ keycode = "" }) => {
  const [code, setCode] = useState(keycode)

  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
  }
  return (
    <Box as="form">
      {code ? (
        <p>Please enter your keycode</p>
      ) : (
        <p>Please enter a keycode to secure your vault</p>
      )}
      <Input type="password" placeholder="keycode..." />
      <Button type="submit" onSubmit={handleSubmit}>
        Submit
      </Button>
    </Box>
  )
}

export default Keycode
