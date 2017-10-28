angular.module('myApp')
.controller('ViewsController', ['$scope', function($scope){
  // var test = localStorage.getItem("login");
  // $scope.login = test;
  // console.log($scope.login);

  $scope.login = function(){
    return localStorage.getItem("login") === "true";
  }

  console.log($scope.login());


}]);