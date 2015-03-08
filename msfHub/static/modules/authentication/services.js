'use strict';

angular.module('Authentication')

.factory('AuthService',
    ['$http', '$rootScope','SessionFactory','AUTH_EVENTS','$state','LxNotificationService',
    function ($http, $rootScope, SessionFactory, AUTH_EVENTS, $state, LxNotificationService) {
var AuthService = {

    login: function (credentials) {

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
       //set header to subsequent requests with the token
       $http.defaults.headers.common['Authorization'] = 'Bearer ' + newToken; // jshint ignore:line
       $state.go('dashboard');
      }).error( function (data){
        LxNotificationService.warning(data);
      });
      },

    isAuthenticated: function () {
      //yea if you have a token you are authenticated...doesnt mean your requests will work though
      var authenticated = false;
      if ( $rootScope.currentUser.UserToken != null){
         authenticated = true;
          } 
      return authenticated;
    },
 
    isAuthorized: function (authorizedRoles, userRoles) {
    //make sure user roles and the authorized roles are represented as a list
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    };
    if (!angular.isArray(userRoles)) {
      userRoles = [userRoles];
    };
    //set bool to represent authorized
    var Authorized = false;
    //loop over user roles, match each vs authorized roles, if and role matches - bool above is true
      for (var i = userRoles.length - 1; i >= 0; i--) {
            var  r = userRoles[i]
            if (authorizedRoles.indexOf(r) >= 0) {
                Authorized = true;
               }; 
             };
    //return bool to represent if user is authorized for a view
       return Authorized;
        }
}; // end of AuthService object
return AuthService;

    }]);

angular.module('Authentication')

.factory('SessionFactory',
['$rootScope', 'localStorageService', 'jwtHelper', function ($rootScope, localStorageService, jwtHelper) {
// terrible security really - without haveing jwt on the server side, this is pretty unsafe..
var SessionFactory = {

  session: {username: "",
            roles: ['guest'],
            workspace: "",
            UserToken: null },

  checkLocalToken: function () {
      if (localStorageService.get('token') != null ) {
      SessionFactory.session.UserToken = localStorageService.get('token')
    } else {
         SessionFactory.session.UserToken = null
    }; 
  },

  checkTokenExpiry: function() {
    var token = localStorageService.get('token')
    var expDate = jwtHelper.getTokenExpirationDate(token);
    var isExpired = jwtHelper.isTokenExpired(token);
      return isExpired
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
    $rootScope.currentUser = SessionFactory.session;
     }
};
  return SessionFactory;
}]);

