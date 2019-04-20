let mongoose = require(__dirname+'/../db/mongoose.js');

const mediaTemplate = {
    name: String,
    url: String
}
const eventTemplate = {
    name: String,
    desc: String,
    location:String,
    date: Date,
    url: String
}

let postSchemaTemplate = {
    title: {
        type: String,
        required: true,
        unique: false
    },

    content: {
        type: String,
        required: true,
        default: ''
    },

    type: {
        type: String,
        require: true,
        default: 'text'
    },

    event_desc:[{
        event: eventTemplate
    }],

    post_media: [{
        media: mediaTemplate
    }],

    parent_community: {
        _id: String,
        cname: String
    },

    created_by: {
        _id: String,
        username: String
    },

    posted_on:{
        type: Date,
		default: Date.now
    },

    last_updated_on:{
        type: Date,
		default: Date.now
    },

    is_active:{
        type: Boolean,
        default: true
    }
};

let postSchema = new mongoose.Schema(postSchemaTemplate, {
  collection: "posts"
});

postSchema.statics.findById = async function (id){
    let post = await this.findOne({"_id":id})
    if (!post){
        return null;
    }
    return post;
}


postSchema.statics.findByCommunity = async function (community) {
    let posts = await this.find({"parent_community.community.cname": community})
    if (!posts){
        return [];
    }
    return posts;
}

postSchema.statics.findByUser = async function (user) {
    let posts = await this.find({"created_by.user.username": user})
    if (!posts){
        return [];
    }
    return posts;
}

postSchema.statics.searchPost = async function (key) {
    //let posts = await this.find({title: new RegExp('^'+key+'$', "i")})
    let posts = await this.find({
        $and: [
            { $or: { "title" : new RegExp('^'+key+'$', "i") } },
            { $or: { "content" : new RegExp('^'+key+'$', "i") } }
        ]
    })
    if (!posts){
        return [];
    }
    return posts;
}


postSchema.methods.ok = async function(){
    console.log("OK");
    return true;
}

module.exports = postSchema;
