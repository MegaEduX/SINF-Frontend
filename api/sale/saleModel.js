var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaleSchema = new Schema({
  oID {
    type: String,
    required: true,
  },
  list {
    type: Array[String]
  }
});

SaleSchema.pre('save', function(next) {
  
})

SaleSchema.methods = {
  toJson: function() {
    return this.toObject()
  }
};


module.exports = mongoose.model('sale', SaleSchema);
