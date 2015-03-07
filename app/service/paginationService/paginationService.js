angular.module('eShopApp').service('PaginationService', ['events','messaging','productDataService',
  function(events, messaging, productDataService){

    var result = [];
    var _offset = 1;
    var _pages = 0;
    var _perPage = 6;


function setPerPage(perPage){
  _perPage = perPage;
}

  var _move = function(products){
    if(!angular.equals(products, result)){
      angular.copy(products,result);
    }
    result.splice(_perPage*_offset, products.length-_perPage*_offset);
    result.splice(0,_perPage*(_offset-1));
    messaging.publish(events.message._PAGINATION_MOVE_,[result,_offset, _pages ]);
    messaging.publish(events.message._RENDER_GOODS_,[result]);
    console.log('pagination-move');
  };

  var goToFirstPage = function(products, perPage){
    _perPage = perPage;
    _pages = Math.ceil(products.length/_perPage);
    _offset = 1;
    console.log('pagination-go-to-first');
    _move(products);
  };
messaging.subscribe(events.message._PAGINATION_GO_TO_FIRST_PAGE_,goToFirstPage);


  var goToLastPage = function(products){
    _offset = Math.ceil(products.length/_perPage);
    _move(products);

  };
messaging.subscribe(events.message._PAGINATION_GO_TO_LAST_PAGE_,goToLastPage );


  var goToNextPage = function(products){
    ++_offset;
    _move(products);
  };
messaging.subscribe(events.message._PAGINATION_GO_TO_NEXT_PAGE_ ,goToNextPage );

  var goToPreviousPage = function(products){
    --_offset;
    _move(products);
  };
messaging.subscribe(events.message._PAGINATION_GO_TO_PREVIOUS_PAGE_ ,goToPreviousPage );

  var setPage = function(products, offset){
    _offset = offset;
    _move(products, offset);
  };
messaging.subscribe(events.message._PAGINATION_SET_PAGE_ ,setPage );


  var hasNext = function(){
    return  _offset == _pages;
  };

  var hasPrevious = function(){
    return _offset == 1;
  };

  var init = function (){
    var result = [];
    var _offset = 1;
    var _pages = 0;
  };

  var PaginationService ={
    setPerPage:setPerPage,
    goToFirstPage:goToFirstPage,
    goToLastPage:goToLastPage,
    goToNextPage:goToNextPage,
    goToPreviousPage:goToPreviousPage,
    setPage:setPage,
    hasNext:hasNext,
    hasPrevious:hasPrevious,
    _pages:_pages,
    _offset:_offset,
    init: init

  };

  return PaginationService;
}]);
