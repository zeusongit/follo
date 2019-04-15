let mongoose = require(__dirname+'/../../db/mongoose.js');

let commSchema = require(__dirname+'/../../schema/commSchema.js');

let commModel = mongoose.model('commModel', commSchema);

module.exports = commModel;