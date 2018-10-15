const childProcess = require('child_process')

function checkCable() {
  return run("cat /sys/class/net/eth0/{carrier,operstate}")
}

function pingIp() {
  return run("ping -W 5 -c 1 8.8.8.8")
}

function run(command) {
  console.log("Calling " + command)
  const result = childProcess.execSync(command)
  const output = result.toString()
  console.log("  Output: ", output)
  return output
}

// networkInterface = "eth0" or "wlan0" on raspberry
const spawnSync = require('child_process').spawnSync;
function checkInternetConnection(networkInterface) {
  let command = "ping";
  let args = ["-c", "1"];
  
  if( networkInterface ){
    args.push("-I");
    args.push(networkInterface);
  }
  
  args.push("www.kth.se"); // slightly more reliable than www.chalmers.se ;-)
  
  return 0 === spawnSync(command, args).status;
}


exports.checkInternetConnection = checkInternetConnection
exports.checkCable = checkCable
exports.pingIp = pingIp
