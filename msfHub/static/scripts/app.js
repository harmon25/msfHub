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
    'ngAnimate',        // for material design - 
    'lumx',              // for material design
    'ngSanitize',        // for markdown
    'btford.markdown',   // markdown directive
    'ngJsTree'
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

// on each page refresh or app start, run this stuff
.run(['$rootScope', '$state','$urlRouter','AuthService','AUTH_EVENTS','SessionFactory','$http','LxNotificationService','LxDialogService', 
    function ($rootScope, $state, $urlRouter, AuthService, AUTH_EVENTS, SessionFactory, $http, LxNotificationService, LxDialogService) {
    
    //check if the user has a token
    SessionFactory.checkLocalToken();

    $rootScope.state = $state;

    //if there is no token have a guest session 
    if (SessionFactory.session.UserToken == null) {
      $rootScope.currentUser = SessionFactory.session
    } else {
      //you must hae a token check token and set it in session factory
      SessionFactory.checkLocalToken();
      var token = SessionFactory.session.UserToken
      //recreate the existing session
      SessionFactory.createSession(token);
      //set session user to rootScope object
      $rootScope.currentUser = SessionFactory.session
      //set headers again
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // jshint ignore:line
    }


    //on each state change do this stuff
    $rootScope.$on('$stateChangeStart', function (event, next) {  
    if (SessionFactory.session.UserToken != null) {
          console.log(SessionFactory.checkTokenExpiry());
        };
        var authorizedRoles = next.data.authorizedRoles;
        var user_roles = $rootScope.currentUser.roles
        console.log(AuthService.isAuthenticated())
        // if you are authenticated - but your token is expired - shoot a dialog
    if (AuthService.isAuthenticated() && SessionFactory.checkTokenExpiry()) {
         //sesion token has expired
         event.preventDefault();
         LxDialogService.open("loginDialog"); //launch login dialog - lumx service
      // if you are not authorized for the view - get outa town
      } else if (!AuthService.isAuthorized(authorizedRoles, user_roles)) {
          // user is not allowed
           LxNotificationService.warning(AUTH_EVENTS.notAuthorized); //lumx notification servuce
           event.preventDefault();
        }; 
    });

    }])

//config and state definitions 
.config(['$stateProvider','$urlRouterProvider','USER_ROLES','$httpProvider', function ($stateProvider, $urlRouterProvider, USER_ROLES, $httpProvider) {

    $urlRouterProvider.otherwise("/");
    
     $stateProvider

      .state('login', {
            url:'/',
            controller: 'LoginController',
            templateUrl: '/views/login',
            data: {authorizedRoles: [USER_ROLES.user, USER_ROLES.guest],
                    title: 'msfHub · Login' }
        })

        .state('dashboard', {
            url:'/dashboard',
            controller: 'DashController',
            data: {authorizedRoles: [USER_ROLES.user],
                    title: 'msfHub · Dashboard'},
            templateUrl: '/views/dash'
         })

        .state('about', {
            url:'/about',
            controller: 'DashController',
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

