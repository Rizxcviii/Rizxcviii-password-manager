import { Box } from "@theme-ui/components"
import React from "react"

const BaseLayout = ({ children, footer, ...props }) => (
  <>
    <Box p={3} {...props}>
      {children}
    </Box>
    <Box as="footer">{footer}</Box>
  </>
)

export default BaseLayout
