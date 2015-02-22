'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$scope', '$rootScope', 'LxNotificationService', 'AUTH_EVENTS', 'LxDialogService','AuthService','Session',
    function ($scope, $rootScope, LxNotificationService, AUTH_EVENTS, LxDialogService, AuthService, Session) {
    Session.destroy()
    $scope.credentials = {
                    username: '',
                    password: '' }

    $scope.login = function(credentials){AuthService.login(credentials)};
    
    $scope.opendDialog = function(dialogId)
    {
    LxDialogService.open(dialogId);
    };


    }])

