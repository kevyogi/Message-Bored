angular.module('myApp')
.service('TopicService', ['$http', function($http){

  this.topics = [];

  this.addTopic = function(topic){
    if(!topic){ return; }

    var topic = {
      name: topic.name
    }
  }
}])