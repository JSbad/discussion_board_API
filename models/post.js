const Model = require("./model.js");

class Post extends Model {
  static tableName = "posts";
  static identifier = "post_id";
  static foreignIdentifier = "user_id";

  static fillable_properties = ["title", "imageName", "content"];
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

module.exports = Post;
