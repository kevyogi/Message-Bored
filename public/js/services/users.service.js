angular.module('myApp')
.service('UserService', ['$http', function($http){
  var url = '/api/users';
  var self = this;

  // this.users = [];

  $http.get(url)
  .then(function(users){
    self.users = users.data;
  });

  this.getUsers = function(){
    return self.users;
  }

  this.getUser = function(index){
    return users[index];
  }

  this.addUser = function(givenUser){
    if(!givenUser){ return; }

    var user = {
      name: givenUser.name
    };
    self.users.push(user);

    $http.post(url, user)
    // console.log(user)
    .then(function(response){
      console.log(response);
      console.log('user created on backend');
    });
  }

}]);