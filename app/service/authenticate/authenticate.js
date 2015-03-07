'use strict';

angular.module('eShopApp').factory('authenticate', function(User, events, messaging, userDataService, sha, md5){
  var currentUser= {};
  var receivedUser = {};
  var currentPassword = {};

  var login = function(user, password){
    currentPassword = password;
    messaging.publish(events.message._GET_USER_BY_EMAIL_,[user]);

  };

  messaging.subscribe(events.message._AUTHENTICATE_USER_BY_EMAIL_, login);

  var onGetUserByEmailNameComplete = function(user){

    var user = user[0];
    var passwordHash = md5.createHash('pepper'+currentPassword+Date.parse(user.DateJoined.valueOf().toString())+'salt');

    if(passwordHash !== user.Password){
      messaging.publish(events.message._ADD_ERROR_MESSAGE_,['Неверный e-mail/пароль','alert.warning']);
      console.log('incorrectPassword');
    }else{
      currentUser = user;
      messaging.publish(events.message._AUTHENTICATE_USER_COMPLETE_,[currentUser]);
      console.log('correctPassword');
    }
  };
  messaging.subscribe(events.message._GET_USER_BY_EMAIL_COMPLETE_,onGetUserByEmailNameComplete);

  var init = function(){
    currentUser= {};
  };

  var authenticate ={
    init:init,
    login:login,
    onGetUserByEmailNameComplete: onGetUserByEmailNameComplete
  };
  return authenticate;
});
