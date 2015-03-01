'use strict';

angular.module('Main')

.service('openLogin',
['$scope','LxDialogService', function (LxDialogService){
var service = {};

service.openDialog = function(dialogId)
    {
    LxDialogService.open(dialogId);
    };

 service.closeDialog = function(dialogId)
    {
    LxDialogService.close(dialogId);
    };

return service;

}])


.factory('userListFactory',
['$http', function userListFactory($http){
var factory = {};

factory.getUsers = function(){

var users = {users:null}
var req = {
        url: '/api/users',
        method: 'GET',
        };

$http(req).success(function (data) {
    users.users = data;
    console.log(users);
}), function(error){
    console.log(error);
}

return users
};
   

return factory;

}])