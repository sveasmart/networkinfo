const connectionCheck = require('./connectionCheck')

var display
var buttons

try {
  const adafruit = require('adafruit-mcp23008-ssd1306-node-driver')
  if (adafruit.hasDriver()) {
    console.log("Adafruit is available, so this device appears to have a display :)")
    display = new adafruit.DisplayDriver()
    buttons = new adafruit.ButtonDriver()
  } else {
    console.log("Adafruit is not available, so we'll fake the display using the console")
    display = new adafruit.FakeDisplayDriver()
    buttons = new adafruit.FakeButtonDriver()
  }

} catch (err) {
  console.log("Failed to load Adafruit, so we'll fake the display using the console" + err)
  display = null
  buttons = null
}

function showNetworkStatus() {

    if (connectionCheck.checkInternetConnection()) {
      if (display) {
        display.text("Has connection");
      } else {
        console.log("Has connection");
      }
    } else {
      if (display) {
        display.text("No network connction")
      } else {
        console.log("No network connction");
      }
    }
}

/*
if (buttons) {
  buttons.watchAllButtons(function(buttonId) {
    console.log("button pressed " + buttonId)
    if (buttonId == 0) {
      showQrCode()
    } else if (buttonId == 1) {
      showRegistrationUrl()
    } else {
    }
  })
  
}*/

showNetworkStatus();

