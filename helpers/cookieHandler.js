const { v1: uuidv1 } = require("uuid");
const cookieParser = require("cookie-parser");

cookie - handler.use(cookieParse());

class cookieHandler {
  static setCookie(res, key, value) {
    res.cookie(key, value, {
      expires: new Date("01 01 2100"),
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });
  }

  static getCookie(req, key) {
    req.cookie[key];
  }
}
module.exports = cookieHandler;
