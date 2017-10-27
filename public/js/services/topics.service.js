angular.module('myApp')
.service('TopicService', ['$http', function($http){

  this.topics = [];

  this.addTopic = function(newTopic){
    if(!newTopic){console.log('missing topic')}

    var topic = {
      name: newTopic.name
    };

    return $http.post('/api/topics', topic)
    .then(function(response){
      console.log('service response:', response);
      return response.data;
    });
  }
}])