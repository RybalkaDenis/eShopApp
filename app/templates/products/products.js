angular.module('eShopApp').controller('ProductCtrl', function($controller, $scope, messaging, events, awesomeCache){
  $controller('MainCtrl',{$scope: $scope});

 //messaging.publish(events.message._GET_PRODUCTS_) ;


  $scope.products =  awesomeCache.get('getProducts') || [];

  var init = function(result){
    $scope.quantity = result.length;
    messaging.publish(events.message._PAGINATION_GO_TO_FIRST_PAGE_,[result,$scope.perPage]);
    return $scope.products = result;
  };

  var renderProducts = function(result){
   $scope.render = result;
    console.log(result);
  };

  var fail = function(){
    console.log('fail');
  } ;

  messaging.subscribe(events.message._GET_PRODUCTS_COMPLETE_, init);
  messaging.subscribe(events.message. _GET_PRODUCTS_FAILED_, fail);
  messaging.subscribe(events.message._RENDER_GOODS_, renderProducts);


  $scope.predicate = 'price';
  $scope.perPage = 6;

  $scope.$watch('perPage',function(){
    messaging.publish(events.message._GET_PRODUCTS_);
  });




}).controller('BaseCtrl',function(){});
