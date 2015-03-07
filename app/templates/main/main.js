 'use strict';

angular.module('eShopApp')
.controller('MainCtrl', function ($scope, events, messaging, $timeout, slider) {

    $scope.showCart = function(){
      messaging.publish(events.message._SHOW_SHOPPING_CART_);
    };
    $scope.showModal = function(){
      messaging.publish(events.message._SHOW_MODAL_FORM_);
    };


    $scope.navLinks = [
      {title:'ГЛАВНАЯ',url:'#/home'},
      {title:'ТОВАРЫ',url:'#/products'},
      {title:'ОПЛАТА',url:'#/payments'},
      {title:'ДОСТАВКА',url:'#/delivery'},
      {title:'О НАС',url:'#/test'}
    ];

  $scope.messagingHandles = [];

  $scope.subscribe = function (topic, callback) {
    var handle = messaging.subscribe(topic, callback);

    if (handle) {
      $scope.messagingHandles.push(handle);
    }
  };

  $scope.publish = function (topic, data) {
    messaging.publish(topic, data);
  };

  $scope.$on('$destroy', function () {
    angular.forEach($scope.messagingHandles, function (handle) {
      messaging.unsubscribe(handle);
    });
  });

   $scope.debounce = function(func, ms){
      var state = false;
      return function(){
        if(state)return;
        func.apply(this, arguments);
        state = !state;
        $timeout(function(){
          state = false
        }, ms)
      }
    };

    $scope.newsSet = [1,2,3,4,5,6,7,8];


    $scope.limit = 4;

    $scope.slider= slider;

    $scope.slides = [
      {class:'red', value:1},
      {class:'blue', value:2},
      {class:'green', value:3},
      {class:'yellow', value:4}
    ];
});

