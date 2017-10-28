angular.module('myApp')
.controller('SingleTopicController', ['$scope', '$routeParams', 'TopicService', 'MessageService', function($scope, $routeParams, TopicService, MessageService){

  $scope.TopicService = TopicService;
  $scope.MessageService = MessageService;

  TopicService.getTopic($routeParams.id)
  .then(function(topicInfo){
    console.log('topicinfo:', topicInfo);
    $scope.topic = topicInfo;
  });

  // TopicService.editTopic($routeParams.id)
  // .then(function(topic){
  //   console.log(topic);
  //   $scope.editedTopic = topic;
  // });

  $scope.addMessage = function(e){
    MessageService.addMessage($scope.newMessage, $routeParams.id)
    .then(function(newMessage){
      console.log(newMessage);
      $scope.topic.data.messages.push(newMessage);

    })
    $scope.newMessage.body = '';
  }

}]);