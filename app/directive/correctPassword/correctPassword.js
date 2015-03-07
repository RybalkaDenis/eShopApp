angular.module('eShopApp').directive('correctPassword', function(){
  return{
   restrict:'A',
    require:'ngModel',
    link:function($scope, $element, $attrs, ngModel){

       function validPassword(password){

         if(null !== password.match(/^(?=.*\d)[0-9a-zA-Zаа-яА-Я]{6,}$/)){
            ngModel.$setValidity('correctPassword', true);
         }else{
           ngModel.$setValidity('correctPassword', false);
         }
         return password;
       }

      ngModel.$parsers.push(function(viewValue){
        return validPassword(viewValue);
      });
      ngModel.$formatters.push(function(modelValue){
        return validPassword(modelValue);
      });
    }
  }
});
