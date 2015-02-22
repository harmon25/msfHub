'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Main', []);

angular.module('msfHub', [
    'Authentication',    // msfHub Auth module
    'Main',              // msfHub Main Module
    'ui.router',         // ui-router
    'LocalStorageModule', // local-storage..may remove cookies completly 
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

.constant("USER_ROLES", {
  guest: "guest",
  admin: "admin",
  user: "user"
})


.run(['$rootScope', '$state','$urlRouter','AuthService','AUTH_EVENTS','Session','decodeToken', 'localStorageService','$http',
    function ($rootScope, $state, $urlRouter, AuthService, AUTH_EVENTS, Session, decodeToken, localStorageService, $http) {

    $rootScope.state = $state;

    if (!Session.getToken()) {
      $rootScope.currentUser = {name: "anon", roles: ["guest"]}
    } else {
      $rootScope.currentUser = {};
      var currentToken = localStorageService.get('token');
      $rootScope.currentUser = decodeToken.decode(currentToken)
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + currentToken; // jshint ignore:line
    }

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
        $state.go('login');
      }
    }
  });



    }])

.config(['$stateProvider','$urlRouterProvider','USER_ROLES','jwtInterceptorProvider','$httpProvider', function ($stateProvider, $urlRouterProvider, USER_ROLES, $httpProvider) {

    $urlRouterProvider.otherwise("/");
    
     $stateProvider

      .state('login', {
            url:'/',
            controller: 'LoginController',
            templateUrl: '/views/login',
            data: {authorizedRoles: [USER_ROLES.user, USER_ROLES.guest],
                    title: 'msfHub · Login' }
        })
        .state('home', {
            url:'/home',
            controller: 'HomeController',
            data: {authorizedRoles: [USER_ROLES.user, USER_ROLES.admin],
                    title: 'msfHub · Home'},
            templateUrl: '/views/home'
         })
        .state('about', {
            url:'/about',
            controller: 'HomeController',
            data: {authorizedRoles: [USER_ROLES.user, USER_ROLES.admin],
                    title: 'msfHub · About'},
            templateUrl: '/views/about'
        })

        .state('reports', {
            url:'/reports',
            controller: 'ReportsController',
            data: {authorizedRoles: [USER_ROLES.user],
                title: 'msfHub · Reports'},
            templateUrl: '/views/reports'
        })
        
        .state('admin', {
            abstract: true,
            url:'/admin',
            controller: 'AdminController',
            data: {authorizedRoles: [USER_ROLES.admin],
                title: 'msfHub · Admin'},
            templateUrl: '/views/admin'
        })

        .state('admin.editusers', {
            url:'/editusers',
            controller: 'AdminController',
            data: {authorizedRoles: [USER_ROLES.admin],
                title: 'msfHub · Edit Users'},
            templateUrl: '/views/admin/users'
        })
         
         .state('profile', {
            url:'/profile',
            controller: 'ProfileController',
            data: {authorizedRoles: [USER_ROLES.user],
                title: 'msfHub · Profile'},
            templateUrl: '/views/profile'
        })
        


}])

