var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var RouteSchema = new Schema({
  username: {
      type: String,
      required: true
  },
  objects: {
      type: Schema.Types.Mixed,
      required: true
  },
  date: {
      type: Date,
      required: true
  },
  finished: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('route', RouteSchema);
