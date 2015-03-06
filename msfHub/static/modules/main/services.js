'use strict';

angular.module('Main')

.factory('UserFactory',
['$http','LxNotificationService', function userListFactory($http,LxNotificationService){
var UserFactory = {

    data: {
        users: []
    },

    getUsers : function(){
        var req = {
            url: '/api/users',
            method: 'GET'
            };

        $http(req).success(function (data) {
            UserFactory.data.users = data;
        }).error ( function (error) {
            console.log(error)
         });
    },

    createUser : function(User){
       var req = {url: '/api/users',
                 method: 'POST',
                 data: User
                 };

        $http(req).success(function (response) {
            UserFactory.getUsers();
            console.log(response);
            LxNotificationService.success(response.message);
        }).error ( function (data) {
            LxNotificationService.warning(data.message);
        });     
    },

    deleteUser : function(user_id){
        var req = {
                url: '/api/users',
                method: 'DELETE',
                data: {id: user_id},
                headers: {'Content-Type': 'application/json'}
                };

        $http(req).success(function (response){
            UserFactory.getUsers();
            console.log(response);
            LxNotificationService.success(response.message);
        }).error ( function (error){
            LxNotificationService.warning(error.message);
         });       
    }
};
return UserFactory;
}])


.factory('ExploitFactory',
['$http','LxNotificationService', function userListFactory($http, LxNotificationService){
var ExploitFactory= {

    data: {
        exploits: []
    },

    getExploits : function(){
        var req = {
            url: '/api/exploits',
            method: 'GET'
            };

        $http(req).success(function (response) {
            ExploitFactory.data.exploits = response.exploitsObj;
        }).error ( function (error) {
        
         });
    }

};
return ExploitFactory;
}]);
