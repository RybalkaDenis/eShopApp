angular.module('eShopApp').directive('cart',['messaging','events','$animate',
  function(messaging, events, $animate){

  var directiveDefinitionObject = {
    restrict:'E',
    templateUrl:'directive/cart/cart.html',
    replace:true,
    link: function($scope, $elem){

      $scope.showCart = function(result){

        messaging.publish(events.message._SHOW_BODY_SHADOW_);

        $animate.addClass($elem, 'cbp-spmenu-open');
        $animate.addClass(angular.element(document.body), 'cbp-spmenu-push-toright');

        return $scope.cart = result || $scope.cart;
      };


      $scope.hideCart = function(){
        $animate.removeClass($elem,'cbp-spmenu-open');
        $animate.removeClass(angular.element(document.body),'cbp-spmenu-push-toright' );
        $scope.publish(events.message._HIDE_BODY_SHADOW_);
      };

      $scope.removeFromCart = function(index){
          messaging.publish(events.message._REMOVE_FROM_CART_,[index]);
      };

      messaging.subscribe(events.message._SHOW_SHOPPING_CART_,$scope.showCart);
      messaging.subscribe(events.message._HIDE_SHOPPING_CART_,$scope.hideCart);

      $scope.$on('$destroy', function(){
        messaging.unsubscribe($scope.showCart);
        messaging.unsubscribe($scope.hideCart);
      });
      $scope.safeApply();
    }
  };
  return directiveDefinitionObject;
}]);

