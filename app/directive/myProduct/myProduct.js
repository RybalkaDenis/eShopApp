angular.module('eShopApp').directive('product',function(){
  return{
    restrict:'E',
    templateUrl:'directive/myProduct/myProduct.html',
    replace:true
  };
});
