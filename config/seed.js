var User = require('../api/user/userModel');
var _ = require('lodash');


var users = [
  {username: 'Worker1', name: 'John', surname: 'Doe', password: 'test', level: 0},
  {username: 'Worker2', name: 'Jane', surname: 'Doe', password: 'test', level: 0},
  {username: 'Worker3', name: 'Ivan', surname: 'Horvat', password: 'test'},
  {username: 'Admin', name: 'Admin', surname: 'Adminovic', password: 'test', level: 1}
];

var createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

var cleanDB = function() {
  var cleanPromises = [User]
    .map(function(model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
}

var createUsers = function(data) {
  var promises = users.map(function(user) {
    return createDoc(User, user);
  });

  return Promise.all(promises)
    .then(function(users) {
      return _.merge({users: users}, data || {});
    });
};

cleanDB()
  .then(createUsers);