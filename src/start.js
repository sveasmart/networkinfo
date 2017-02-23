const connectionCheck = require('./connectionCheck');

let display;
let buttons;

try {
  const adafruit = require('adafruit-mcp23008-ssd1306-node-driver');
  if (adafruit.hasDriver()) {
    console.log("Adafruit is available, so this device appears to have a display :)");
    display = new adafruit.DisplayDriver();
    buttons = new adafruit.ButtonDriver();
  } else {
    console.log("Adafruit is not available, so we'll fake the display using the console");
    display = new adafruit.FakeDisplayDriver();
    buttons = new adafruit.FakeButtonDriver();
  }

} catch (err) {
  console.log("Failed to load Adafruit, so we'll fake the display using the console" + err);
  display = null;
  buttons = null;
}

function showNetworkStatus() {
  if (connectionCheck.checkInternetConnection()) {
    display.text("OK - Connected to Internet");
  } else {
    display.text("WARNING - No Internet Connection!");
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

setInterval(showNetworkStatus, 1000);

