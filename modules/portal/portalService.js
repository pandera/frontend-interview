(function(){
	'use strict'
	var PortalService = function($state, webService){
		var self = this;

		this.generatePossessiveName = function(fullName){
			if(fullName){
	        	var firstName = fullName.split(' ')[0];
	        	if(firstName.slice(-1).toLowerCase() == 's'){
	        		return firstName + "'";
	        	}

	        	return firstName + "'s";
	        }
		}

		this.generateOrdinalSuffix = function(i){
			var j = i % 10,
		        k = i % 100;
		    if (j == 1 && k != 11) {
		        return i + "st";
		    }
		    if (j == 2 && k != 12) {
		        return i + "nd";
		    }
		    if (j == 3 && k != 13) {
		        return i + "rd";
		    }
		    return i + "th";
		}

		this.getRowStyle = function(numberOfMetrics, index){
            var singleRowHeight = 37.5 / numberOfMetrics;
            var singleBarHeight = .8 * singleRowHeight;
            var singleTopMarginHeight = (index == 0) ? 0 : .2 * singleRowHeight;

            return {
                "height": singleBarHeight + "vh",
                "margin-top": singleTopMarginHeight + "vh"
            };
        };

        this.getTopMarginStyle = function(numberOfMetrics){
            var singleRowHeight = 37.5 / numberOfMetrics;
            var singleBarHeight = .8 * singleRowHeight;
            var singleTopMarginHeight = Math.abs((3.5 - singleBarHeight) / 2);

            return {
                "margin-top": singleTopMarginHeight + "vh"
            };
        };

        this.getFooterTopMarginStyle = function(numberOfMetrics){
        	var topMargin = 1.25;
        	if(numberOfMetrics > 5) return topMargin;
        	
        	var multiplier = 5 - numberOfMetrics;
        	multiplier = (multiplier === 0) ? 1 : multiplier;
        	var topMarginHeight = multiplier * topMargin;

        	return topMarginHeight + "vh";
        };
		
		this.getChartConfig = function(){
			return {
                options: {
	                chart: {
	                    type: 'pie',
	                    renderTo: 'pie-chart-wrapper'
	                },
	                title: {
	                    text: ''
	                },
	                plotOptions: {
	                    pie: {
	                        dataLabels: {
	                            enabled: false
	                        }
	                    }
	                },
	                exporting: {
	                	enabled: false
	                }
                },
                series: [{       
                    data: [{
	                    name: 'foo',
	                    y: 56.33,
	                    color: '#E94B3B'
	                }, {
	                    name: 'bar',
	                    y: 24.03,
	                    color: '#8AD5E7',
	                    sliced: true,
	                    selected: true
	                }, {
	                    name: 'baz',
	                    color: '#F8C471',
	                    y: 10.38
	                }]
                }]
            };
		};

		this.loadLeaderboardData = function(vertical){
			return webService.loadLeaderboardData(vertical);
		};

		this.loadTeamLeaderboardData = function(teamId){
			return webService.loadTeamLeaderboardData(teamId);
		}

		this.loadChatterData = function(vertical){
			return webService.loadChatterData(vertical);
		};

		this.loadVerticalConfig = function(vertical){
			return webService.loadVerticalConfig(vertical);
		};
	}
	
	angular
		.module('REVCast')
		.service('PortalService', [
		   '$state',
		   'WebService',
		   PortalService
		]);
})();