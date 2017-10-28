angular.module('myApp')
.controller('EditTopicController', ['$scope', '$routeParams', 'TopicService', function($scope, $routeParams, TopicService){

  $scope.TopicService = TopicService;

  $scope.editTopic = function(e){
    TopicService.editTopic($scope.topic, $routeParams.id);

    $scope.topic = '';
  }

}]);