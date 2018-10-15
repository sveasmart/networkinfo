/**
 * This module encapsulates some if the nitty gritty stuff around loading
 * config params.
 */
const config = require('config')


exports.loadConfig = function() {
  return {
    pingIp: getString("pingIp"),
    pingDomain: getString("pingDomain"),

    logDisplay: getBool('logDisplay'),
    displayRpcPort: getOptionalString("displayRpcPort"),
    buttonNotificationPort: getOptionalString("buttonNotificationPort"),

    displayTab: getString("displayTab"),

    testFrequencySeconds: getInt("testFrequencySeconds")
  }
}

/**
 * Gets a config param, and fails if it doesn't exist.
 */
function get(name) {
  const value = config.get(name)
  console.assert(value != null && value != undefined, "Missing config param " + name)
  return value
}

function getOptional(name) {
  if (config.has(name)) {
    return config.get(name)
  } else {
    return null
  }
}

/**
 * Gets a config param and turns it into a string. Fails if doesn't exist.
 */
function getString(name) {
  const value = "" + get(name)
  console.assert(value.trim() != "", "Empty config param " + name)
  return value
}

function getOptionalString(name) {
  const value = getOptional(name)
  if (value == null || value == undefined) {
    return null
  } else {
    return "" + value
  }
}

/**
 * Gets a config param and turns it into an int. Fails if doesn't exist.
 */
function getInt(name, min, max) {
  const value = config.get(name)
  console.assert(value != null && value != undefined, "Missing config param " + name)
  const intValue = parseInt(value)
  if (min != undefined) {
    console.assert(intValue >= min, name + " was " + intValue + ", but it should be >= " + min )
  }
  if (max != undefined) {
    console.assert(intValue <= max, name + " was " + intValue + ", but it should be <= " + min )
  }
  return intValue
}

/**
 * If the param doesn't exist, returns null
 */
function getOptionalInt(name, min, max) {
  if (hasParam(name)) {
    return getInt(name, min, max)
  } else {
    return null
  }
}

function getBool(name) {
  const value = getString(name).trim().toLowerCase()
  if (value == "true") {
    return true
  } else if (value == "false") {
    return false
  } else {
    throw new Error(name + " was " + getString(name) + ", but I expected true/false")
  }
}

function getObject(name) {
  return get(name)
}

function hasParam(name) {
  const value = config.get(name)
  return value != null && value != undefined
}
