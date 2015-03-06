'use strict';

angular.module('Main')

.controller('LayoutController',
    ['$scope','$rootScope','USER_ROLES','LxDialogService','$timeout','AuthService', 'AUTH_EVENTS', '$mdSidenav', '$log',
    function ($scope, $rootScope, USER_ROLES, LxDialogService, $timeout, AuthService, AUTH_EVENTS, $mdSidenav, $log) {

    var layoutCtrl = this;

    layoutCtrl.renewSession = function(credentials){AuthService.login(credentials)};


      layoutCtrl.toggleLeft = function() {
    $mdSidenav('left').toggle()
                        .then(function(){
                          $log.debug("toggle RIGHT is done");
                        });
  };

}])


.controller('ModulePanelController',
    ['$scope','$rootScope','$mdSidenav', '$log',
    function ($scope, $rootScope, $mdSidenav, $log) {
    var mpCtrl = this;


   
   mpCtrl.close = function() {
    $mdSidenav('left').close()
                        .then(function(){
                          $log.debug("close RIGHT is done");
                        });
  };
   


    mpCtrl.treeData = [
            { id : 'ajson1', parent : '#', text : 'Simple root node', state: { opened: false} },
            { id : 'ajson2', parent : '#', text : 'Root node 2', state: { opened: false} },
            { id : 'ajson3', parent : 'ajson2', text : 'Child 1', state: { opened: false} },
            { id : 'ajson4', parent : 'ajson2', text : 'Child 2' , state: { opened: false}}
        ];

    mpCtrl.treeConfig = {
            core : {
                multiple : false,
                animation: false,
                error : function(error) {
                    $log.error('mpCtrl: error from js tree - ' + angular.toJson(error));
                },
                check_callback : true,
                worker : true
            },
            types : {
                default : {
                    icon : 'mdi mdi-folder'
                },
                star : {
                    icon : 'mdi mdi-close'
                },
                cloud : {
                    icon : 'mdi mdi-close'
                }
            },
            version : 1,
            plugins : ['types']
        };




      
}])

.controller('DashController',
    ['$scope','$rootScope', 'ExploitFactory', '$q','LxNotificationService','$http',
    function ($scope, $rootScope, ExploitFactory, $q, LxNotificationService, $http) {
var exploitsList = [];

    ExploitFactory.getExploits();
    console.log(ExploitFactory.data);
    
    $scope.exploitsList =  ExploitFactory.data
    console.log(exploitsList)
   
      
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