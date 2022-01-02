import React from "react"
import { MemoryRouter as Router, Route, Switch } from "react-router-dom"
import AnswerQuestions from "./components/AnswerQuestions"
import GeneratePasswords from "./components/GeneratePasswords"
import Keycode from "./components/Keycode"
import Passwords from "./components/Passwords"
import ScramblePasswords from "./components/ScramblePasswords"
import Settings from "./components/Settings"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { useAuth } from "./contexts/AuthContext"
import BaseLayout from "./layouts/BaseLayout"
import LoginLayout from "./layouts/LoginLayout"
import SignedInLayout from "./layouts/SignedInLayout"

const SignedOutRoutes = () => {
  const { getCurrentUser } = useAuth()

  return (
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
  )
}

const SignedInRoutes = () => {
  return (
    <>
      <Route exact path={["/passwords", "/"]}>
        <SignedInLayout>
          <Passwords />
        </SignedInLayout>
      </Route>
      <Route path="/questions">
        <SignedInLayout>
          <AnswerQuestions />
        </SignedInLayout>
      </Route>
      <Route path="/generate">
        <SignedInLayout>
          <GeneratePasswords />
        </SignedInLayout>
      </Route>
      <Route path="/scramble">
        <SignedInLayout>
          <ScramblePasswords />
        </SignedInLayout>
      </Route>
      <Route path="/settings">
        <SignedInLayout>
          <Settings />
        </SignedInLayout>
      </Route>
    </>
  )
}

const Routes = () => {
  const { getIsConfirmed } = useAuth()
  return (
    <Router>
      <Switch>
        {getIsConfirmed() ? <SignedInRoutes /> : <SignedOutRoutes />}
      </Switch>
    </Router>
  )
}

export default Routes
