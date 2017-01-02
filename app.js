(function(){
'use strict';

angular.module('REVCast', [
  'ui.router',
  'ui.bootstrap',
  'portal'
])
.config([
  '$urlRouterProvider', '$locationProvider',
  function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
    .otherwise('/portal/');
}]);
})();