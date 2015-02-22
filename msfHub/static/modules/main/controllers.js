'use strict';

angular.module('Main')

.controller('LayoutController',
    ['$scope','$rootScope','USER_ROLES','LxDialogService','$state', '$stateParams','$timeout','AuthService', 'AUTH_EVENTS',
    function ($scope, $rootScope, USER_ROLES, LxDialogService, $state, $stateParams, $timeout, AuthService, AUTH_EVENTS) {

	$scope.opendDialog = function(dialogId)
    {
    LxDialogService.open(dialogId);
    };

    $scope.closeDialog = function()
    {
    LxDialogService.close(dialogId);
    };
    
    $rootScope.$on('$stateChangeStart', function (event, next) {
    var authorizedRoles = next.data.authorizedRoles;
    console.log(authorizedRoles);
    var user_roles = $rootScope.currentUser.roles
    console.log(user_roles);
    console.log(AuthService.isAuthorized(authorizedRoles, user_roles))
    if (!AuthService.isAuthorized(authorizedRoles, user_roles)) {
      console.log("prevent state change");
      event.preventDefault();
      if (AuthService.isAuthenticated()) {
        // user is not allowed
        console.log(AUTH_EVENTS.notAuthorized);
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        console.log(AUTH_EVENTS.notAuthenticated);
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }
  });


    }])

.controller('HomeController',
    ['$scope','$rootScope', '$cookies',
    function ($scope, $rootScope, $cookies) {
  	

    }])


.controller('ReportsController',
    ['$scope','$rootScope', '$cookies',
    function ($scope, $rootScope, $cookies) {

    }]);
