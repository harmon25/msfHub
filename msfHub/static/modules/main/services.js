'use strict';

angular.module('Main')


.service('openLogin',
['$scope','LxDialogService', function ($scope, LxDialogService){
var self = this;
$scope.openDialog = function(dialogId)
    {
    LxDialogService.open(dialogId);
    };

 $scope.closeDialog = function()
    {
    LxDialogService.close(dialogId);
    };


}])