angular.module('myApp')
.controller('SingleTopicController', ['$scope', '$routeParams', 'TopicService', 'MessageService', function($scope, $routeParams, TopicService, MessageService){

  $scope.TopicService = TopicService;
  $scope.MessageService = MessageService;

  TopicService.getTopic($routeParams.id)
  .then(function(topicInfo){
    console.log('topicInfo:', topicInfo);
    $scope.topic = topicInfo;

    $scope.validateTopic = function(){
      return Number(localStorage.getItem("user")) === topicInfo.data.topic.author_id;
    }
    console.log('validate', $scope.validateTopic());

    $scope.user = Number(localStorage.getItem("user"));
  });

  $scope.login = function(){
    return localStorage.getItem("login") === "true";
  }

  $scope.edit = false;

  $scope.addMessage = function(e){
    MessageService.addMessage($scope.newMessage, $routeParams.id)
    .then(function(newMessage){
      $scope.topic.data.messages.push(newMessage);
    })
    $scope.newMessage.body = '';
  }

  /////////////

  $scope.editMessage = function(message, id){
    //console.log(id);
    //$scope.edit = false;
    MessageService.editMessage(message, id, $routeParams.id);
  }

}]);
