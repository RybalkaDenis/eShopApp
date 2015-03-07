angular.module('eShopApp').directive('shadow',['messaging', 'events',
  function(messaging, events){

  var directiveDefinitionObject ={
    restrict:"E",
    replace: true,
    template: "<div class='shadow'></div>",
    link: function($scope, $elem ){

      var showShadow = function(){
        $elem.toggleClass('shadow-visible');
      };
      var hideShadow = function(){
        $elem.toggleClass('shadow-visible');
      };

      $scope.showShadow = messaging.subscribe(events.message._SHOW_BODY_SHADOW_,showShadow);
      $scope.hideShadow = messaging.subscribe(events.message._HIDE_BODY_SHADOW_,hideShadow);

      $scope.$on('$destroy', function(){
        messaging.unsubscribe($scope.showShadow);
        messaging.unsubscribe($scope.hideShadow);
      });
      $scope.safeApply();
    }
  };
  return directiveDefinitionObject;
}]);
