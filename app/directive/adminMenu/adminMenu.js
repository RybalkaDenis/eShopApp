angular.module('eShopApp').directive('adminMenu',['$animate', function($animate){

  var directiveDefinitionObject = {
    restrict:'E',
    templateUrl:'directive/adminMenu/adminMenu.html',
    link: function($scope,$elem,$attr){
      $scope.adminMenu ={
        home:true
      }
    },
    controller:function($scope, $controller, events, messaging){

    },
    transclude:false
  };


  return directiveDefinitionObject;
}]);
