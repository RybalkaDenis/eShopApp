angular.module('eShopApp').directive('spinner',function(messaging,$animate,events){
  return{
    restrict:'E',
    replace:true,
    templateUrl:'directive/spinner/spinner.html',
    link: function(scope,element){

      var showSpinner = function(){
        $animate.addClass(element,'visible');
      };

      messaging.subscribe(events.message._START_SERVER_REQUEST_, showSpinner);

      var hideSpinner = function(){
        $animate.removeClass(element,'visible');
      };

      messaging.subscribe(events.message._END_SERVER_REQUEST_, hideSpinner);

      scope.$on('$destroy',function(){
        messaging.unsubscribe(events.message._END_SERVER_REQUEST_);
        messaging.unsubscribe(events.message._START_SERVER_REQUEST_);
      });
    }
  };
});
