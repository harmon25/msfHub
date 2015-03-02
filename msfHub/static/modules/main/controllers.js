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

    $scope.opendDialog = function(dialogId)
    {
    LxDialogService.open(dialogId);
    };

    }])


.controller('UsersController',
    ['$scope','$rootScope','LxDialogService','userListFactory',
    function ($scope, $rootScope, LxDialogService, userListFactory) {

    $scope.createUser = {
         admin: false, 
         user: false 
        };

    $scope.editUser = {
        admin: false, 
         user: false 
    };
    $scope.delUser = {};

    $scope.users = userListFactory.getUsers()

    $scope.openEditDialog = function(dialogId, event)
    {
     var target = angular.element(event.target).parent();
    console.log(target.attr("id"))
    LxDialogService.open(dialogId);
    

    };
    
    $scope.openAddDialog = function(dialogId)
    {
    LxDialogService.open(dialogId);
    };


    $scope.openDelDialog = function(dialogId, event)
    {
    var target = angular.element(event.target).parent();
    console.log(target.attr("id"))
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