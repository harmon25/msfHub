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
    if (!AuthService.isAuthorized(authorizedRoles)) {
      //event.preventDefault();
      if (AuthService.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }
  });

/*
    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){ 
 
    if(!$rootScope.currentUser.token){
        //event.preventDefault();
        console.log("you have no token");
        console.log("Go to login")

     } else {
        // not sure what else...
        console.log("You can stay here..")
    }


    }
    
     )
*/	
    }])

.controller('HomeController',
    ['$scope','$rootScope', '$cookies',
    function ($scope, $rootScope, $cookies) {
  	

    }])


.controller('ReportsController',
    ['$scope','$rootScope', '$cookies',
    function ($scope, $rootScope, $cookies) {

    }]);
