angular.module('eShopApp').controller('AdminCtrl', ['$scope','$controller','$location','$route',
function($scope, $controller, $location, $route){

  $controller('MainCtrl', {$scope:$scope});

  console.log('Hello From Adm Ctrl');
  $scope.adminCtrl = 'Hello from admin';
  if(!$scope.myUser) {
    $location.path('/home');
  }else{
    if(!$scope.myUser.UserIsAdmin){
      $location.path('/home');
    }
  }
}]);
