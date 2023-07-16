var Sequence = require('../models/sequence');

var maxAuthorId;
var maxBookId;
var maxLogId;
var maxUserId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
      .exec()
      .then((sequence) => {
        sequenceId = sequence._id;
        maxAuthorId = sequence.maxAuthorId;
        maxBookId = sequence.maxBookId;
        maxLogId = sequence.maxLogId;
        maxUserId = sequence.maxUserId;
      })
      // figure out the issue
      .catch((err) => {
          return res.status(500).json({
          title: "An error occurred",
          error: err,
      });
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'author':
      maxAuthorId++;
      updateObject = {maxAuthorId: maxAuthorId};
      nextId = maxAuthorId;
      break;
    case 'book':
      maxBookId++;
      updateObject = {maxBookId: maxBookId};
      nextId = maxBookId;
      break;
    case 'log':
      maxLogId++;
      updateObject = {maxLogId: maxLogId};
      nextId = maxLogId;
      break;
    case 'user':
      maxUserId++;
      updateObject = {maxUserId: maxUserId};
      nextId = maxUserId;
      console.log("User Id:" + nextId);
      break;
    default:
      return -1;
  }

  Sequence.updateOne({_id: sequenceId}, {$set: updateObject})
    .then(result => console.log(result))
    .catch((err) => {
      console.log("nextId error = ", err);
      return null;
    });
  return nextId;
}

module.exports = new SequenceGenerator();
