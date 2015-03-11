angular.module('eShopApp').service('slider',['$timeout','messaging','events',
  function($timeout, messaging, events ){
  var currentSlide=1;
    var slides, sliderTimer;

  var _sliderState = function(currentSlide, sliderGet){

    slides = slides ||  sliderGet.data[0].slides;


    var sliderState ={
      hasNext:currentSlide !== slides.length,
      hasPrevious:currentSlide !== 1,
      currentSlide:currentSlide,
      slides:slides
    };

    messaging.publish(events.message._SLIDER_STATE_, [sliderState]);
  };
    messaging.subscribe(events.message._SLIDER_INIT_SUCCESS_, _sliderState);


  var nextSlide = function(){
    currentSlide++;
    _sliderState(currentSlide);
  };
  messaging.subscribe(events.message._NEXT_SLIDE_, nextSlide);

  var previousSlide = function (){
    currentSlide--;
    _sliderState(currentSlide);
  };
  messaging.subscribe(events.message._PREVIOUS_SLIDE_, previousSlide);


  var setSlide = function(index){
    currentSlide = index+1;
    _sliderState(currentSlide);
  };
   messaging.subscribe(events.message._SET_SLIDE_, setSlide);


  var _sliderMove = function(slides){

    sliderTimer = $timeout(function slide(){

      if(currentSlide%slides){
        _sliderState(currentSlide++);
        sliderTimer = $timeout(slide, 1500);

      } else{
        _sliderState(1);
         sliderTimer = $timeout(slide, 1500);

      }
    },1500);
  };


  var init = function(){
    var currentSlide = 1;
  };

  var slider = {
    init:init,
    nextSlide:nextSlide,
    previousSlide:previousSlide,
    setSlide: setSlide
  };
  return slider;
}]);
