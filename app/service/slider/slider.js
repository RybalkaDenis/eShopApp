angular.module('eShopApp').service('slider',['$timeout','messaging','events',function($timeout, messaging, events){
  var slides = [];
  var currentSlide = 1;

  var nextSlide = function(){
    console.log(currentSlide)
     hasNext()? currentSlide++ : false;
  };
  messaging.subscribe(events.message._NEXT_SLIDE_, nextSlide);

  var previousSlide = function (){
      hasNext()? currentSlide--: false;
  };
  messaging.subscribe(events.message._PREVIOUS_SLIDE_, previousSlide);

  var hasNext = function(){
    return currentSlide !== slides.length
  };

  var hasPrevious = function(){
    return currentSlide !== 1
  };

  var setSlide = function(index){
      currentSlide = index+1;
  };
   messaging.subscribe(events.message._SET_SLIDE_, setSlide);


  var _sliderMove = function(slides){

    $timeout(function slide(){

      if(currentSlide%slides){
        currentSlide++;
       var sliderTimer = $timeout(slide, 1500);
        console.log(currentSlide);
      } else{
        currentSlide = 1;
        var sliderTimer = $timeout(slide, 1500);
        console.log(currentSlide);
      }
    },1500);
  };


  var init = function(){
    // _sliderMove(6);
    var currentSlide = 1;
  };

  var slider = {
    init:init,
    nextSlide:nextSlide,
    previousSlide:previousSlide,
    hasNext:hasNext,
    hasPrevious:hasPrevious,
    setSlide: setSlide,
    currentSlide:currentSlide
  };
  return slider;
}]);
