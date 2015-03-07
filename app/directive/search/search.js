'use strict';

angular.module('eShopApp').directive('search',['messaging','events','$location',
  function(messaging, events, $location){

  var directiveDefinitionObject = {
    restrict:'E',
    controller:'SearchCtrl',

    templateUrl:'/directive/search/search.html',
    link: function($scope, $elem, $attr){
      $scope.searchResult = [];
      var showSearchBody = function (){
        $scope.publish(events.message._SHOW_BODY_SHADOW_);
        $scope.searchBody = true;
      };
      messaging.subscribe(events.message._SHOW_SEARCH_BODY_, showSearchBody);


      var hideSearchBody = function (){
        $scope.publish(events.message._HIDE_BODY_SHADOW_);
        $scope.searchBody = false;
      };
      messaging.subscribe(events.message._HIDE_SEARCH_BODY_, hideSearchBody);


      $scope.search = function(){
        $scope.searchResult = [];

        angular.forEach($scope.products, function(value, key){
          if(!$elem.find('input.search-input').val().toLowerCase().toString()){
            $scope.searchResult = [];
          }else
            if(value.title.toString().toLowerCase().indexOf($elem.find('input.search-input').val().toLowerCase().toString()) !== ~0){
              $scope.searchResult.push(value);
            }
        });

        console.log($elem.find('input.search-input').val().toLowerCase().toString());

        if($scope.searchResult.length ==0){
          $scope.searchResult = ["НЕТУ ТОВАРА УДОВЛЕТВОРЯЮЩЕГО УСЛОВИЯ ПОИСКА"];
        }
        return $scope.searchResult
      };



      $scope.addToCart = function(index){
        messaging.publish(events.message._ADD_TO_CART_,[$scope.searchResult[index]]);
        messaging.publish(events.message._HIDE_SEARCH_BODY_);
      };

      $scope.toSearchPage = function(){
        messaging.publish(events.message._HIDE_SEARCH_BODY_);
        messaging.publish(events.message._GET_PRODUCTS_COMPLETE_, [$scope.searchResult]);
        console.log($scope.searchResult)

      };

      $scope.safeApply();
    }

  };
  return directiveDefinitionObject;
}]);


