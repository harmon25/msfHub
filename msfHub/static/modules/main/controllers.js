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


$scope.people = [
    { name: 'Adam',      email: 'adam@email.com',      age: 10 },
    { name: 'Amalie',    email: 'amalie@email.com',    age: 12 },
    { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30 },
    { name: 'Samantha',  email: 'samantha@email.com',  age: 31 },
    { name: 'Estefanía', email: 'estefanía@email.com', age: 16 },
    { name: 'Natasha',   email: 'natasha@email.com',   age: 54 },
    { name: 'Nicole',    email: 'nicole@email.com',    age: 43 },
    { name: 'Adrian',    email: 'adrian@email.com',    age: 21 }
];


        
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
    ['$scope','$rootScope','LxDialogService','UserFactory', 'filterFilter',
    function ($scope, $rootScope, LxDialogService, UserFactory, filterFilter) {
    UserFactory.getUsers();
    
    $scope.users = UserFactory.data // get the users 

    $scope.addUser = function(user){UserFactory.createUser(user)} // add user dialog action
    $scope.deleteUser = function(user_id){UserFactory.deleteUser(user_id)} // delete user dialog action
    
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

    $scope.openDelDialog = function(dialogId, uid, uname) { 
        $scope.userToDelete = uid // set that UID to a scope variable
        $scope.usernameToDelete = uname // set that UID to a scope variable
        LxDialogService.open(dialogId); };
}])

.controller('ProfileController',
    ['$scope','$rootScope', 
    function ($scope, $rootScope) {


}]);