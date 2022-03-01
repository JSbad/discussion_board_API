const Model = require("./model.js");

class User extends Model {
  static tableName = "users";
  static identifier = "user_id";

  static public_properties = [
    this.identifier,
    ...this.public_properties,
  ];
  constructor() {
    super();
  }
}

module.exports = User;