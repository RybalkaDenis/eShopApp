angular.module('eShopApp').directive('disableMark',['$timeout','$parse', '$animate', function($timeout, $parse, $animate){
  return{
    restrict:'A',
    link: function($scope, $elem, $attr){

      $elem.on('click', function(){
        if($parse($attr.disableMark)($scope)){

          $elem.css({
            transition:'300ms linear',
            WebkitTransition:'300ms linear'
          });
          $animate.addClass($elem, 'disabled');

          $timeout(function(){
            $animate.removeClass($elem, 'disabled');
          },300);

        }else{
          $parse($attr.disableAct)($scope);
        }
        $scope.safeApply();
      });
    }
  }
}]);
