var User = function(){
  var self = this;
  self.Email = '';
  self.Password = '';
  self.DateJoined = '';
  self.Phone = false;
  self.confirmedEmail = false;
  self.UserIsAdmin = false;
};

angular.module('eShopApp').value('User',User);
