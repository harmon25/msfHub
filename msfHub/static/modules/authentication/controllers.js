'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$scope', 'LxNotificationService', 'LxDialogService','SessionFactory','AuthService',
    function ($scope, LxNotificationService, LxDialogService, SessionFactory, AuthService) {
    
    SessionFactory.destroySession()
    
    $scope.credentials = {
                    username: '',
                    password: '' }

    $scope.login = function(credentials){AuthService.login(credentials)};
    
    $scope.opendDialog = function(dialogId)
    {
    LxDialogService.open(dialogId);
    };


    }])

