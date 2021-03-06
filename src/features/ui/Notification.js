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
    if (message && count > 0) {
      setTimeout(() => setMessage(""), count)
    }
  }, [count, message, setMessage])

  if (!message) return <></>

  return (
    <Alert
      sx={{
        position: "fixed",
        bottom: "100px",
        width: "368px",
        left: 0
      }}
      ml={3}
      variant="primary"
      {...props}
    >
      {message}
    </Alert>
  )
}

export default Notification
