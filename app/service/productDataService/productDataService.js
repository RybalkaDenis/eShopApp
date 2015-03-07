angular.module('eShopApp').service('productDataService',
  function(messaging, events, mongolab, modelTransformer, Product, lodash, awesomeCache){
  var products = [];

  var getProducts = function(){
    if(awesomeCache.get('getProducts')){
      messaging.publish(events.message._GET_PRODUCTS_COMPLETE_,[awesomeCache.get('getProducts')]);
    }
    console.log('getProducts');
    return mongolab.query('shop','goods',[])
      .then(getProductsSuccessHandler,getProductsErrorHandler);
  };

  var getProductsSuccessHandler = function(response){
    console.log('query-success');
    if(response.data.length >0){
      var result = [];
      angular.forEach(response.data, function(product){
        result.push(modelTransformer.transform(product, Product));
      });
      awesomeCache.put('getProducts', result);
      messaging.publish(events.message._GET_PRODUCTS_COMPLETE_,[result]);
    }else{
      getProductsErrorHandler();
    }
  };

  var getProductsErrorHandler = function() {
    messaging.publish(events.message._GET_PRODUCTS_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Невозможно получить товары с сервера', 'alert.warring']);
  };

  messaging.subscribe(events.message._GET_PRODUCTS_,lodash.throttle(getProducts,1000,{'trailing':false}));

  var getProductById = function(id){
    return mongolab.queryById('shop','goods',id,[])
      .then(getProductByIdSuccessHandler,getProductByIdErrorHandler);
  };



  var getProductByIdSuccessHandler = function(response){
    if(response.data.length >0){

    var result = [];
    angular.forEach(response.data,function(product){
      result.push(modelTransformer.transform(product,Product));
      console.log(result);
    });
      messaging.publish(events.message._GET_PRODUCT_BY_ID_COMPLETE_,[result]);
    }else{
      getProductByIdErrorHandler();
    }
  };

  var getProductByIdErrorHandler = function(){
    messaging.publish(events.message._GET_PRODUCT_BY_ID_FAILED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_,
      ['Невозможно получить товар с сервера', 'alert.warring']);
  }
     messaging.subscribe(events.message._GET_PRODUCT_BY_ID_,getProductById);

  var init = function(){
    products = [];
  };

  var productDataService ={
    init:init,
    getProducts:getProducts,
    getProductsSuccessHandler:getProductsSuccessHandler,
    getProductsErrorHandler:getProductsErrorHandler,
    getProductById:getProductById,
    getProductByIdSuccessHandler:getProductByIdSuccessHandler,
    getProductByIdErrorHandler:getProductByIdErrorHandler
  };

  return productDataService;
 });
