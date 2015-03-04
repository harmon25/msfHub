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
    'btford.markdown'   // markdown directive
])

.constant('AUTH_EVENTS', {
  loginSuccess: 'Logged In!',
  loginFailed: 'Login Failed!',
  logoutSuccess: 'Logged Out!',
  sessionTimeout: 'Your sessions token has expired!',
  notAuthenticated: 'You are not Authenticated!',
  notAuthorized: 'You are not Allowed!'
})

.constant("USER_ROLES", {
  guest: "guest",
  admin: "admin",
  user: "user"
})


.run(['$rootScope', '$state','$urlRouter','AuthService','AUTH_EVENTS','SessionFactory','$http','LxNotificationService','LxDialogService', 
    function ($rootScope, $state, $urlRouter, AuthService, AUTH_EVENTS, SessionFactory, $http, LxNotificationService, LxDialogService) {
    SessionFactory.checkLocalToken();
    var token = SessionFactory.session.UserToken
    console.log(token)

    $rootScope.state = $state;

    if (SessionFactory.session.UserToken == null) {
      $rootScope.currentUser = SessionFactory.session
      $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
    } else {
      SessionFactory.checkLocalToken();
      var token = SessionFactory.session.UserToken
      console.log(token)
      SessionFactory.createSession(token);
      $rootScope.currentUser = SessionFactory.session
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // jshint ignore:line
    }

    $rootScope.$on('$stateChangeStart', function (event, next) {
    SessionFactory.checkLocalToken();
     var token = SessionFactory.session.UserToken
      console.log(token)
    
    if (SessionFactory.session.UserToken != null) {
        var token = SessionFactory.session.UserToken
        SessionFactory.checkTokenExpiry(token);
        SessionFactory.createSession(token);
        $rootScope.currentUser = SessionFactory.session
      };
    var authorizedRoles = next.data.authorizedRoles;
    $rootScope.currentUser = SessionFactory.session
    var user_roles = $rootScope.currentUser.roles
     if (AuthService.isAuthenticated() && SessionFactory.session.expired) {
      event.preventDefault();
      //sesion token has expired
        LxDialogService.open("loginDialog");
      } else if (!AuthService.isAuthorized(authorizedRoles, user_roles)) {
      LxNotificationService.warning(AUTH_EVENTS.notAuthorized);
      event.preventDefault();
        // user is not allowed
      }; 
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
            data: {authorizedRoles: [USER_ROLES.user],
                    title: 'msfHub · Home'},
            templateUrl: '/views/home'
         })

        .state('about', {
            url:'/about',
            controller: 'HomeController',
            data: {authorizedRoles: [USER_ROLES.user],
                    title: 'msfHub · About'},
            templateUrl: '/views/about'
        })
        
        .state('hosts', {
            url:'/hosts',
            controller: 'DbController',
            data: {authorizedRoles: [USER_ROLES.user],
                title: 'msfHub · Hosts'},
            templateUrl: '/views/hosts'
        })

        .state('services', {
            url:'/services',
            controller: 'DbController',
            data: {authorizedRoles: [USER_ROLES.user],
                title: 'msfHub · Services'},
            templateUrl: '/views/services'
        })

        .state('reports', {
            url:'/reports',
            controller: 'ReportsController',
            data: {authorizedRoles: [USER_ROLES.admin],
                title: 'msfHub · Reports'},
            templateUrl: '/views/reports'
        })
        
        .state('admin', {
            abstract: true,
            url:'/admin',
            data: {authorizedRoles: [USER_ROLES.admin],
                title: 'msfHub · Admin'},
            templateUrl: '/views/admin'
        })

        .state('admin.users', {
            url:'/users',
            controller: 'UsersController',
            data: {authorizedRoles: [USER_ROLES.admin],
                title: 'msfHub · Users'},
            templateUrl: '/views/admin/users',
            cache: false
        })
         
         .state('profile', {
            url:'/profile',
            controller: 'ProfileController',
            data: {authorizedRoles: [USER_ROLES.user],
                title: 'msfHub · Profile'},
            templateUrl: '/views/profile'
        })
        


}])

