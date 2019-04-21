let mongoose = require(__dirname + "/../db/mongoose.js");

const postTemplate = {
  id: String
}

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

  memberIds: [{
    member: String
  }  
],  
  posts: [{
    post: postTemplate
  }],
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
  },
  isActive: {
    type: Boolean,
    default:true
  }
};

let commSchema = new mongoose.Schema(commSchemaTemplate, {
  collection: "communities"
});

commSchema.statics.findCommunityByName = async function (name) {
  console.log("nm"+name);
  let comm = await this.findOne({"cname":name})
  if (!comm){
      throw new Error('not found')
  }
  return comm
}

commSchema.statics.findAllCommunities = async function () {
  let comm = await this.find({ isActive : true })
  if (!comm){
      throw new Error('not found')
  }
  return comm
}

module.exports = commSchema;