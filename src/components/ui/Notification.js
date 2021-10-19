import React, { useEffect } from "react"
import { Alert } from "theme-ui"

const Notification = ({
  message = "",
  setMessage = () => null,
  count = 0,
  ...props
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    message && setTimeout(() => setMessage(""), count)
  }, [count, message, setMessage])

  return message ? (
    <Alert variant="primary" {...props}>
      {message}
    </Alert>
  ) : (
    <></>
  )
}

export default Notification
