'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$scope', 'LxNotificationService', 'SessionFactory','AuthService',
    function ($scope, LxNotificationService, SessionFactory, AuthService) {
    var LgnCtrl = this;

    SessionFactory.destroySession()
    

    LgnCtrl.credentials = {
                    username: '',
                    password: '' }

   LgnCtrl.login = function(credentials){AuthService.login(credentials)};
    
    }])

