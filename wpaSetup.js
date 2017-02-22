const spawnSync = require('child_process').spawnSync;

//wpaNetworkName = spawnSync("wpa_cli scan_results | grep WPS | sort -r -k3 | awk 'END{print $NF}'").toString().trim();

console.log(network());

function network() {
  spawnSync("wpa_cli", ["scan"]);
  result = spawnSync("wpa_cli", ["scan_results"]);
  return result.output.toString();
}
