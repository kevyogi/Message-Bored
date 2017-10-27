angular.module('myApp')
.service('TopicService', ['$http', function($http){
  var self = this;

  this.topics = [];

  this.addTopic = function(newTopic){
    if(!newTopic){console.log('missing topic')}

    var topic = {
      name: newTopic.name
    };

    return $http.post('/api/topics', topic)
    .then(function(response){
      self.topics.push(response.data)
      console.log('service response:', response.data);
      return response.data;
    });
  }

  $http.get('/api/topics')
  .then(function(topics){
    console.log(topics.data);
    self.topics = topics.data;
  });

}])