angular.module('myApp')
.controller('TopicsController', ['$scope', 'TopicService', function($scope, TopicService){

  $scope.TopicService = TopicService;

  $scope.getTopics = function(){
    return TopicService.getAllTopics()
    .then(function(topics){
      $scope.theTopics = topics;
      console.log('topics:', topics);
    });
  }

  console.log($scope.getTopics());


  $scope.login = function(){
    return localStorage.getItem("login") === "true";
  }

  $scope.addTopic = function(e){
    console.log('newTopic:', $scope.newTopic);
    TopicService.addTopic($scope.newTopic);
    $scope.newTopic.name = '';
  }


}]);