import { Box } from "@theme-ui/components"
import React from "react"

const BaseLayout = ({ children, footer, header, ...props }) => (
  <>
    <Box as="header">{header}</Box>
    <Box p={3} {...props}>
      {children}
    </Box>
    <Box as="footer">{footer}</Box>
  </>
)

export default BaseLayout
