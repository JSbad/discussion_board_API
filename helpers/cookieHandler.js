const { v1: uuidv1 } = require("uuid");
const cookieParser = require("cookie-parser");

class cookieHandler {
  static setCookie(res, key, value) {
    res.cookie(key, value, {
      expires: new Date("01 01 2100"),
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });
  }

  static getCookie(req, res) {
    return req.cookie;
  }
}
module.exports = cookieHandler;
