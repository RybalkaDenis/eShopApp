angular.module('eShopApp').directive('pagination',[function(){
  var directiveDefinitionObject = {
    restrict:'E',
    templateUrl:'directive/pagination/pagination.html',
    controller: function($scope, $element, PaginationService, messaging, events){

      $scope.currentPage = 1;

    function moveActivePage (){

        $scope.currentPage = arguments[1];
        $scope.pages = arguments[2];
        $element.on('selectstart', function(){return false});

        if($scope.currentPage == 1){
          $element.children().find('li').eq(2).addClass('active').html($scope.currentPage);
          $element.children().find('li').eq(3).removeClass('active').html($scope.currentPage+1);
          $element.children().find('li').eq(4).removeClass('active').html($scope.currentPage+2);
          console.log('start');
        }else if($scope.currentPage > 1 && $scope.currentPage!=$scope.pages){

          $element.children().find('li').eq(2).removeClass('active').html($scope.currentPage-1);
          $element.children().find('li').eq(3).addClass('active').html($scope.currentPage);
          $element.children().find('li').eq(4).removeClass('active').html($scope.currentPage+1);

        }else if($scope.currentPage == $scope.pages){

          $element.children().find('li').eq(2).removeClass('active').html($scope.currentPage-2);
           $element.children().find('li').eq(3).removeClass('active').html($scope.currentPage-1);
          $element.children().find('li').eq(4).addClass('active').html($scope.currentPage);
        }

        return $scope.currentPage;
      }
      messaging.subscribe(events.message._PAGINATION_MOVE_, moveActivePage);

      $scope.hasNext = function(){
        return  PaginationService.hasNext();
      };
      $scope.hasPrevious = function(){
        return  PaginationService.hasPrevious();
      };

      $scope.goToFirstPage = function(){
        messaging.publish(events.message._PAGINATION_GO_TO_FIRST_PAGE_, [$scope.products, $scope.perPage]);
      };

      $scope.goToNextPage = function (){
        if($element.find('.next').hasClass('disabled'))return;
        messaging.publish(events.message._PAGINATION_GO_TO_NEXT_PAGE_, [$scope.products]);
      };

      $scope.goToLastPage = function (){
        messaging.publish(events.message._PAGINATION_GO_TO_LAST_PAGE_, [$scope.products]);
      };

      $scope.goToPreviousPage = function (){
        if($element.find('.previous').hasClass('disabled'))return;
        messaging.publish(events.message._PAGINATION_GO_TO_PREVIOUS_PAGE_, [$scope.products]);
      };

      $scope.safeApply();
    },
    link:function($scope, $element, $attrs){


      //$scope.$apply();

    }
  };
  return directiveDefinitionObject;
}]);
