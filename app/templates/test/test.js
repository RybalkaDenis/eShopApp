angular.module('eShopApp').controller('TestCtrl',[ 'messaging','events','$scope',
  '$controller','$cookieStore','awesomeCache','$location','User','modelTransformer',
  function(messaging,events,$scope, $controller, $cookieStore, awesomeCache, $location, User, modelTransformer){
  $controller('MainCtrl',{$scope: $scope});


   if(!$scope.myUser){
     $location.path('/home')
   }else{
     if($scope.myUser.UserIsAdmin){
       $location.path('/admin')
     }
   }

}]);
