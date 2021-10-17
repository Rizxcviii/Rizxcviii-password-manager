import { Box } from "@theme-ui/components"
import React from "react"

const BaseLayout = ({ children }) => (
  <Box>
    {children}
    <Box>
      {/** TODO: Implement nav (for an extension, it makes sense to keep at bottom) */}
    </Box>
  </Box>
)

export default BaseLayout
