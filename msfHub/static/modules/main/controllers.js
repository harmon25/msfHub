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
    ['$scope','$rootScope', '$cookies',
    function ($scope, $rootScope, $cookies) {
  	

    }])


.controller('ReportsController',
    ['$scope','$rootScope', '$cookies',
    function ($scope, $rootScope, $cookies) {

    }]);
