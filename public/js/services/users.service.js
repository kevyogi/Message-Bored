angular.module('myApp')
.service('UserService', ['$http', '$location', function($http, $location){
  var usersUrl = '/api/users/';
  var newUserUrl = '/api/register';
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
      console.log('userinfo:', userInfo.data);
      return userInfo.data;
    });
  }

  this.addUser = function(givenUser){
    if(!givenUser){ return; }

    var user = {
      name: givenUser.name,
      password: givenUser.password
    };

    return $http.post(newUserUrl, user)
    .then(function(response){
      self.users.push(response.data);
      $location.path('/login');
      return response.data;
    });
  }

  this.login = function(theUser){
    var user = {
      name: theUser.name,
      password: theUser.password
    }

    return $http.post('/api/login', user)
    .then(function(response){
      localStorage.setItem('login', true);
      localStorage.setItem('user', response.data.id);
      $location.path('/topics');
      return response.data;
    })
  }

  this.logout = function(){
    return $http.get('/api/logout')
    .then(function(response){
      localStorage.setItem('login', false);
      localStorage.setItem('user', 0);
      $location.path('/topics');
      console.log('logged out:', response);
      return response
    })
  }

}]);