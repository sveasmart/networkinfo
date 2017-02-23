const spawnSync = require('child_process').spawnSync;

// networkInterface = "eth0" or "wlan0" on raspberry
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

exports.checkInternetConnection = checkInternetConnection;
