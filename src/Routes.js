import React from "react"
import { MemoryRouter as Router, Route, Switch } from "react-router-dom"
import Keycode from "./components/Keycode"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { useAuth } from "./contexts/AuthContext"
import BaseLayout from "./layouts/BaseLayout"
import LoginLayout from "./layouts/LoginLayout"

const Routes = () => {
  const { getCurrentUser, getIsConfirmed } = useAuth()
  return (
    <Router>
      <Switch>
        {getIsConfirmed() ? (
          <></>
        ) : (
          <>
            <Route exact path="/">
              {getCurrentUser() ? (
                <BaseLayout>
                  <Keycode />
                </BaseLayout>
              ) : (
                <LoginLayout>
                  <SignIn />
                </LoginLayout>
              )}
            </Route>
            <Route path="/key-code">
              <BaseLayout>
                <Keycode />
              </BaseLayout>
            </Route>
            <Route path="/register">
              {getCurrentUser() ? (
                <BaseLayout>
                  <Keycode />
                </BaseLayout>
              ) : (
                <LoginLayout>
                  <SignUp />
                </LoginLayout>
              )}
            </Route>
          </>
        )}
      </Switch>
    </Router>
  )
}

export default Routes
