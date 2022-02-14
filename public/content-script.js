/* global chrome */

const handleSubmit = form => {
  const password = form.querySelector("input[type=password]")
  if (!password) return
  chrome.runtime.sendMessage({
    action: "SEND_PASSWORD",
    payload: password.value
  })
}

const createHTMLNotification = ({ useCase, password }) =>
  `
    <!-- New password detected: MAKE WAYYYYY FOR THIS -->
    <div style="box-shadow: 1px 4px 8px 2px rgb(0 0 0 / 20%); z-index: 69420 ;width: 300px; position: fixed;top: 16px;right: 16px;border: 1px solid #DEF2F1;border-radius: 8px;padding: 16px;font-family: 'Centra';background-color: azure;" id="add-password-rizxcviii">
      <h1 style="font-size: 24px; margin: 0; margin-bottom: 16px; font-family: 'Centra';">Rizxcviii - Add Password</h1>
      <p style="font-weight: 100;">Would you like to add a password for <b style="font-weight: 500;">${useCase}</b>?</p>
      <form onsubmit="e => addPassword(e)">
        <input type="text" name="useCase" value="${useCase}" style="margin-bottom: 4px;width: 100%;">
        <input type="password" value="${password}" placeholder="Password" style="margin-bottom: 4px;width: 100%;">
        <div style="display: flex; justify-content: space-between;">
          <input type="submit" value="Add Password" style="width: 130px; padding: 8px 0; background-color: #3AAFA9;border: none;color: white;font-size: 16px;border-radius: 4px;font-weight: 600;">
          <input type="button" value="Cancel" style="width: 130px; padding: 8px 0; background-color: #3AAFA9;border: none;color: white;font-size: 16px;border-radius: 4px;font-weight: 600;" onclick="${() => document.getElementById('add-password-rizxcviii').remove()}">
        </div>
      </form>
    </div>
    <!-- New password detected: MAKE WAYYYYY FOR THIS -->
  `

for (const form of document.querySelectorAll("form")) {
  form.addEventListener("submit", () => handleSubmit(form))
}

chrome.runtime.onMessage.addListener(message => {
  switch (message.action) {
    case "SHOW_PASSWORD_NOTIFICATION":
      const html = createHTMLNotification(message.payload)
      document.body.insertAdjacentHTML("beforeend", html)
      break
    default:
      break
  }
})
