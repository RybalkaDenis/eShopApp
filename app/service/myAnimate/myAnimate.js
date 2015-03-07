angular.module('eShopApp').service('myAnimate',['$interval', function($interval){

var deltas = {
  linear: function (progress) {
    return progress;
  },
  quad: function (progress) {
    return Math.pow(progress, 2)
  },
  circ: function (progress) {
    return 1 - Math.sin(Math.acos(progress))
  },
  bounce: function (progress, x) {
    for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
      if (progress >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
      }
    }
  }
};

  var animate = function(options){

    var start = new Date;
    var delta = options.delta || deltas.linear;

    var timer = $interval(function(){

      var progress = (new Date - start)/options.duration;

      if(progress >1) progress = 1;

      options.step(deltas[options.delta](progress));

      if(progress == 1)
        $interval.cancel(timer);
      options.complete && options.complete();

    }, options.delay || 20);
  };

  var  myAnimate = {
    animate:animate
  };

  return myAnimate;
}]);
