import { Flex, Heading, Text } from "@theme-ui/components"
import { useEffect, useState } from "react"
import server from "../../server"
import { Loader, Notification } from "../ui"
import AddEditPassword from "./AddEditPassword"
import PasswordList from "./PasswordList"

const Vault = () => {
  const [passwords, setPasswords] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [msg, setMsg] = useState("")

  const onLoad = async () => {
    setIsLoading(true)
    const res = await server.read("passwords")
    setPasswords(res.val())
    setIsLoading(false)
  }

  useEffect(() => onLoad(), [])

  return (
    <Flex
      sx={{
        flexDirection: "column",
        height: "470px"
      }}
    >
      <Heading as="h1">Your Vault</Heading>
      <AddEditPassword setMsg={setMsg} setErrMsg={setErrMsg} onLoad={onLoad} />
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
          <Loader message="Loading your saved passwords..." />
        ) : (
          <PasswordList
            passwords={passwords}
            setIsLoading={setIsLoading}
            onLoad={onLoad}
            setMsg={setMsg}
            setErrMsg={setErrMsg}
          />
        )}
      </Flex>
      {errMsg && (
        <Notification
          variant="error"
          message={errMsg}
          setMessage={setErrMsg}
          count={2000}
        />
      )}
      {msg && <Notification message={msg} setMessage={setMsg} count={2000} />}
    </Flex>
  )
}

export default Vault
