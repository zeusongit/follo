let commService = require(__dirname +
  "/../../services/communityService/communityService.js");
/**
 * Method to create community by a user
 *
 * @param {*} req - details that are required to create community ie cname, description
 * @param {*} res - object of community that was created
 */
let createCommunity = (req, res) => {
  let newCommunity = req.body;
  if (req.file) {
    newCommunity.communityPicture = req.file.location;
  }
  newCommunity.memberIds = req.user._id;
  newCommunity.createdBy = req.user._id;
  
  commService.createCommunity(newCommunity)
    .then((result) => {
      if (result) {
        let community = {
          cname: result.community.cname,
          description: result.community.description,
          memberIds: result.community.memberIds,                    
          createdBy: result.community.createdBy,
          createdDate: result.community.createdDate
        }
        res.send(community);
      } else {
        res.status(400).send({
          status: 400,
          message: 'Community already exists'
        })
      }
    })
    .catch((result) => {
      res.status(400);
      res.send({
        message: "Cannot create Community",
        status: 400
      });

    })
}


/**
 *
 * Getting list of al communities that are present
 * @param {*} req
 * @param {*} res
 */
let getAllCommunities = (req, res) => {
  
  commService
    .getAllCommunities()
    .then(communities => {
      res.send(communities);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Communities."
      });
    });
};




module.exports = {  
  createCommunity,
  getAllCommunities
};