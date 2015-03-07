'use strict';

angular.module('eShopApp').controller('AboutCtrl',
    function($scope,$controller, $routeParams, events, messaging, slider) {

      $controller('MainCtrl',{$scope: $scope});

      $scope.publish(events.message. _GET_PRODUCT_BY_ID_, [{id:$routeParams.id}]);

      var renderProduct = function(result){
        $scope.product = result[0];
        $scope.slider = slider($scope.product.images.length);
      };

      $scope.subscribe(events.message._GET_PRODUCT_BY_ID_COMPLETE_,renderProduct);

     $scope.showCart = function(){
       $scope.publish(events.message. _SHOW_SHOPPING_CART_,[$scope.product]);
     };


//messaging.publish(events.message._ADD_ERROR_MESSAGE_,['Невозможно отобразить товар','alert.warning']);
   //  messagin.subscribe(events.message._GET_PRODUCT_BY_ID_COMPLETE_,fail);
 //     messaging.subscribe(events.message._GET_PRODUCT_BY_ID_,startReq);



});
