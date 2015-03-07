angular.module('eShopApp').factory('awesomeCache', ['$cacheFactory',function($cacheFactory){
  return $cacheFactory('awesome-cache');
}]);
