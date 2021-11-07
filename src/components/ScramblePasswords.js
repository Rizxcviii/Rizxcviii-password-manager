import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import server from "../server"

const ScramblePasswords = () => {
  const [homoglyphs, setHomoglyphs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errMsg, setErrMsg] = useState("")

  const { search } = useLocation()
  const params = new URLSearchParams(search).get("words[]")

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

  console.log(params)
  return <></>
}

export default ScramblePasswords
