(function(){
'use strict';

angular.module('REVCast', [
  'ui.router',
  'ui.bootstrap',
  'portal',
  'TimeAgoModule'
])
.config([
  '$urlRouterProvider', '$locationProvider',
  function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
    .when("/portal", ["$state", function($state) {
        $state.go("portal")
    }
    ])
    .otherwise('/portal/');
}]);
})();