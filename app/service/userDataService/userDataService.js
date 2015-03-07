angular.module('eShopApp').factory('userDataService',function(messaging, events, mongolab,modelTransformer,User){
var users = [];

  var getUserByEmail = function(email){

    return mongolab.queryById('shop','users',email,[])
      .then(getUserByEmailSuccessHandler,getUserByEmailErrorHandler);
  };
  messaging.subscribe(events.message._GET_USER_BY_EMAIL_,getUserByEmail);

  var getUserByEmailSuccessHandler = function(response){
    if(response.data.length >0){
      var result = [];
      angular.forEach(response.data,function(user){
        result.push(modelTransformer.transform(user, User));
      });
      messaging.publish(events.message._GET_USER_BY_EMAIL_COMPLETE_,[result]);
      console.log('getUserSuccessComplete');
    }else{
      getUserByEmailErrorHandler();
    }
  };

  var getUserByEmailErrorHandler = function(){
    messaging.publish(events.message._GET_USER_BY_EMAIL_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Неверный e-mail/пароль', 'alert.warring']);
    console.log('getUserFailureOccurs');
  };


  var createUser = function (user) {

    return mongolab.create('shop', 'users', user)
      .then(createUserSuccessHandler, createUserErrorHandler);
  };

  var createUserSuccessHandler = function (response) {
    if (response.data) {
      messaging.publish(events.message._CREATE_USER_COMPLETE_,
        [modelTransformer.transform(response.data, User)]);

    } else {
      createUserErrorHandler();
    }
  };

  var createUserErrorHandler = function () {
    messaging.publish(events.message._CREATE_USER_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Невозможно создать пользователя', 'alert.warning']);

  };

  messaging.subscribe(events.message._CREATE_USER_, createUser);



  var init = function () {
    users = [];
  };

 return{
   init:init,
   getUserByEmail:getUserByEmail,
   getUserByEmailSuccessHandler:getUserByEmailSuccessHandler,
   getUserByEmailErrorHandler:getUserByEmailErrorHandler,
   createUser:createUser,
   createUserSuccessHandler:createUserSuccessHandler,
   createUserErrorHandler:createUserErrorHandler
 };
  return userDataService;
});

