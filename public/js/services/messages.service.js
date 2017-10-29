angular.module('myApp')
.service('MessageService', ['$http', '$location', function($http, $location){

  var self = this;

  this.messages = [];

  this.addMessage = function(message, id){

    var message = {
      body: message.body
    }

    return $http.post(`/api/topics/${id}`, message)
    .then(function(response){
      self.messages.push(response.data);
      console.log('message response:', response.data);
      return response.data;
    });
  }

  this.getMessages = function(){
    return $http.get('/api/messages/latest')
    .then(function(response){
      console.log('latest:', response.data);
      return response.data;
    });
  }

  this.allMessages = function(){
    return $http.get('/api/messages')
    .then(function(response){
      return response.data;
    });
  }

  this.getMessage = function(id){
    return $http.get(`/api/messages/${id}`)
    .then(function(response){
      //console.log(response);
      return response.data;
    });
  }

  this.editMessage = function(message, messageID, topicID){

    var message = {
      body: message.body
    };

    return $http.put(`/api/messages/${messageID}/edit`, message)
    .then(function(response){
      $location.path(`/topics/${topicID}/messages`)
      return response.data;
    });
  }

}])