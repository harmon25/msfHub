'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$scope', 'LxNotificationService', 'SessionFactory','AuthService',
    function ($scope, LxNotificationService, SessionFactory, AuthService) {
    
    SessionFactory.destroySession()
    
    $scope.credentials = {
                    username: '',
                    password: '' }

    $scope.login = function(credentials){AuthService.login(credentials)};
    
    }])

