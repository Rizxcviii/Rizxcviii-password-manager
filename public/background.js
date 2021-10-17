/*global chrome */

let userId = null

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["user"], user => {
    console.log(user)
  })
})
