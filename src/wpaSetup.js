const spawnSync = require('child_process').spawnSync;

//wpaNetworkName = spawnSync("wpa_cli scan_results | grep WPS | sort -r -k3 | awk 'END{print $NF}'").toString().trim();

console.log(network());
// TODO wpa_cli wps_pbc 
// When runnig wpa_cli in interactive mode thw wps_pbc loops untill button is pressed.
// Maybe the looping can be done using the wpa_cli wps_pbc command in some way?

function network() {
  spawnSync("wpa_cli", ["scan"]);
  // todo: Need to do this i a loop of some sort, because scan resturns emediately, but continues in the background
  result = spawnSync("wpa_cli", ["scan_results"]);
  return result.output.toString();
}
