'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Main', []);

angular.module('msfHub', [
    'Authentication',    // msfHub Auth module
    'Main',              // msfHub Main Module
    'ui.router',         // ui-router
    'ngCookies',         // angular-cookies - may replace with local storage
    'angular-jwt',       // for client side JWT
    'ngResource',        // maybe to get resources..
    'ngMaterial',        // for material design - may use just Lumx
    'lumx',              // for material design
    'ngSanitize',        // for markdown
    'btford.markdown'    // markdown directive

])

.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
  guest: 'guest',
  admin: 'admin',
  user: 'user'
})


.run(['$rootScope', '$state','$urlRouter','AuthService','AUTH_EVENTS','$cookieStore','$http',
    function ($rootScope, $state, $urlRouter, AuthService, AUTH_EVENTS, $cookieStore, $http) {

    $rootScope.state = $state;

    $rootScope.currentUser = $cookieStore.get('currentUser') || { name: 'anon',
                                                                  roles: 'guest',
                                                                  token: ''
                                                                  };

    }])

.config(['$stateProvider','$urlRouterProvider','USER_ROLES','jwtInterceptorProvider','$httpProvider', function ($stateProvider,$urlRouterProvider, USER_ROLES, jwtInterceptorProvider, $httpProvider) {

    jwtInterceptorProvider.tokenGetter = ['Session', function(Session){
    return Session.getToken();
    }];

    $httpProvider.interceptors.push('jwtInterceptor');

    $urlRouterProvider.otherwise("/");
    
     $stateProvider

      .state('login', {
            url:'/',
            controller: 'LoginController',
            templateUrl: '/views/login',
            data: {authorizedRoles: [USER_ROLES.user, USER_ROLES.guest]}
        })
        .state('home', {
            url:'/home',
            controller: 'HomeController',
            data: {authorizedRoles: [USER_ROLES.user, USER_ROLES.admin]},
            templateUrl: '/views/home'
         })
        .state('about', {
            url:'/about',
            controller: 'HomeController',
            data: {authorizedRoles: [USER_ROLES.user, USER_ROLES.admin]},
            templateUrl: '/views/about'
        })

        .state('reports', {
            url:'/reports',
            controller: 'ReportsController',
            data: {authorizedRoles: [USER_ROLES.admin]},
            templateUrl: '/views/reports'
        })
        
        .state('private', {
            url:'/private',
            controller: 'HomeController',
            data: {authorizedRoles: [USER_ROLES.admin]},
            templateUrl: '/views/private'
        })
        


}])

