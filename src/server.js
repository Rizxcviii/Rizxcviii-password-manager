import { initializeApp } from "@firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
import config from "./appSecrets"

/**
 * The connection to the firebase server, giving APIs to access the data
 */
class Server {
  #app
  #auth
  /**
   * performs a try, catch of fn
   * @param {requestCallback} fn The firebase function to call
   * @param  {...any} params parameters to parse into fn
   * @returns the result, accepted or rejected
   */
  #makeCall = async (fn = () => null, ...params) => {
    try {
      const res = await fn(...params)
      return res
    } catch (err) {
      return {
        error: true,
        code: err.code,
        message: err.message
      }
    }
  }

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
    const res = await this.#makeCall(
      createUserWithEmailAndPassword,
      this.#auth,
      email,
      password
    )
    return res
  }

  /**
   * Allows the sign in of a user
   * @param {String} email The users email address
   * @param {String} password The users password
   * @returns a data response object in the form of JSON
   */
  signIn = async (email, password) => {
    const res = await this.#makeCall(
      signInWithEmailAndPassword,
      this.#auth,
      email,
      password
    )
    return res
  }

  /**
   * Signs out the current user
   * @returns The sign out verification
   */
  singOut = async () => signOut(this.#auth)

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
