angular.module('eShopApp').directive('uniqueEmail', ['mongolab', function(mongolab){
  return{
    restrict:'A',
    require:'ngModel',
    link: function($scope, $element, $attrs, ctrl){

      var getUserByEmailSuccessHandler = function(response){
        if(response.data && response.data.length >0){
          ctrl.$setValidity('uniqueEmail', false);

        }else{
          ctrl.$setValidity('uniqueEmail', true);
        }
      };

      var getUserByEmailErrorHandler = function(){
        ctrl.$setValidity('uniqueEmail', false);
      };

      ctrl.$parsers.unshift(function(viewValue){
        if((viewValue !== '') && (viewValue !== undefined) &&(viewValue !== null )&&
          (null !== viewValue.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))){
          mongolab.queryById('shop','users',{Email:viewValue})
            .then(getUserByEmailSuccessHandler,getUserByEmailErrorHandler);
        }
        return viewValue;
      })
    }
  }
}]);
