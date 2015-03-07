angular.module('eShopApp').directive('modal', function($animate, messaging, events){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'directive/modal/modal.html',
      link: function (scope, element) {
        scope.registration = false;


        var showModal = function () {
            messaging.publish(events.message._SHOW_BODY_SHADOW_);
            $animate.addClass(element,'visible');
        };
        scope.signUp = function(event){
          scope.registration = false;
        };
        scope.registrate = function(){
          scope.registration = true;
        };
        messaging.subscribe(events.message._SHOW_MODAL_FORM_, showModal);

        scope.hideModal = function () {
          messaging.publish(events.message._HIDE_MODAL_FORM_);
        };

        var hideModal = function(){
          messaging.publish(events.message._HIDE_BODY_SHADOW_);
          scope.registration = false;
          $animate.removeClass(element,'visible');
        };
        messaging.subscribe(events.message._HIDE_MODAL_FORM_, hideModal);

        scope.$on('$destroy', function(){
          messaging.unsubscribe(scope.showModal);
        });

        element.on('selectstart', function(){return false});

        scope.safeApply();
      }
    };
});

angular.module('eShopApp').controller('ModalCtrl', function($scope,  $controller, events, messaging, User, $location, sha, md5){
 $controller('MainCtrl', {$scope:$scope});

  $scope.user = new User();
  $scope.email = '';
  $scope.password='';
  $scope.confirmpassword='';
  $scope.currentUser = '';
  $scope.currentPassword='';


  $scope.registerUser = function(){
      $scope.user.Email = $scope.email;
      $scope.user.DateJoined = new Date();
      $scope.user.Password = md5.createHash('pepper'+$scope.password+$scope.user.DateJoined.valueOf().toString()+'salt');

      $scope.publish(events.message._CREATE_USER_, [$scope.user]);
      $scope.publish(events.message._HIDE_MODAL_FORM_);
      $location.path('/test');
  };
  $scope.authenticate = function(){
      $scope.publish(events.message._AUTHENTICATE_USER_BY_EMAIL_,[{Email:$scope.currentUser}, $scope.currentPassword]);
  };

  $scope.passwordtooltip ={
    width:'300px',
    height:'40px',
    html:'Пароль должен содержать цифры и не должен содержать спец символы'
  };

});
