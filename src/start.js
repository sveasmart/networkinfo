const DisplayClient = require("./display_client")
const config = require('./config').loadConfig()
var rpc = require('json-rpc2')

const connectionCheck = require("./connectionCheck")

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



function buttonClicked() {
  console.log("Received a button click event via RPC")
  /*
  displayLine(2, "Testing cable...")


  try {
    const result = connectionCheck.checkCable()
    displayLine(2, result, false)
  } catch (err) {
    console.log("checkCable threw error", err)
    displayLine(2, err.toString(), false)
  }
  */
  displayLine(4, "Ping IP: ...")
  try {
    connectionCheck.pingIp()
    displayLine(4, "Ping IP: OK")
  } catch (err) {
    console.log("pingIp threw error", err)
    displayLine(4, "Ping IP: FAIL")
  }

}


function startRpcServerAndExposeButtonNotificationMethod() {
  const server = rpc.Server.$create({
    'websocket': true, // is true by default
    'headers': { // allow custom headers is empty by default
      'Access-Control-Allow-Origin': '*'
    }
  });

  // listen creates an HTTP server on 127.0.0.1 only
  server.listen(config.buttonNotificationPort, '127.0.0.1');

  server.expose("buttonClicked", (args, opts, callback) => {
    try {
      buttonClicked()
    } catch (err) {
      console.log("Something went wrong in buttonClicked", err)
    }
    callback(null) //Returns null to the display. Sort of.
  })

  console.log("Networkinfo app is now listening for button clicks via RPC port " + config.buttonNotificationPort)
}

displayLine(0, "Network info")
displayLine(1, "Press button")

startRpcServerAndExposeButtonNotificationMethod()
