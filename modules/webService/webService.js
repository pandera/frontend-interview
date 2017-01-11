(function () {
	'use strict';
	/*
	 Author: Daniel Moore
	 Date: 10/05/2015
	 Description: Factory that controls API
	 routing
	 */

	var WebService = function ($http) {
		var APIManager = {};

		APIManager.loadLeaderboardData = function(vertical){
            return $http.get("./modules/webService/mock_data/leaderboard.json");
			//if(vertical === ""){
			//	return $http.get("./modules/webService/mock_data/leaderboard.json");
			//}else{
			//	return $http.get("./modules/webService/mock_data/leaderboard_"+vertical+".json");
			//}
		};

		APIManager.loadChatterData = function(vertical){
			if(vertical === ""){
				return $http.get("./modules/webService/mock_data/chatter.json");
			}else{
				return $http.get("./modules/webService/mock_data/chatter_"+vertical+".json");
			}
		};

		APIManager.loadVerticalConfig = function(vertical){
			if(vertical === ""){
				return $http.get("./modules/webService/mock_data/config.json");
			}else{
				return $http.get("./modules/webService/mock_data/config_"+vertical+".json");
			}
		};

		return APIManager;
	};

	angular
			.module("REVCast")
			.factory("WebService", [
				'$http',
				WebService
			]);
})();