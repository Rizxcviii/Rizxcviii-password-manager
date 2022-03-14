import React from "react"
import { MemoryRouter as Router, Route, Switch } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import AnswerQuestions from "./features/AnswerQuestions"
import GeneratePasswords from "./features/GeneratePasswords"
import KeyCode from "./features/KeyCode"
import ScramblePasswords from "./features/ScramblePasswords"
import Settings from "./features/Settings"
import SignIn from "./features/SignIn"
import SignUp from "./features/SignUp"
import Vault from "./features/Vault"
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
            <KeyCode />
          </BaseLayout>
        ) : (
          <LoginLayout>
            <SignIn />
          </LoginLayout>
        )}
      </Route>
      <Route path="/key-code">
        <BaseLayout>
          <KeyCode />
        </BaseLayout>
      </Route>
      <Route path="/register">
        {getCurrentUser() ? (
          <BaseLayout>
            <KeyCode />
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
          <Vault />
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
