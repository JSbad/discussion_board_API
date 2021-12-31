var packageJSON = require("../package.json");

//Return a JSON object containing the API version, payload and status message
function prepare(status, payload, error) {
  const timestamp = new Date().toLocaleString("en-GB");
  return {
    status: status,
    version: packageJSON.version,
    timestamp: timestamp,
    payload: payload,
    errors: error,
  };
}

module.exports = { prepare };
