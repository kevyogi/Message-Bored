angular.module('myApp')
.service('UserService', ['$http', '$location', '$window', function($http, $location, $window){
  var usersUrl = '/api/users/';
  var newUserUrl = '/api/users/register';
  var self = this;

  this.users = [];

  $http.get(usersUrl)
  .then(function(users){
    self.users = users.data;
  });

  this.getUser = function(id){
    if(!id){ return; }

    return $http.get(usersUrl+id)
    .then(function(userInfo){
      console.log(userInfo.data);
      return userInfo.data;
    });
  }

  // this.getUsers = function(){
  //   return self.users;
  // }

  // this.login = function(user){
  //   $http.post('/api/users/login')
  //   .then(function(data){
  //     $window.localStorage.setItem('user_id', data);
  //     console.log(data);
  //   });
  // }

  this.addUser = function(givenUser){
    if(!givenUser){ return; }

    var user = {
      name: givenUser.name
    };

    return $http.post(newUserUrl, user)
    .then(function(response){
      self.users.push(response.data);
      return response.data;
    });
  }

}]);