import React from "react"
import { Box } from "theme-ui"

const Modal = ({ children, onClose, ...props }) => {
  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: "1000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#7f7f7f94",
        overflow: "auto",
        height: "100%",
        width: "100%",
        ...props
      }}
    >
      {children}
    </Box>
  )
}

export default Modal
