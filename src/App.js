import { css, Global } from "@emotion/react"
import { ThemeProvider } from "@theme-ui/theme-provider"
import React from "react"
import { MemoryRouter as Router, Route, Switch } from "react-router-dom"
import Keycode from "./components/Keycode"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { AuthProvider } from "./contexts/AuthContext"
import LoginLayout from "./layouts/LoginLayout"
import { theme } from "./theme"

const App = () => {
  const user = {}
  const keycode = ""

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Global
          styles={css`
            html,
            body {
              width: 400px;
              height: 600px;
            }
            figure {
              margin: 0;
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
        <Router>
          <Switch>
            <Route exact path="/">
              {user.username ? (
                <Keycode keycode={keycode} />
              ) : (
                <LoginLayout>
                  <SignIn />
                </LoginLayout>
              )}
            </Route>
            <Route path="/key-code">
              <Keycode keycode={keycode} />
            </Route>
            <Route path="/register">
              <LoginLayout>
                <SignUp />
              </LoginLayout>
            </Route>
            <Route path="/login">
              <LoginLayout>
                <SignIn />
              </LoginLayout>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
