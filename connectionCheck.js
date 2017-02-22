const spawnSync = require('child_process').spawnSync;

console.log( "Has connection to the big internet:    " + checkInternetConnection() );
console.log( "Has connection through ethernet cable: " + checkInternetConnection("eth0") );
console.log( "Has connection through wifi          : " + checkInternetConnection("wlan0") );

function checkInternetConnection(networkInterface) {
  let command = "ping";
  let args = ["-c", "1"]
  
  if( networkInterface ){
    args.push("-I")
    args.push(networkInterface);
  }
  
  args.push("www.kth.se"); // slightly more reliably than www.chalmers.se ;-)
  
  result = spawnSync("ping", args);
  return result.status === 0;
}
