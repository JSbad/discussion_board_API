const Model = require("./model.js");

class Comment extends Model {
  static tableName = "comments";
  static identifier = "comment_id";
  static foreignIdentifier = "post_id";

  static fillable_properties = ["author", "content"];
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

module.exports = Comment;
