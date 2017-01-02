(function () {
	'use strict'


    var PortalController = function ($scope, $stateParams, $rootScope, $state, $timeout, portalService, $window, leaderboardData) {
        var self = this;

        var addDefaultImages = function(leaderData){
            var imageAry = ["27AE60", "2C3E50", "8E44AD", "D35400"];
            var level = (self.isViewingTopLevel) ? 'team' : 'employee';

            for(var i = 0; i < leaderData.length; i ++){
                if(null === leaderData[i].image || leaderData[i].image === ""){
                    leaderData[i].image = './assets/avatars/icon_'+level+'_generic_'+imageAry[i % imageAry.length]+'_400x400.png';
                }
            }

            return leaderData;
        };

        var addMissingMetrics = function(leaderData){
            var allMetrics = [];
            for(var i = 0; i < leaderData.length; i ++){
                var metrics = leaderData[i].metrics;
                if(typeof metrics !== 'undefined'){
                    for(var j = 0; j < metrics.length; j ++){
                        var metric = {
                            "name" : metrics[j].name,
                            "teamAverage" : metrics[j].teamAverage
                        }

                        var found = false;
                        for(var k = 0; k < allMetrics.length; k ++){
                            if(allMetrics[k].name === metric.name){
                                found = true;
                                break;
                            }
                        }

                        if(!found){
                            allMetrics.push(metric);
                        }
                    }
                }
            }

            for(var i = 0; i < leaderData.length; i ++){
                var metrics = leaderData[i].metrics;
                if(typeof metrics !== 'undefined'){
                    var availableMetrics = angular.copy(allMetrics);
                    for(var j = 0; j < metrics.length; j ++){
                        for(var k = 0; k < availableMetrics.length; k ++){
                            if(metrics[j].name === availableMetrics[k].name){
                                availableMetrics.splice(k, 1);
                            }
                        }
                    }

                    if(availableMetrics.length > 0){
                        for(var k = 0; k < availableMetrics.length; k ++){
                            var metric = availableMetrics[k];
                            metric.points = 0;
                            metric.percent = 0;
                            leaderData[i].metrics.push(metric);
                        }
                    }
                }
            }

            return leaderData;
        }

        this.initLeaderboard = function(vertical){
            return portalService.loadLeaderboardData(vertical);
        };

        this.initChatterScroll = function(vertical){
        	return portalService.loadChatterData(vertical);
        };

        this.initConfig = function(vertical){
            return portalService.loadVerticalConfig(vertical);
        }

        this.getPossessiveName = function(fullName){
        	return portalService.generatePossessiveName(fullName);
        };

        this.ordinal_suffix_of = function(i) {
            return portalService.generateOrdinalSuffix(i);
		};

        this.createRange = function(min, max, step) {
		    step = step || 1;
		    var input = [];
		    for (var i = min; i <= max; i += step) {
		        input.push(i);
		    }
		    return input;
		};

		this.getBackgroundColor = function(index){
			return self.backgroundColors[index % self.backgroundColors.length];
		};

		this.calculateAverageScore = function(){
			var len = self.leaderboard.length;
			var sum = 0;

			for(var i = 0; i < len; i ++){
				sum += self.leaderboard[i].totalPoints;
			}

			return sum / len;
		}

        this.setLeaderboardData = function(data){
        	self.focusUserIndex = 0;
            data = addDefaultImages(data);
            data = addMissingMetrics(data);
        	self.leaderboard = data;
        };

        this.setChatterData = function(data){
        	self.chatterFeed = data;
        }

        this.setConfigData = function(data){
            self.configData = data;
        }

        this.leaderboardLoadError = function(error){

        };

        this.selectPieSectionForFocusUser = function(){
        	var name = self.leaderboard[self.focusUserIndex].name;
        	var len = self.chartConfig.series[0].data.length;
        	for(var i = 0; i < len; i ++){
        		if(self.chartConfig.series[0].data[i].name === name){
        			self.chartConfig.series[0].data[i].sliced = true;
        		}else{
        			self.chartConfig.series[0].data[i].sliced = false;
        		}
        	}
        };

        this.initTimer = function(){
            self.isHovering = false;
        	self.selectPieSectionForFocusUser();
            self.timer = $timeout(self.onTimer, self.delay);
        };

        this.initBackgroundColorArray = function(){
        	return ["#16A085", "#F1C40F", "#F39C12", "#C0392B"];
        };

        this.incrementFocusUser = function(){
            //console.log("Up");
        	self.focusUserIndex = (self.focusUserIndex + 1) % self.leaderboard.length;
        	self.selectPieSectionForFocusUser();
        };

        this.decrementFocusUser = function(){
        	self.focusUserIndex = (self.leaderboard.length + (self.focusUserIndex - 1)) % self.leaderboard.length;
            self.selectPieSectionForFocusUser();
        };

        this.onTimer = function(){
        	self.incrementFocusUser();
        	self.timer = $timeout(self.onTimer, self.delay);
        };

        this.getRankSectionColor = function(rank, total){
        	var percentile = rank/total;
        	if(percentile < .26){
        		return self.backgroundColors[0];
        	}else if(percentile < .51){
        		return self.backgroundColors[1];
        	}else if(percentile < .76){
        		return self.backgroundColors[2];
        	}else{
        		return self.backgroundColors[3];
        	}
        };

        this.getMetricSectionColor = function(percentToGoal){
        	if(percentToGoal < 45){
        		return self.backgroundColors[3];
        	}else if(percentToGoal < 60){
        		return self.backgroundColors[2];
        	}else if(percentToGoal < 85){
        		return self.backgroundColors[1];
        	}else{
        		return self.backgroundColors[0];
        	}
        };

        this.getRowStyle = function(numberOfMetrics, index){
            return portalService.getRowStyle(numberOfMetrics, index);
        };

        this.getTopMarginStyle = function(numberOfMetrics){
            return portalService.getTopMarginStyle(numberOfMetrics);
        };

        this.getFooterTopMarginStyle = function(numberOfMetrics){
            return portalService.getFooterTopMarginStyle(numberOfMetrics);
        };

        this.leaderboardClickHandler = function(index){
            self.stopTimer();
            console.log(index);
            if(self.isViewingTopLevel){
				if(self.leaderboard[index].members !== undefined && self.leaderboard[index].members.length > 0){
    	        	self.isViewingTopLevel = false;
    	        	self.setLeaderboardData(self.leaderboard[index].members);
    	        	self.chartConfig.series[0].data = self.buildPieChart();
    	        }else{
                    self.focusUserIndex = index < self.leaderboard.length?index:0;
                }
            }else{
				self.focusUserIndex = index < self.leaderboard.length?index:0;
	        }
        };

        this.gotoTop = function(){
            self.focusUserIndex = 0;
            self.selectPieSectionForFocusUser();
        }

        this.gotoBottom = function(){
            self.focusUserIndex = self.leaderboard.length - 7;
            self.selectPieSectionForFocusUser();
        }

        this.buildPieChart = function(){
        	var array = [];
        	var len = self.leaderboard.length;
        	
        	for(var i = 0; i < len; i ++){
        		array.push({
        			"name": self.leaderboard[i].name,
        			"y": self.leaderboard[i].contribution,
        			"color": self.getRankSectionColor(i + 1, len)
        		})
        	}

        	return array;
        };

        this.stopTimer = function(){
        	if(self.timer){
                self.isHovering = true;
        		$timeout.cancel(self.timer);
        	}
        };

        this.moveListUp = function(){
       		self.decrementFocusUser();
        };

        this.moveListDown = function(){
            self.incrementFocusUser();
        };

        $scope.$on('$destory', function(){
        	self.stopTimer();
        });

        this.logout = function(){
            $state.go('login');
        }

		this.init = function () {
            console.log("INIT");
            self.stopTimer();

			self.delay = 7000;
			self.isViewingTopLevel = true;
			self.chartConfig = portalService.getChartConfig();
            self.backgroundColors = self.initBackgroundColorArray();
            var vertical = $stateParams.vertical;

            self.initConfig(vertical).then(function(resp){
                self.setConfigData(resp.data);
            }, function(error){
                self.leaderboardLoadError(error);
            });

			if(leaderboardData){
				self.setLeaderboardData(leaderboardData.data);
				self.teamAverageScore = self.calculateAverageScore();
				self.chartConfig.series[0].data = self.buildPieChart();
				self.initTimer();
			}else{
                self.leaderboardLoadError(error);
            }

			self.initChatterScroll(vertical).then(function(resp){
				self.setChatterData(resp.data);
			}, function(error){
				self.leaderboardLoadError(error);
			});
		};

        this.init();
	};

	PortalController.resolve = {
        leaderboardData: [
            'PortalService', '$stateParams',
            function(portalService, $stateParams){ 
                return []
            }
        ]
	};

	angular
			.module('portal', [])

			.config(['$stateProvider', function ($stateProvider) {
					$stateProvider
							.state('portal', {
								url: '/portal/:vertical',
								templateUrl: 'modules/portal/portal.html',
								controllerAs: 'portal',
								controller: 'PortalController',
								resolve: PortalController.resolve
							});
				}])

			.controller('PortalController', [
				'$scope',
                '$stateParams',
				'$rootScope',
				'$state',
				'$timeout',
				'PortalService',
				'$window',
                'leaderboardData',
				PortalController
			])

})();