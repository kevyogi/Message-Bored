angular.module('myApp', ['ngRoute']);

var myApp = angular.module('myApp')
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $routeProvider
  .when('/users', {
    templateUrl: '/views/users.html',
    controller: 'UsersController'
  })
  .when('/register', {
    templateUrl: '/views/newUser.html',
    controller: 'newUserController'
  })
  .when('/login', {
    templateUrl: '/views/login.html',
    controller: 'loginController'
  })
  .when('/users/:id', {
    templateUrl: '/views/singleUser.html',
    controller: 'singleUserController'
  })
  .when('/topics', {
    templateUrl: '/views/newTopic.html',
    controller: 'TopicsController'
  })
  .when('/topics/:id/messages', {
    templateUrl: '/views/singleTopic.html',
    controller: 'SingleTopicController'
  })
  .when('/messages/latest', {
    templateUrl: '/views/latestMessages.html',
    controller: 'MessagesController'
  })
  .when('/topics/:id/edit', {
    templateUrl: '/views/editTopic.html',
    controller: 'EditTopicController'
  })

  $locationProvider.html5Mode(true);
}]);