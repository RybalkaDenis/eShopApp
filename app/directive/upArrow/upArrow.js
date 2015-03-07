angular.module('eShopApp').directive('upArrow',['$document','myAnimate','lodash',
  function($document, myAnimate, lodash){

  var directiveDefinitionObject ={
    restrict:'E',
    templateUrl:'directive/upArrow/upArrow.html',
    link: function($scope, $elem){

      $elem.hide();

      $document.on('scroll', function(){

        if($document.scrollTop()>400){
          $elem.show();
        }else{
          $elem.hide();
        }
      });

      var slideUp = function(){

        var start = $document.scrollTop();

        myAnimate.animate({
          delay:20,
          duration:2000,
          delta:'bounce',
          step:function(progress){
            $document.scrollTop(start-start*progress);
          }
        });
      };

      $elem.on('click', lodash.throttle(slideUp,2000,{'trailing': false}));

      $scope.safeApply();
    }
  };

  return directiveDefinitionObject;
}]);
