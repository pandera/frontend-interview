(function(){
	'use strict'
	/*
	* Original Author: Daniel Moore
	* Original Date: 5/4/15
	* Description: State and routing testing for Portal Controller
	* Notes: Incomplete 
	*/
	describe("Portal Controller", function(){
		var rootScope, scope, state, portalController;
		beforeEach(module('REVCast'));
		beforeEach(inject(function($rootScope, $state){
			rootScope = $rootScope;
			scope = $rootScope.$new();
			state = $state;
		}));
		beforeEach(inject(function($controller){
			portalController = $controller('PortalController', {
				$scope: scope,
				isAuthed: true,
                themeId: true,
                leaderboardData:{data:[{}]}
			});
		}));
		describe("- Initialize", function(){
			it('should  have defined controller', function(){
				expect(portalController).toBeDefined();
			});
			it('should have init method defined', function(){
				expect(portalController.init).toBeDefined();
			});
		});
	});
})();