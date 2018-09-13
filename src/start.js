const DisplayClient = require("./display_client")
const config = require('./config').loadConfig()

let displayClient
if (config.displayRpcPort && config.displayRpcPort != 0 && config.displayRpcPort != "0") {
  console.log("I will talk to a display via RPC on port " + config.displayRpcPort)
  displayClient = new DisplayClient(config.displayRpcPort, config.logDisplay)
} else {
  console.log("No valid displayRpcPort set, so I'll use the console")
  displayClient = null
}

function displayLine(row, text, wrap = false) {
  if (text) {
    if (displayClient) {
      displayClient.callAndRetry('setRowText', [text, row, wrap, config.displayTab])
    } else {
      console.log("Display line " + row + ": " + text)
    }
  } else {
    if (displayClient) {
      displayClient.callAndRetry('clearRow', [row, config.displayTab])
    } else {
      console.log("Clear display line " + row)
    }
  }
}

displayLine(0, "Network info")
displayLine(2, "Not implemented yet...", true)