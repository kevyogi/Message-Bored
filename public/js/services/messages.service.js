angular.module('myApp')
.service('MessageService', ['$http', function($http){

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
      return response.data
    });
  }

}])