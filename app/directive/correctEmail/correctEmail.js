angular.module('eShopApp').directive('correctEmail', function(){
  return{
    restrict:'A',
    require:'ngModel',
    link:function($scope, $element, $attrs, ngModel){

      function validEmail(email){
        if(null !== email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
          ngModel.$setValidity('correctEmail', true);
        }else{
          ngModel.$setValidity('correctEmail', false);
        }
        return email;
      }

      ngModel.$parsers.push(function(viewValue){
          return validEmail(viewValue);
      });
      ngModel.$formatters.push(function(modelValue){
        return validEmail(modelValue);
      });

      $scope.safeApply();
    }
  }
});
