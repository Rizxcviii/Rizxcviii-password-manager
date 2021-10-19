import React from "react"
import { MemoryRouter as Router, Route, Switch } from "react-router-dom"
import Keycode from "./components/Keycode"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { useAuth } from "./contexts/AuthContext"
import LoginLayout from "./layouts/LoginLayout"

const Routes = () => {
  const { getCurrentUser } = useAuth()
  const keycode = ""
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {getCurrentUser() ? (
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
  )
}

export default Routes
