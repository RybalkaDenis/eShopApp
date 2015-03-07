var Product = function(){
  var self = this;
  self.id = '';
  self.title = '';
  self.price = '';
  self.src = '';
  self.date = '';
};
angular.module('eShopApp').value('Product',Product);
