/* global chrome */

const handleSubmit = form => {
  const password = form.querySelector("input[type=password]")
  if (!password) return
  chrome.runtime.sendMessage({
    action: "SEND_PASSWORD",
    payload: password.value
  })
  console.log(password.value)
}

for (const form of document.querySelectorAll("form")) {
  form.addEventListener("submit", () => handleSubmit(form))
}
