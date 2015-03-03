'use strict';

angular.module('Main')

.controller('LayoutController',
    ['$scope','$rootScope','USER_ROLES','LxDialogService','$timeout','AuthService', 'AUTH_EVENTS',
    function ($scope, $rootScope, USER_ROLES, LxDialogService, $timeout, AuthService, AUTH_EVENTS) {

    $scope.renewSession = function(credentials){AuthService.login(credentials)};

    }])

.controller('HomeController',
    ['$scope','$rootScope', 
    function ($scope, $rootScope) {
        
}])

.controller('ReportsController',
    ['$scope','$rootScope','LxDialogService', 
    function ($scope, $rootScope, LxDialogService) {

    $scope.viewReport = function(dialogId)
    {
    LxDialogService.open(dialogId);
    };

    }])


.controller('AdminController',
    ['$scope','$rootScope',
    function ($scope, $rootScope) {

}])

.controller('UsersController',
    ['$scope','$rootScope','LxDialogService','userListFactory','UserService', 'filterFilter',
    function ($scope, $rootScope, LxDialogService, userListFactory, UserService, filterFilter) {

    $scope.users = userListFactory.getUsers() // get the users 

    $scope.addUser = function(user){UserService.createUser(user)} // add user dialog action
    $scope.deleteUser = function(user_id){UserService.deleteUser(user_id)} // delete user dialog action
    
    // role list to manage selected roles for create user dialog
    $scope.newuserRoles = [
         {name: 'Admin', id: 'addUserRole0', selected: false},
         {name: 'User', id: 'addUserRole1', selected: false}
        ];

    $scope.newUser = {
        username: null,
        password: null,
        roles: []
    };

    // handle selected roles, returned the selected roles
    $scope.selectedNewRoles = function selectedNewRoles() {
    return filterFilter($scope.newuserRoles, { selected: true });
    };

    // watch for selected roles changing and append it to new user roles array
    $scope.$watch('newuserRoles|filter:{selected:true}', function (nv) {
    $scope.newUser.roles = nv.map(function (role) {
        return role.name;
        });
    }, true);
 
    // dialog functions
    $scope.openAddDialog = function(dialogId) {
        LxDialogService.open(dialogId); };

    $scope.openDelDialog = function(dialogId, event) { 
        var target = angular.element(event.target).parent(); // get uid of selected element 
        $scope.userToDelete = target.attr("uid") // set that UID to a scope variable
        LxDialogService.open(dialogId); };
}])

.controller('ProfileController',
    ['$scope','$rootScope', 
    function ($scope, $rootScope) {


}]);