 'use strict';

angular.module('eShopApp')
.controller('MainCtrl', function ($scope, events, messaging, $timeout, slider,  modelTransformer) {

    $scope.showCart = function(){
      messaging.publish(events.message._SHOW_SHOPPING_CART_);
    };
    $scope.showModal = function(){
      messaging.publish(events.message._SHOW_MODAL_FORM_);
    };
    $scope.myUser = {
      "_id": {
        "$oid": "54f19ed6e4b0832ffba9fa96"
      },
      "Email": "qqq@ua.fm",
      "Password": "d0ba86bddf483978df7c7d4cd66b74d0",
      "DateJoined": "2015-02-28T10:56:45.430Z",
      "Phone": false,
      "confirmedEmail": false,
      "UserIsAdmin": true
    };
    function getAuthorised (user){
      $scope.myUser = modelTransformer.transform(user, User);
    }
    messaging.subscribe(events.message._AUTHENTICATE_USER_COMPLETE_, getAuthorised);

    $scope.navLinks = [
      {title:'ГЛАВНАЯ',url:'#/home'},
      {title:'ТОВАРЫ',url:'#/products'},
      {title:'ОПЛАТА',url:'#/payments'},
      {title:'ДОСТАВКА',url:'#/delivery'},
      {title:'КАБИНЕТ',url:'#/test'}
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



    function sliderState(sliderState){
      $scope.sliderState = sliderState;
    }
    messaging.subscribe(events.message._SLIDER_STATE_, sliderState);

    $scope.prevSlide =function (){
      messaging.publish(events.message._PREVIOUS_SLIDE_);
    };
   $scope.nextSlide =  function ( ){
      messaging.publish(events.message._NEXT_SLIDE_);
    };
    $scope.setSlide =  function (index){
      messaging.publish(events.message. _SET_SLIDE_,[index]);
    };

});

