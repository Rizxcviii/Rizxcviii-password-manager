import { css, Global } from "@emotion/react"
import { ThemeProvider } from "@theme-ui/theme-provider"
import React from "react"
import { AuthProvider } from "./contexts/AuthContext"
import Routes from "./Routes"
import { theme } from "./theme"

const GlobalStyles = () => (
  <Global
    styles={css`
      html,
      body {
        width: 400px;
        height: 600px;
        margin: 0;
      }
      figure {
        margin: 0;
      }
      button {
        &:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
      @font-face {
        font-family: "Centra";
        src: url("/fonts/CentraNo2-Bold.woff") format("woff"),
          url("/fonts/CentraNo2-Bold.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: "Centra";
        src: url("/fonts/CentraNo2-Book.woff") format("woff"),
          url("/fonts/CentraNo2-Book.woff2") format("woff2");
        font-weight: 700;
        font-style: normal;
      }
      @font-face {
        font-family: "Centra";
        src: url("/fonts/CentraNo2-Light.woff") format("woff"),
          url("/fonts/CentraNo2-Light.woff2") format("woff2");
        font-weight: 300;
        font-style: normal;
      }
      * {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `}
  />
)

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
