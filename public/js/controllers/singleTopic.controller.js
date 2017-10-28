angular.module('myApp')
.controller('SingleTopicController', ['$scope', '$routeParams', 'TopicService', 'MessageService', function($scope, $routeParams, TopicService, MessageService){

  $scope.TopicService = TopicService;
  $scope.MessageService = MessageService;

  TopicService.getTopic($routeParams.id)
  .then(function(topicInfo){
    console.log('topicinfo:', topicInfo);
    $scope.topic = topicInfo;
  });

  $scope.login = function(){
    return localStorage.getItem("login") === "true";
  }

  $scope.addMessage = function(e){
    MessageService.addMessage($scope.newMessage, $routeParams.id)
    .then(function(newMessage){
      $scope.topic.data.messages.push(newMessage);
    })
    $scope.newMessage.body = '';
  }

}]);
