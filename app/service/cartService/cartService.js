angular.module('eShopApp').service('cartService', ['messaging', 'events', function(messaging,events){
  var cart = [];

  var addToCart = function(product){
    if(_isInCart(cart, product)) {
      cart.push(product);
      messaging.publish(events.message._SHOW_SHOPPING_CART_, [cart]);
    }else{
      console.log('cart exception');
    }
  };  messaging.subscribe(events.message._ADD_TO_CART_,addToCart);

  var _isInCart = function(cart, product){
    var isPresent = true;
    angular.forEach(cart, function(value){

      if(angular.equals(value, product)||angular.isUndefined(product)){
        isPresent = false;
      }else{
        messaging.publish(events.message._CLEAR_CART_);
      }
    });
    return isPresent;
  };


  var removeFromCart = function(index){
      cart.splice(index, 1);
  };
  messaging.subscribe(events.message._REMOVE_FROM_CART_,removeFromCart);


  var clearCart = function(){
      cart = [];
  };
  messaging.subscribe(events.message._CLEAR_CART_,clearCart);


  var init = function() {
    cart = [];
  };

  var cartService = {
    init:init,
    addToCart:addToCart,
    removeFromCart:removeFromCart,
    clearCart:clearCart
  };
  return cartService;
}]);
