angular.module('myApp')
.service('TopicService', ['$http', '$location', function($http, $location){
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
      //console.log('service response:', response.data);
      return response.data;
    });
  }



  $http.get('/api/topics')
  .then(function(topics){
    //console.log(topics.data);
    self.topics = topics.data;
    return topics.data;
  });

  this.getTopic = function(id){
    return $http.get(`/api/topics/${id}/messages`)
    .then(function(topicInfo){
      console.log(topicInfo);
      return topicInfo;
    });
  }

  this.editTopic = function(newName, id){

    var newTopic = newName;

    return $http.put(`/api/topics/${id}`, newTopic)
    .then(function(topic){
      $location.path(`/topics/${id}/messages`);
      //console.log(topic);
      return topic;
    });
  }

}])