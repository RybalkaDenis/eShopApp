angular.module('eShopApp').directive('tooltip', function(){
  return {
    restrict: 'A',
    link: function ($scope, $elem, $attr) {
      var width = $scope.$eval($attr.tooltip).width || '100px';
      var height = $scope.$eval($attr.tooltip).height || '30px';

      var tooltip = angular.element('<div ng-show="tooltip" class="password-tooltip"> <div class="tooltip-container"> <p class="tooltip-text"></p> <div class="tooltip-angle"></div> </div></div>');
      $elem.on('click', function (event) {
        if($(document.body).find('div.password-tooltip').length == 0){
          tooltip.css({
            width: width,
            height: height
          });
          $elem.append(tooltip);
          tooltip.css({
            top:-tooltip.height(),
            left:$elem.width()
          });
          tooltip.find('p.tooltip-text').html($scope.$eval($attr.tooltip).html);
        }else{
          $(document.body).find('div.password-tooltip').remove();
        }
      });

      $scope.safeApply();
    }
  }
});
