angular.module('myApp')
.controller('TopicsController', ['$scope', 'TopicService', function($scope, TopicService){

  $scope.TopicService = TopicService;

  $scope.getTopics = function(){
    $scope.topics = TopicService.getTopics();
  }

  $scope.addTopic = function(e){
    console.log('newTopic:', $scope.newTopic);
    TopicService.addTopic($scope.newTopic);
    $scope.newTopic.name = '';
  }


}]);