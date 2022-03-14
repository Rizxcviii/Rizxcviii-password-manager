import { Spinner } from "@theme-ui/components"
import React from "react"
import { useAuth } from "../../contexts/AuthContext"
import ConfirmKeyCode from "./ConfirmKeyCode"
import CreateKeyCode from "./CreateKeyCode"

const Keycode = () => {
  const { getKeyCode, getIsLoading: getIsKeyCodeLoading } = useAuth()

  if (getIsKeyCodeLoading()) return <Spinner />

  return getKeyCode() ? (
    <ConfirmKeyCode keycode={getKeyCode()} />
  ) : (
    <CreateKeyCode />
  )
}

export default Keycode
