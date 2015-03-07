angular.module('eShopApp').directive('mustEqual',function(){
  return{
    restrict:'A',
    require:'^ngModel',
    link:function($scope, $element, $attrs, ctrl){

      function validateEqual(myValue, otherValue) {
        if (myValue === otherValue) {
          ctrl.$setValidity('mustEqual', true);
        } else {
          ctrl.$setValidity('mustEqual', false);
        }
        return myValue;
      }

      $scope.$watch($attrs.mustEqual, function(otherModelValue){
        ctrl.$setValidity('mustEqual', ctrl.$viewValue === otherModelValue);
      });

      ctrl.$parsers.push(function(viewValue){
        return validateEqual(viewValue, $scope.$eval($attrs.mustEqual));
      });

      ctrl.$formatters.push(function(modelValue){
        return validateEqual(modelValue, $scope.$eval($attrs.mustEqual));
      });
      $scope.safeApply();
    }
  }
});
