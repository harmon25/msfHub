'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$scope', 'LxNotificationService', 'LxDialogService','Session','AuthService',
    function ($scope, LxNotificationService, LxDialogService, Session, AuthService) {
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

