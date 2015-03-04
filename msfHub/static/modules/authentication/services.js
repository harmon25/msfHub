'use strict';

angular.module('Authentication')

.factory('AuthService',
    ['$http', '$rootScope','SessionFactory','AUTH_EVENTS','$state','LxNotificationService',
    function ($http, $rootScope, SessionFactory, AUTH_EVENTS, $state, LxNotificationService) {
       var authService = {};

    authService.login = function (credentials) {

    var req = {
        url: '/auth',
        skipAuthorization: true,
        method: 'POST',
        data: credentials
        };

    return $http(req).success(function (response) {
       LxNotificationService.success(AUTH_EVENTS.loginSuccess);
       var newToken = response.token
       SessionFactory.createSession(newToken);
       $rootScope.currentUser = SessionFactory.session
       $http.defaults.headers.common['Authorization'] = 'Bearer ' + newToken; // jshint ignore:line
       $state.go('home');
      }).error( function (data){
        LxNotificationService.warning(data);
      });
  };

  authService.isAuthenticated = function () {
    return !!!SessionFactory.session.UserToken == null;
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

.factory('SessionFactory',
['$rootScope', 'localStorageService', 'jwtHelper', function ($rootScope, localStorageService, jwtHelper) {
var SessionFactory = {

  session: {username: "",
            roles: ['guest'],
            workspace: "",
            expired: false,
            UserToken: null },

  checkLocalToken: function () {
      if (localStorageService.get('token') != null ) {
        console.log('we got a token')
      SessionFactory.session.UserToken = localStorageService.get('token')
    } else {
        console.log('we dont have a token')
         SessionFactory.session.UserToken = null
    }; 
  },

  checkTokenExpiry: function(token) {
    var expDate = jwtHelper.getTokenExpirationDate(token);
    var isExpired = jwtHelper.isTokenExpired(token);
    $rootScope.currentUser.expired = isExpired;
  },

  createSession: function(token) {
    localStorageService.add('token', token);
    var tokenPayload = jwtHelper.decodeToken(token);
    SessionFactory.session.username = tokenPayload.user_name;
    SessionFactory.session.roles = tokenPayload.roles;
    SessionFactory.session.workspace = tokenPayload.workspace;
    SessionFactory.session.UserToken = token;

  
  },
 
  destroySession: function () {
    localStorageService.clearAll();
    SessionFactory.session.username = 'anon';
    SessionFactory.session.roles = ['guest'];
    SessionFactory.session.workspace = '';
    SessionFactory.session.UserToken = null;
    SessionFactory.session.expired = false;
    $rootScope.currentUser = SessionFactory.session;
     }
};
  return SessionFactory;
}]);

