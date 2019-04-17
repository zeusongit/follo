let mongoose = require(__dirname + "/../db/mongoose.js");

let commSchemaTemplate = {
  cname: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    unique: false
  },
  memberIds: {
    type: String,
    required: true,
    unique: false
  },
  postids: {
    type: String,
    required: false,
    unique: false
  },
  communityPicture: {
    type: String
  },
  createdBy: {
    type: String,
    required: true,
    unique: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
};

let commSchema = new mongoose.Schema(commSchemaTemplate, {
  collection: "communities"
});

module.exports = commSchema;