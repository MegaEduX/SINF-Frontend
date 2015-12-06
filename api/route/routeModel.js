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
  picked: {
      type: Schema.Types.Mixed,
      required: true
  },
  date: {
      type: Date,
      required: true
  }
});

module.exports = mongoose.model('route', RouteSchema);
