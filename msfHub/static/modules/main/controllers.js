'use strict';

angular.module('Main')

.controller('LayoutController',
    ['$scope','$rootScope','USER_ROLES','LxDialogService','AuthService', 'AUTH_EVENTS', '$mdSidenav', '$log','ModuleFactory','LxNotificationService','SessionFactory','$state',
    function ($scope, $rootScope, USER_ROLES, LxDialogService, AuthService, AUTH_EVENTS, $mdSidenav, $log, ModuleFactory,LxNotificationService, SessionFactory, $state) {

    var layoutCtrl = this;

    layoutCtrl.logout = function logout () {
        SessionFactory.destroySession();
        $state.go('login');
        }

    layoutCtrl.renewSession = function(credentials){AuthService.login(credentials)};


      layoutCtrl.toggleLeft = function() {
    $mdSidenav('left').toggle()
                        .then(function(){
                          $log.debug("toggle RIGHT is done");
                        });
  };


  layoutCtrl.searchAll = {
    selected: "",
    loading: false, 
    results: [],
    query: function(newQuery){
        if (newQuery){
            layoutCtrl.loading = true;
            ModuleFactory.searchMods(newQuery);
            layoutCtrl.searchAll.results = ModuleFactory.data.results
        } else {
            layoutCtrl.reults = false;
        }
    },
    toModel: function(data, callback)
    {
        if (data)
        {
            callback(data.name);
        }
        else
        {
            callback();
        }
    },
    toSelection: function(data, callback)
        {
        if (data)
        {
            ModuleFactory.searchMods(data);
            callback(ModuleFactory.results[0])
        }
        else
        {
            callback();
        }
    }
  };

layoutCtrl.cbSelect = {
    exex: function(newVal, OldVal){
        LxNotificationService.notify('Change detected!');
        console.log('oldVal: ', oldVal);
        console.log('newVal: ', newVal);
    }
    };



}])


.controller('ModulePanelController',
    ['$scope','$rootScope','$mdSidenav', '$log','LxNotificationService',
    function ($scope, $rootScope, $mdSidenav, $log, LxNotificationService) {

   
   $scope.close = function() {
    $mdSidenav('left').close()
                        .then(function(){
                          $log.debug("close RIGHT is done");
                        });
  };
   
    $scope.readyCB = function() {
        $log.info('ready called');
        $log.log("Tree instance = " + $scope.treeInstance);  
    };

   $scope.treeData = [
            { id : 'expTree', parent : '#', text : 'Exploits', state: { opened: false} },
            { id : 'auxTree', parent : '#', text : 'Auxiliary', state: { opened: false} },
            { id : 'postTree', parent : '#', text : 'Post', state: { opened: false} },
            { id : 'PayloadTree', parent : '#', text : 'Payloads', state: { opened: false}}
        ];

    $scope.treeConfig = {
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
                '#': {
                     "max_depth" : 4
                },
                default : {
                    icon : 'mdi mdi-folder'
                },
                'root' : {
                    icon : 'mdi mdi-folder-outline'
                },
                cloud : {
                    icon : 'mdi mdi-close'
                }
            },
            version : 1,
            plugins : ['types','unique']
        };

 $scope.treeInstanceDemo = function() {
            var selectedNode = $scope.treeInstance.jstree(true).get_selected();
             LxNotificationService.warning('Selected node id is ' + selectedNode);
         };
      
}])

.controller('DashController',
    ['$scope','$rootScope', 'ModuleFactory', '$q','LxNotificationService','$http',
    function ($scope, $rootScope, ModuleFactory, $q, LxNotificationService, $http) {
var DashCtrl = this;

DashCtrl.modules = querySearch();
DashCtrl.selectedItem  = null;
DashCtrl.searchText    = null;
DashCtrl.querySearch = querySearch;

function querySearch (query) {
    ModuleFactory.searchMods(query);
    var results = ModuleFactory.data.results
    console.log(results)
      return results;
    }  
      
}])

.controller('ReportsController',
    ['$scope','$rootScope','LxDialogService', 
    function ($scope, $rootScope, LxDialogService) {
    var RprtsCtrl = this;
    
    RprtsCtrl.viewReport = function(dialogId)
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