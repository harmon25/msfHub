'use strict';

angular.module('Authentication')

.factory('AuthService',
    ['$http', '$rootScope','Session','jwtHelper','AUTH_EVENTS','$state','LxNotificationService',
    function ($http, $rootScope, Session, jwtHelper,AUTH_EVENTS, $state, LxNotificationService) {
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
       var tokenPayload = jwtHelper.decodeToken(res.data.token);
       Session.create(res.data.token,tokenPayload.user_name,tokenPayload.roles);
       $http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token; // jshint ignore:line
       $state.go('home');
      }, function(error){
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        console.log(AUTH_EVENTS.loginFailed)
        LxNotificationService.warning(error.statusText);
      });
  };

  authService.isAuthenticated = function () {
    return !!$rootScope.currentUser.token;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authorizedRoles.indexOf(Session.userRoles) !== -1);
  };
 
  return authService;

    }]);

angular.module('Authentication')


.service('Session',
['$rootScope','$cookieStore','$http', function ($rootScope, $cookieStore) {
  this.getToken = function () {
     var currentUser = function(){
        if ($cookieStore.get('currentUser')) {

        return currentUser.token;

        } else {
            $rootScope.currentUser.token = null
        }
    }
     return currentUser()
  };

  this.create = function (userToken, userName, userRoles) {
    $rootScope.currentUser.name = userName;
    $rootScope.currentUser.roles = userRoles;
    $rootScope.currentUser.token = userToken;
    $cookieStore.put('currentUser', $rootScope.currentUser);
  };
  this.destroy = function () {
    $rootScope.currentUser.name = '';
    $rootScope.currentUser.roles  = 'guest';
    $rootScope.currentUser.token = '';
    $cookieStore.remove('currentUser');
  };
}]);

