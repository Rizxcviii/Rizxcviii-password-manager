/*global chrome */
import server from "./server"

// state used to handle modal between url changes
const state = {
  showModal: false,
  useCase: "",
  password: ""
}

const getActiveTab = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length) {
        resolve(tabs[0])
      } else {
        reject()
      }
    })
  })
}

chrome.runtime.onMessage.addListener(async message => {
  let tab = null
  switch (message.action) {
    case "SET_CREDENTIALS":
      tab = await getActiveTab()
      const url = new URL(tab.url)
      const hostname = url.hostname
      state.useCase = hostname
      state.password = message.payload
      break
    case "CLOSE_MODAL":
      console.log("close modal")
      state.showModal = false
      state.useCase = ""
      state.password = ""
      break
    case "SHOW_MODAL":
      state.showModal = true
      tab = await getActiveTab()
      chrome.tabs.sendMessage(tab.id, {
        action: "SHOW_MODAL",
        payload: {
          useCase: state.useCase,
          password: state.password
        }
      })
    case "SAVE_CREDENTIALS":
      const res = await server.update("passwords", ...message.payload)
      if (res.error) {
        console.log(res.error)
      }

      break
    default:
      break
  }
})

// will still show modal if user navigates to a different page
chrome.tabs.onUpdated.addListener(async (_, changeInfo) => {
  if (changeInfo.status === "complete") {
    try {
      const tab = await getActiveTab()
      if (state.showModal) {
        chrome.tabs.sendMessage(tab.id, {
          action: "SHOW_MODAL",
          payload: {
            useCase: state.useCase,
            password: state.password
          }
        })
      } else {
        chrome.tabs.sendMessage(tab.id, {
          action: "CLOSE_MODAL"
        })
      }
    } catch (e) {
      console.log("error", e)
    }
  }
})
