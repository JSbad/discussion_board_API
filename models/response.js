var packageJSON = require('../package.json');

//Return a JSON object containing the API version, payload and status message
function prepare(status, payload) {
    const _status = status;
    const _payload = payload;
    const _version = packageJSON.version;

    return { status: _status, api: _version, payload: _payload };
}

module.exports = {prepare}
