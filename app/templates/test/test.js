angular.module('eShopApp').controller('TestCtrl',[ 'messaging','events','$scope','$controller','$cookieStore','awesomeCache',
  function(messaging,events,$scope, $controller, $cookieStore, awesomeCache){
  $controller('MainCtrl',{$scope: $scope});



    $scope.my = awesomeCache.get('getProducts');
  //  $scope.my = cache.get('getProducts');





   //$cookieStore.put('id','value');

    $scope.myCook = $cookieStore.get('id');
}]);
