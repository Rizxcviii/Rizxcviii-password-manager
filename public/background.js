/*global chrome */

chrome.runtime.onMessage.addListener(message => {
  switch (message.action) {
    case "SEND_PASSWORD":
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0]
        const url = new URL(tab.url)
        const hostname = url.hostname
        chrome.tabs.sendMessage(tab.id, {
          action: "SHOW_PASSWORD_NOTIFICATION",
          payload: {
            useCase: hostname,
            password: message.payload
          }
        })
      })
      break
    default:
      break
  }
})
