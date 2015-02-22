'use strict';

angular.module('Authentication')

.factory('AuthService',
    ['$http', '$rootScope','Session','AUTH_EVENTS','$state','LxNotificationService','decodeToken',
    function ($http, $rootScope, Session, AUTH_EVENTS, $state, LxNotificationService, decodeToken) {
       var authService = {};

    authService.login = function (credentials) {

    var req = {
        url: '/auth',
        skipAuthorization: true,
        method: 'POST',
        data: credentials
        };

    return $http(req)
      .then(function (res) {
       $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
       console.log(AUTH_EVENTS.loginSuccess)
       var newToken = res.data.token
       var user = decodeToken.decode(newToken);
       console.log(user.name, user.roles, newToken);
       Session.create(user.name, user.roles, newToken);
       $http.defaults.headers.common['Authorization'] = 'Bearer ' + newToken; // jshint ignore:line
       $state.go('home');
      }, function(error){
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        console.log(AUTH_EVENTS.loginFailed)
        LxNotificationService.warning(error.statusText);
      });
  };

  authService.isAuthenticated = function () {
    return !!Session.getToken();
  };
 
  authService.isAuthorized = function (authorizedRoles, userRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    };
    if (!angular.isArray(userRoles)) {
      userRoles = [userRoles];
    };

      var Authorized = false;
      for (var i = userRoles.length - 1; i >= 0; i--) {
          var  r = userRoles[i]
        if (authorizedRoles.indexOf(r) >= 0) {
          Authorized = true;
          }; 
        };

    return Authorized;
  };
 
  return authService;

    }]);

angular.module('Authentication')

.service('decodeToken',
['localStorageService', 'jwtHelper', function (localStorageService, jwtHelper) {
  var decodeTokenService = {};

  decodeTokenService.decode = function(token){
   var tokenPayload = jwtHelper.decodeToken(token);
   return {
     name: tokenPayload.user_name,
     roles: tokenPayload.roles,
      }
    };

  return decodeTokenService;
}])

.service('Session',
['$rootScope', 'localStorageService', function ($rootScope, localStorageService) {
  this.getToken = function () {
      
      if (!localStorageService.get('token')) {
        return false;
    } else {
           return localStorageService.get('token')
    } };

  this.create = function (userName, userRoles, token) {
    $rootScope.currentUser.name = userName;
    $rootScope.currentUser.roles = userRoles;
    localStorageService.set('token', token);
  };
  
  this.destroy = function () {
    $rootScope.currentUser.name = 'anon';
    $rootScope.currentUser.roles  = ["guest"];
    localStorageService.clearAll();
  };

  return this;
}])

