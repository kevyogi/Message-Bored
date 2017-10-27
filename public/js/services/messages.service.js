angular.module('myApp')
.service('MessageService', ['$http', function($http){

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

}])