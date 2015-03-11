angular.module('eShopApp').service('systemDataService', ['messaging','events','mongolab','lodash',
  function(messaging, events, mongolab, lodash){
    var initMe = true;

   var sliderInit = function(slider){
     console.log('query');
      mongolab.queryById('shop','admin', slider,[])
        .then(sliderInitSuccess, sliderInitError);
   };
   messaging.subscribe(events.message._SLIDER_INIT_STATE_,lodash.throttle(sliderInit,500,{'trailing':false}));

  var sliderInitSuccess = function(result){
      messaging.publish(events.message._SLIDER_INIT_SUCCESS_, [1, result]);
  };

  var sliderInitError = function(){
    console.log('slider init error');
  };

  var init = function(){
    var initMe = true;
  };

  var systemDataService = {
    init:init,
    sliderInit : sliderInit
  };
    return systemDataService;
}]);
