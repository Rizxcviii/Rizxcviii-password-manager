import { initializeApp } from "@firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import config from "./appSecrets"

/**
 * The connection to the firebase server, giving APIs to access the data
 */
class Server {
  #app
  #auth

  constructor() {
    if (!Server.instance) {
      this.#app = initializeApp(config)
      this.#auth = getAuth(this.#app)
      Server.instance = this
    }
    return
  }

  /**
   * Allows the registration of a user
   * @param {Strign} email The users email address
   * @param {String} password The users password
   * @returns a data response object in the form of JSON
   */
  createUser = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(
        this.#auth,
        email,
        password
      )
      const data = await res.json()
      return data
    } catch (err) {
      return err
    }
  }

  /**
   * Allows the sign in of a user
   * @param {String} email The users email address
   * @param {String} password The users password
   * @returns a data response object in the form of JSON
   */
  signIn = async (email, password) => {
    const result = fetch(
      signInWithEmailAndPassword(this.#auth, email, password)
    )
    const response = await result
    const data = await response.json()
    return data
  }

  /**
   * Signs out the current user
   * @returns The sign out verification
   */
  singOut = async () => signOut(this.#auth)

  /**
   * Getter for the current user in the session
   * @returns the current user signed in
   */
  getUser = async () => this.#auth.currentUser

  /**
   * Observer to detect new state changes to the auth state
   * @param {requestCallback} fn a callback function that returns an object on state change
   * @returns the new auth state
   */
  onAuthChange = fn => onAuthStateChanged(this.#auth, fn)
}

const server = new Server()
Object.freeze(server)

export default server
