const Model = require("./model.js");

class User extends Model {
  static tableName = "users";
  static identifier = "user_id";
  static foreignIdentifier = "post_id";

  static fillable_properties = ["user", "username"];
  static public_properties = [
    this.identifier,
    ...this.fillable_properties,
    this.foreignIdentifier,
    ...this.public_properties,
  ];
  constructor() {
    super();
  }
}

module.exports = User;