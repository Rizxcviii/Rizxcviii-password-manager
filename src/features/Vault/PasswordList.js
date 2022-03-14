import { Flex, Text } from "@theme-ui/components"
import Password from "./Password"

const PasswordList = ({ passwords, setErrMsg, setMsg, setIsLoading, onLoad }) =>
  !passwords ? (
    <Text>Your vault is empty! Try generating/adding some passwords!</Text>
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
        <Password
          setErrMsg={setErrMsg}
          setMsg={setMsg}
          password={passwords[useCase]}
          useCase={useCase}
          key={useCase}
          lastEl={i === arr.length - 1}
          setIsLoading={setIsLoading}
          onLoad={onLoad}
        />
      ))}
    </Flex>
  )

export default PasswordList
