angular.module('myApp', ['ngRoute']);

var myApp = angular.module('myApp')
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $routeProvider
  .when('/users', {
    templateUrl: '/views/users.html',
    controller: 'UsersController'
  })

  $locationProvider.html5Mode(true);
}])
.run([function(){

}]);