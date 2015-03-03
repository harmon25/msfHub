'use strict';

angular.module('Main')

.factory('userListFactory',
['$http', function userListFactory($http){
var factory = {};

factory.getUsers = function(){

var users = {users:null}
var req = {
        url: '/api/users',
        method: 'GET'
        };

$http(req).success(function (data) {
    users.users = data;
}), function(error){
    console.log(error);
}

return users
};
   

return factory;

}])

.service('UserService',
['$http','LxNotificationService','$state','LxDialogService', function ($http, LxNotificationService, LxDialogService, $state){
var service = {};

    service.createUser = function(User){
            
            var req = {url: '/api/users',
                       method: 'POST',
                       data: User
                       };

            $http(req).success(function (response) {
                console.log(response);
                LxNotificationService.success(response.message);
            }).error ( function (data) {
                LxNotificationService.warning(data.message);
             });
        };

    service.deleteUser = function(user_id){
        var req = {
                url: '/api/users',
                method: 'DELETE',
                data: {id: user_id},
                headers: {'Content-Type': 'application/json'}
                };

        $http(req).success(function (response){
                console.log(response);
                 LxNotificationService.success(response.message);
            }).error ( function (error){
                 LxNotificationService.warning(error.message);
            })

        };

    return service;

}])
