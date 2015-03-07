angular.module('eShopApp').controller('SearchCtrl',['$scope','$controller','messaging','events',
  function($scope, $controller, messaging, events){

    $controller('MainCtrl',{$scope:$scope});

    $scope.publish(events.message._SHOW_SEARCH_BODY_);

    $scope.hideSearchBody = function(){
      $scope.publish(events.message._HIDE_SEARCH_BODY_);
    };

    var searchProducts = function(products){
      $scope.products = products;
    };
    $scope.subscribe(events.message._GET_PRODUCTS_COMPLETE_, searchProducts);

  }]);
