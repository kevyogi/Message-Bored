angular.module('myApp')
.controller('EditMessageController', ['$scope', '$routeParams', 'MessageService', function($scope, $routeParams, MessageService){

  $scope.MessageService = MessageService;

  MessageService.getMessage($routeParams.id)
  .then(function(oldMessage){
    console.log('oldMessage', oldMessage)
    $scope.oldMessage = oldMessage;
    $scope.message = oldMessage;
  });

  $scope.editMessage = function(e){
    MessageService.getMessage($routeParams.id)
    .then(function(oldMessage){
      MessageService.editMessage($scope.message, $routeParams.id, oldMessage.topic.id);
      $scope.message = '';
    })
  }

}]);
