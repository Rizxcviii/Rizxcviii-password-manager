import { Button, Flex } from "@theme-ui/components"
import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router"
import server from "../server"

const ScramblePasswords = () => {
  const [homoglyphs, setHomoglyphs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errMsg, setErrMsg] = useState("")
  const history = useHistory()

  const { search } = useLocation()
  const params = new URLSearchParams(search).get("words")
  console.log(params)

  const loadHomoglpyhs = async () => {
    const res = await server.readRoot("homoglyphs")
    if (res?.err) {
      setErrMsg("There has been an error, code: " + res?.code)
      setIsLoading(false)
      return
    } else {
      setHomoglyphs(res.val())
    }
    setIsLoading(false)
  }

  useEffect(() => loadHomoglpyhs(), [])

  return (
    <Flex
      sx={{
        flexDirection: "column"
      }}
    >
      <Button onClick={() => history.goBack()}>Go back</Button>
    </Flex>
  )
}

export default ScramblePasswords
