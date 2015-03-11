var Slider = function(){
  var self = this;
  self.id ='';
  self.slides = [];
  self.timer='';
};

angular.module('eShopApp').value('Slider',Slider);
