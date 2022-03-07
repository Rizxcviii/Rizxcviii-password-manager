import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
import { child, get, getDatabase, ref, set, update } from "firebase/database"
import config from "./appSecrets"

/**
 * The connection to the firebase server, giving APIs to access the data
 * Impletements the Singleton pattern to ensure only one instance of the class is created
 */
class Server {
  #app
  #auth
  #db
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
      console.log(err)
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
      this.#db = getDatabase(this.#app)
      Server.instance = this
    }
    return
  }

  /***********************************************
   * AUTHENTICATION
   ***********************************************/

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
  signOut = async () => {
    const res = await this.#makeCall(signOut, this.#auth)
    return res
  }

  /**
   * Observer to detect new state changes to the auth state
   * @param {requestCallback} fn a callback function that returns an object on state change
   * @returns the new auth state
   */
  onAuthChange = fn => onAuthStateChanged(this.#auth, fn)

  /***********************************************
   * DATABASE
   ***********************************************/

  /**
   * Make a single write call using a single key/value pair
   * @param {String} location The parent location you wish to write to
   * @param {String} key The key of the data to write
   * @param {String} value The value of the data to write
   * @returns a data response object in the form of JSON
   */
  write = async (location, key, value) => {
    const res = this.#makeCall(
      set,
      ref(this.#db, `users/${this.#auth.currentUser.uid}/${location}`),
      {
        [key]: value
      }
    )
    return res
  }

  /**
   * Make a single read call using the path
   * @param {String} location The path you wish to read data from
   * @returns a data response object in the form of JSON
   */
  read = async location => {
    const res = await this.#makeCall(
      get,
      child(ref(this.#db), `users/${this.#auth.currentUser.uid}/${location}`)
    )
    return res
  }

  /**
   * Make a single read call using the path, from root
   * @param {String} location The path you wish to read data from
   * @returns a data response object in the form of JSON
   */
  readRoot = async location => {
    const res = await this.#makeCall(get, child(ref(this.#db), location))
    return res
  }

  /**
   * Make a single update call using a single key/value pair
   * @param {String} location The parent location you wish to update to
   * @param {String} key The key of the data to update
   * @param {String} value The value of the data to update
   * @returns a data response object in the form of JSON
   */
  update = async (location, key, value) => {
    const res = this.#makeCall(
      update,
      ref(this.#db, `users/${this.#auth.currentUser.uid}/${location}`),
      {
        [key]: value
      }
    )
    return res
  }
}

const server = new Server()
Object.freeze(server)

export default server
