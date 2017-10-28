angular.module('myApp')
.controller('EditTopicController', ['$scope', '$routeParams', 'TopicService', function($scope, $routeParams, TopicService){

  $scope.TopicService = TopicService;

  // TopicService.editTopic($routeParams.id)
  // .then(function(topic){
  //   console.log(topic);
  //   $scope.topic = topic;
  // });

  $scope.editTopic = function(e){
    TopicService.editTopic($scope.topic, $routeParams.id);

    $scope.topic = '';
  }

}]);