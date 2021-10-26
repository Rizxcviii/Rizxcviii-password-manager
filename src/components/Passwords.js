import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Spinner,
  Text
} from "@theme-ui/components"
import { useEffect, useState } from "react"
import server from "../server"
import Notification from "./ui/Notification"

const AddPassword = ({ setErrMsg, onLoad }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showAddPassword, setShowAddPassword] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [useCaseInput, setUseCaseInput] = useState("")

  const handleAddPasswordSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    const res = await server.update("passwords", useCaseInput, passwordInput)
    if (res?.error) {
      setErrMsg(
        "There was an error adding your password. Please try again later."
      )
    } else {
      onLoad()
    }
    setIsLoading(false)
  }

  if (showAddPassword) {
    return (
      <Box
        p={2}
        sx={{
          border: "1px solid black",
          borderRadius: 6
        }}
        as="form"
        onSubmit={handleAddPasswordSubmit}
      >
        <Input
          onChange={e => setUseCaseInput(e.target.value)}
          type="text"
          placeholder="Use Case"
        />
        <Input
          onChange={e => setPasswordInput(e.target.value)}
          mt={2}
          type="password"
          placeholder="Password"
        />
        <Text
          sx={{
            fontSize: 2
          }}
        >
          NOTE: Using the same use case for another password will overwrite it.
          Please use your naming conventions well.
        </Text>
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
                Add
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
    )
  }
  return <Button onClick={() => setShowAddPassword(true)}>Add password</Button>
}

const Passwords = () => {
  const [passwords, setPasswords] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  const onLoad = async () => {
    setIsLoading(true)
    const res = await server.read("passwords")
    setPasswords(res.val())
    setIsLoading(false)
  }

  const handleDeletePassword = async key => {
    setIsLoading(true)
    await server.update("passwords", key, null)
    onLoad()
  }

  useEffect(() => onLoad(), [])

  return (
    <Flex
      sx={{
        flexDirection: "column"
      }}
    >
      <AddPassword setErrMsg={setErrMsg} onLoad={onLoad} />
      <Text
        sx={{
          fontSize: 5,
          fontWeight: "bold"
        }}
        mt={2}
        mb={1}
      >
        Your currently stored passwords:
      </Text>
      <Flex
        p={2}
        sx={{
          flexDirection: "column",
          border: "1px solid black",
          borderRadius: 6
        }}
      >
        {isLoading ? (
          <Spinner />
        ) : !passwords ? (
          <Text>
            Your vault is empty! Try generating/adding some passwords!
          </Text>
        ) : (
          <Flex
            sx={{
              flexDirection: "column"
            }}
          >
            <Flex
              sx={{
                width: "66.6%"
              }}
            >
              <Text
                sx={{
                  flexBasis: "100%"
                }}
              >
                Use Case
              </Text>
              <Text
                sx={{
                  flexBasis: "100%"
                }}
              >
                Password
              </Text>
            </Flex>
            {Object.keys(passwords).map((useCase, i, arr) => (
              <Flex
                sx={{
                  alignItems: "center"
                }}
                mb={i === arr.length - 1 ? 0 : 2}
              >
                <Text
                  sx={{
                    flexBasis: "100%"
                  }}
                >
                  {useCase}
                </Text>
                <Text
                  sx={{
                    flexBasis: "100%"
                  }}
                >
                  {passwords[useCase]}
                </Text>
                <Flex
                  sx={{
                    flexBasis: "100%"
                  }}
                >
                  <IconButton
                    ml="50%"
                    onClick={() =>
                      navigator.clipboard.writeText(passwords[useCase])
                    }
                  >
                    <abbr title="Copy password to clipboard">
                      <img
                        alt="Copy password to clipboard"
                        src={`${process.env.PUBLIC_URL}/img/clipboard.svg`}
                        width="24px"
                      />
                    </abbr>
                  </IconButton>
                  <IconButton
                    ml="auto"
                    onClick={() => handleDeletePassword(useCase)}
                  >
                    <abbr title="Delete password">
                      <img
                        alt="Delete password"
                        src={`${process.env.PUBLIC_URL}/img/bin.svg`}
                        style={{
                          width: "24px"
                        }}
                      />
                    </abbr>
                  </IconButton>
                </Flex>
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
      {errMsg && (
        <Notification message={errMsg} setMessage={setErrMsg} count={2000} />
      )}
    </Flex>
  )
}

export default Passwords
