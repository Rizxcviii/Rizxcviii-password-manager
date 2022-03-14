import {
  Box,
  Button,
  Flex,
  Input,
  Label,
  Paragraph,
  Spinner
} from "@theme-ui/components"
import { useState } from "react"
import { createPortal } from "react-dom"
import server from "../../server"
import { Modal } from "../ui"

const appRoot = () =>
  typeof document !== "undefined" && document.getElementById("root")

const AddEditPasswordModal = ({ setErrMsg, setMsg, onLoad }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showAddPassword, setShowAddPassword] = useState(false)

  const falesValues = [".", "#", "$", "/", "[", "]"]

  const handleAddPasswordSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    const data = new FormData(e.target)
    const useCase = data.get("useCase")
    const password = data.get("password")
    if (falesValues.some(el => useCase.includes(el))) {
      setErrMsg(
        "The use case cannot contain the following characters: " +
          falesValues.join(` , `)
      )
      setIsLoading(false)
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
      onLoad()
    }
    setIsLoading(false)
    setShowAddPassword(false)
  }

  if (showAddPassword) {
    return createPortal(
      <Modal onClose={() => setShowAddPassword(false)} width="100%">
        <Box
          backgroundColor="white"
          p={2}
          sx={{
            border: "1px solid black",
            borderRadius: 6,
            mx: 4,
            boxShadow:
              "0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)"
          }}
          as="form"
          onClick={e => e.stopPropagation()}
          onSubmit={handleAddPasswordSubmit}
        >
          <Paragraph
            sx={{
              fontSize: 4
            }}
          >
            Use the below space to add a new password. Or edit a new password by
            using the same use case.
          </Paragraph>
          <Box mt={2}>
            <Label htmlFor="useCase">Use Case</Label>
            <Input type="text" placeholder="Use Case" name="useCase" required />
            <Paragraph
              sx={{
                fontSize: 2
              }}
            >
              *The following characters cannot be used: <br />{" "}
              <b>{falesValues.join(` , `)}</b>
            </Paragraph>
          </Box>
          <Box mt={2}>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              mb={2}
              required
            />
          </Box>
          <Flex mt={3} width={1 / 1}>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <Button
                  sx={{
                    flexBasis: "100%"
                  }}
                  type="submit"
                  mr={2}
                >
                  Add/Edit
                </Button>
                <Button
                  variant="outline.primary"
                  sx={{
                    flexBasis: "100%"
                  }}
                  ml={2}
                  type="button"
                  onClick={() => setShowAddPassword(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </Flex>
        </Box>
      </Modal>,
      appRoot()
    )
  }
  return (
    <Button onClick={() => setShowAddPassword(true)}>Add/Edit password</Button>
  )
}

export default AddEditPasswordModal
