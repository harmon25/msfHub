'use strict';

angular.module('Main')

.controller('LayoutController',
    ['$scope','$rootScope','USER_ROLES','LxDialogService','$timeout','AuthService', 'AUTH_EVENTS',
    function ($scope, $rootScope, USER_ROLES, LxDialogService, $timeout, AuthService, AUTH_EVENTS) {

	$scope.opendDialog = function(dialogId)
    {
    LxDialogService.open(dialogId);
    };

    $scope.closeDialog = function()
    {
    LxDialogService.close(dialogId);
    };
    



    }])

.controller('HomeController',
    ['$scope','$rootScope', 
    function ($scope, $rootScope) {
  	

    }])


.controller('ReportsController',
    ['$scope','$rootScope','LxDialogService', 
    function ($scope, $rootScope, LxDialogService) {



    $scope.opendDialog = function(dialogId)
    {
    LxDialogService.open(dialogId);
    };

    }])


.controller('AdminController',
    ['$scope','$rootScope','LxDialogService',
    function ($scope, $rootScope, LxDialogService, userListFactory) {

   
    
    $scope.friends = [
    {name:'John', age:25, gender:'boy'},
    {name:'Jessie', age:30, gender:'girl'},
     {name:'Johanna', age:28, gender:'girl'},
    {name:'Joy', age:15, gender:'girl'},
    {name:'Mary', age:28, gender:'girl'},
    {name:'Peter', age:95, gender:'boy'},
    {name:'Sebastian', age:50, gender:'boy'},
    {name:'Erika', age:27, gender:'girl'},
    {name:'Patrick', age:40, gender:'boy'},
    {name:'Samantha', age:60, gender:'girl'}
    ]

    $scope.opendDialog = function(dialogId)
    {
    LxDialogService.open(dialogId);
    };

    }])


.controller('UsersController',
    ['$scope','$rootScope','LxDialogService','userListFactory',
    function ($scope, $rootScope, LxDialogService, userListFactory) {

    $scope.users = userListFactory.getUsers()

    
    $scope.opendDialog = function(dialogId)
    {
    LxDialogService.open(dialogId);
    };

    }])



.controller('ProfileController',
    ['$scope','$rootScope','LxDialogService', 
    function ($scope, $rootScope, LxDialogService) {



    $scope.opendDialog = function(dialogId)
    {
    LxDialogService.open(dialogId);
    };

    }]);