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

var req = {
        url: '/auth',
        skipAuthorization: true,
        method: 'POST',
        data: credentials
        };

	return {}
}
   

return factory;

}])