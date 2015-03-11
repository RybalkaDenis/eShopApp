'use strict';

angular.module('eShopApp', [
    'ngAnimate',
  'ngCookies',
  'ngLodash',
    'ngResource',
    'ngRoute'


  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl:'templates/main/main.html',
        controller:'MainCtrl'
      })
      .when('/products', {
        templateUrl: 'templates/products/products.html',
        controller: 'ProductCtrl'
      })
      .when('/payments',{
        templateUrl:'templates/payments/payments.html',
        controller:'PaymentsCtrl'
      })
      .when('/delivery',{
        templateUrl:'templates/delivery/delivery.html',
        controller:'DeliveryCtrl'
      })
      .when('/search',{
        controller:'SearchCtrl',
        templateUrl: 'templates/products/products.html'
      })
      .when('/products/:id', {
        templateUrl: 'templates/about/about.html',
        controller: 'AboutCtrl'
      }).when('/admin', {
        templateUrl : 'templates/admin/admin.html',
        controller:'AdminCtrl'
      }).when('/test',{
		    templateUrl:'templates/test/test.html',
	       controller:'TestCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });


angular.module('eShopApp').run(function ($rootScope) {
  $rootScope.safeApply = function (fn) {
    var phase = $rootScope.$$phase;
    if (phase === '$apply' || phase === '$digest') {
      if (fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };
});

angular.module('eShopApp').run(function(mongolab) {
  mongolab.setApiKey('OKLros-dRCKm1qnUlvlVlbVBV4JQb4mM');
  mongolab.setBaseUrl('https://api.mongolab.com/api/1/databases');
});
angular.module('eShopApp').run(function (productDataService){
  productDataService.init();
});
angular.module('eShopApp').run(function (PaginationService){
  PaginationService.init();
});
angular.module('eShopApp').run(function(userDataService){
  userDataService.init();
});
angular.module('eShopApp').run(function(authenticate){
  authenticate.init();
});
angular.module('eShopApp').run(function(cartService){
  cartService.init();
});
angular.module('eShopApp').run(function(slider){
  slider.init();
});
angular.module('eShopApp').run(function(systemDataService){
  systemDataService.init();
});
angular.module('eShopApp').run(function(events, messaging){
  messaging.publish(events.message._SLIDER_INIT_STATE_,[{"id":"slider"}]);
});
