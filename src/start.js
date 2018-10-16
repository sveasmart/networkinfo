const DisplayClient = require("./display_client")
const config = require('./config').loadConfig()
const rpc = require('json-rpc2')
const moment = require('moment')

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
      displayClient.call('setRowText', [text, row, wrap, config.displayTab])
    } else {
      console.log("Display line " + row + ": " + text)
    }
  } else {
    if (displayClient) {
      displayClient.call('clearRow', [row, config.displayTab])
    } else {
      console.log("Clear display line " + row)
    }
  }
}

function clearAllLines() {
  if (displayClient) {
    displayClient.call('clear', [config.displayTab])
  } else {
    console.log("Clear all lines")
  }
}


function buttonClicked() {
  console.log("Received a button click event via RPC")

  clearAllLines()

  let row = 0
  const dateString = moment().format("YYYY-MM-DD HH:mm")
  displayLine(row, dateString)

  row = 1
  displayLine(row, "Cable ...")
   try {
     const output = connectionCheck.checkCable()
     displayLine(row, "Cable: " + output)
   } catch (err) {
     console.log("checkCable threw error", err)
     displayLine(row, "Cable FAIL")
   }

  row = 2
  displayLine(row, "Checking My IP..")
  try {
    const myIp = connectionCheck.getMyIp()
    if (myIp) {
      displayLine(row, myIp)
    } else {
      displayLine(row, "No IP address")
    }
  } catch (err) {
    console.log("pingIp threw error", err)
    displayLine(row, "No IP address")
  }

  row = 3
  displayLine(row, "Ping IP ...")
  try {
    connectionCheck.pingIp()
    displayLine(row, "Ping IP OK")
  } catch (err) {
    console.log("pingIp threw error", err)
    displayLine(row, "Ping IP FAIL")
  }

  row = 4
  displayLine(row, "Ping KTH ...")
  try {
    connectionCheck.pingKth()
    displayLine(row, "Ping KTH OK")
  } catch (err) {
    console.log("pingKth threw error", err)
    displayLine(row, "Ping KTH FAIL")
  }

  row = 5
  displayLine(row, "Ping Smart ...")
  try {
    connectionCheck.pingSmart()
    displayLine(row, "Ping Smart OK")
  } catch (err) {
    console.log("pingSmart threw error", err)
    displayLine(row, "Ping Smart FAIL")
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
