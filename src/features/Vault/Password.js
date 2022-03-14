import { Flex, IconButton, Text } from "@theme-ui/components"
import { useState } from "react"
import server from "../../server"

const Password = ({
  password,
  setMsg,
  setErrMsg,
  useCase,
  setIsLoading,
  onLoad,
  lastEl
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleDeletePassword = async key => {
    setIsLoading(true)
    const res = await server.update("passwords", key, null)
    if (res?.error) {
      setErrMsg("There was an error deleting your password. Error: " + res.code)
    } else {
      setMsg("Password " + key + " deleted.")
      onLoad()
    }
  }

  return (
    <Flex
      sx={{
        alignItems: "center"
      }}
      mb={lastEl ? 0 : 2}
      key={useCase}
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
          flexBasis: "100%",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden"
        }}
      >
        {showPassword ? password : "*".repeat(password.length)}
      </Text>
      <Flex
        sx={{
          flexBasis: "100%"
        }}
      >
        <IconButton ml="auto" onClick={() => setShowPassword(!showPassword)}>
          <abbr title="View password">
            <img
              alt="View password"
              src={`${process.env.PUBLIC_URL}/img/view.svg`}
              width="30px"
            />
          </abbr>
        </IconButton>
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(password)
            setMsg("Password " + useCase + " copied to clipboard!")
          }}
        >
          <abbr title="Copy password to clipboard">
            <img
              alt="Copy password to clipboard"
              src={`${process.env.PUBLIC_URL}/img/clipboard.svg`}
              width="24px"
            />
          </abbr>
        </IconButton>
        <IconButton onClick={() => handleDeletePassword(useCase)}>
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
  )
}

export default Password
