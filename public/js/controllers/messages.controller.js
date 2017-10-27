angular.module('myApp')
.controller('MessagesController', ['$scope', 'MessageService', function($scope, MessageService){

  $scope.MessageService = MessageService;

  MessageService.getMessages()
  .then(function(response){
    $scope.messages = response;
  });


}]);