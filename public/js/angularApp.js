var app = angular.module('MainApp', ['ngRoute', 'ui.router', 'ui.bootstrap']);

// God Data Service --- Service to fetch god data
app.factory('godDataService', ['$http', function ($http){
	return $http.get('/gods')
		.success(function(data){
			return data;
		});
}]);

app.factory('smiteDataService', ['$http', function ($http){
	return $http.get('/smiteData')
		.success(function(data){
			return data;
		});
}]);

app.factory('lolDataService', ['$http', function ($http){
	return $http.get('/lolData')
		.success(function(data){
			return data;
		});
}]);

app.factory('dotaDataService', ['$http', function ($http){
	return $http.get('/dotaData')
		.success(function(data){
			return data;
		});
}]);

// Angular Routes
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider){

	$stateProvider
		.state('home', {
			url: '/home',
			views: {
				"mainView": {
					templateUrl: "views/pbBoard.html",
					controller: 'PbController'
				}
			}
		});
	

	$urlRouterProvider.otherwise('home');
	$locationProvider.html5Mode(true);
}]);

app.controller('NavController', ['$scope', function ($scope){
	
}]);

app.controller('MainController', ['$scope', function ($scope){

}]);

app.controller('PbController', ['$scope', 'smiteDataService', 'lolDataService', 'dotaDataService', function ($scope, smiteDataService, lolDataService, dotaDataService){

	

	$scope.picks = {
		leftBans: [],
		rightBans: [],
		leftPicks: [],
		rightPicks: []
	};
	console.log($scope.picks);
	$scope.pickHistory = [];
	$scope.phase = 0;
	$scope.selectedGod = '';
	$scope.gameData;
	$scope.maxPhase;
	$scope.pickOrder;
	$scope.currentMode;
	$scope.message = "Welcome to PicksAndBans.com! Please choose a game to begin the draft simulator"
	// $scope.gameModes = {
	// 	smite3v3 : {
	// 		game: "smite",
	// 		id: "smite3v3",
	// 		name : "Joust 3v3",
	// 		order: ["LB1","RB1","LB2","RB2","LB3","RB3","LP1","RP1","RP2","LP2","LP3","RP3"]
	// 	},
	// 	smite5v5 : {
	// 		game: "smite",
	// 		id: "smite5v5",
	// 		name: "Conquest 5v5",
	// 	    order:["LB1","RB1","LB2","RB2","LP1","RP1","RP2","LP2","LP3","RP3","RB3","LB3","RP4","LP4","LP5","RP5"]
	// 	},
	// 	lol3v3 : {
	// 		game: "lol",
	// 		id: "lol3v3",
	// 		name : "3v3 Ranked",
	// 		order: ["LB1","RB1","LB2","RB2","LB3","RB3","LP1","RP1","RP2","LP2","LP3","RP3"]
	// 	},
	// 	lol5v5 : {
	// 		game: "lol",
	// 		id: "lol5v5",
	// 		name: "5v5 Ranked",
	// 	    order:["LB1","RB1","LB2","RB2","LB3","RB3","LP1","RP1","RP2","LP2","LP3","RP3","RP4","LP4","LP5","RP5"]
	// 	}
	// }

	$scope.animateFlash = function(){
		setInterval(function(){
			$('.phase-indicator').toggleClass('invis');
		}, 1000);
	};
	$scope.animateFlash();

	$scope.selectGame = function(){
		$scope.resetBoard();
		$scope.roleFilterIncludes = [];
		if ($scope.selectedGame === "smite"){
			smiteDataService.success(function (data){
				$scope.gameData = data;
				$scope.gods = data.gods;
				$scope.selectedMode = "smite5v5";
			});
		} else
		if ($scope.selectedGame === "lol"){
			lolDataService.success(function (data){
				$scope.gameData = data;
				$scope.gods = data.gods;
				$scope.selectedMode = "lol5v5";
			});
		} else
		if ($scope.selectedGame === "dota"){
			dotaDataService.success(function (data){
				$scope.gameData = data;
				$scope.gods = data.gods;
				$scope.selectedMode = "dota5v5";
			});
		}
	};

	// $scope.selectMode = function(){
	// 	$scope.resetBoard();
	// };

	$scope.selectMode = function(){
		$scope.resetBoard();
	};

	$scope.$watch(function ($scope){return $scope.selectedMode}, function (mode){
			$scope.resetBoard();
			if(mode){
				$scope.currentMode = $scope.gameData.modes[mode];
			}
	});

	$scope.selectGod = function(god){
		console.log(god);
		$scope.selectedGod = god;
	};

	// finds the picked god in the picks object by order index  ----- CHANGE TO SWITCH
	$scope.findPick = function(index, remove){
		if (index[0] === "L"){
				if(index[1] === "B"){
					if(index[2] === "1"){
						if (remove === true){
							$scope.picks.leftBans.splice(0,1);
						}
						return $scope.picks.leftBans[0];
					} else 
					if(index[2] == "2"){
						if (remove === true){
							$scope.picks.leftBans.splice(1,1);
						}
						return $scope.picks.leftBans[1];
					} else 
					if(index[2] == "3"){
						if (remove === true){
							$scope.picks.leftBans.splice(2,1);
						}
						return $scope.picks.leftBans[2];
					}
				} else 
				if(index[1] === "P"){
					if(index[2] === "1"){
						if (remove === true){
							$scope.picks.leftPicks.splice(0,1);
						}
						return $scope.picks.leftPicks[0];
					} else 
					if(index[2] == "2"){
						if (remove === true){
							$scope.picks.leftPicks.splice(1,1);
						}
						return $scope.picks.leftPicks[1];
					} else 
					if(index[2] == "3"){
						if (remove === true){
							$scope.picks.leftPicks.splice(2,1);
						}
						return $scope.picks.leftPicks[2];
					} else 
					if(index[2] == "4"){
						if (remove === true){
							$scope.picks.leftPicks.splice(3,1);
						}
						return $scope.picks.leftPicks[3];
					} else 
					if(index[2] == "5"){
						if (remove === true){
							$scope.picks.leftPicks.splice(4,1);
						}
						return $scope.picks.leftPicks[4];
					}
				}
			} else 
			if (index[0] === "R"){
				if(index[1] === "B"){
					if(index[2] === "1"){
						if (remove === true){
							$scope.picks.rightBans.splice(0,1);
						}
						return $scope.picks.rightBans[0];
					} else 
					if(index[2] == "2"){
						if (remove === true){
							$scope.picks.rightBans.splice(1,1);
						}
						return $scope.picks.rightBans[1];
					} else 
					if(index[2] == "3"){
						if (remove === true){
							$scope.picks.rightBans.splice(2,1);
						}
						return $scope.picks.rightBans[2];
					}
				} else 
				if(index[1] === "P"){
					if(index[2] === "1"){
						if (remove === true){
							$scope.picks.rightPicks.splice(0,1);
						}
						return $scope.picks.rightPicks[0];
					} else 
					if(index[2] == "2"){
						if (remove === true){
							$scope.picks.rightPicks.splice(1,1);
						}
						return $scope.picks.rightPicks[1];
					} else 
					if(index[2] == "3"){
						if (remove === true){
							$scope.picks.rightPicks.splice(2,1);
						}
						return $scope.picks.rightPicks[2];
					} else 
					if(index[2] == "4"){
						if (remove === true){
							$scope.picks.rightPicks.splice(3,1);
						}
						return $scope.picks.rightPicks[3];
					} else 
					if(index[2] == "5"){
						if (remove === true){
							$scope.picks.rightPicks.splice(4,1);
						}
						return $scope.picks.rightPicks[4];
					}
				}
			}
	};

 	$scope.roleFilterIncludes = [];
 	$scope.godSearch={};
    
    $scope.includeRoleFilter = function(role) {
        var i = $.inArray(role, $scope.roleFilterIncludes);
        if (i > -1) {
            $scope.roleFilterIncludes.splice(i, 1);
        } else {
            $scope.roleFilterIncludes.push(role);
        }
        console.log($scope.roleFilterIncludes);
    }
    
    $scope.roleFilter = function(god) {
        if ($scope.roleFilterIncludes.length > 0) {
            if(typeof god.role === "string"){ 
            	if ($.inArray(god.role, $scope.roleFilterIncludes) < 0){
                	return;
                } 
            }
            if(typeof god.role === "object"){ 
            	var result;
            	for (var i = 0; i < god.role.length; i++){
            		var r = god.role[i];
            		console.log(r);
            		if ($scope.roleFilterIncludes.indexOf(r) > -1){
                		result = god;
                	}
            	}
            	return result;
            }
        }
        return god;
   
    }

	$scope.checkGodAvailability = function(god){

		if(!god.name){
			return false
		}
		var results = 0;

		if($scope.picks.leftBans){
			var p1 = $scope.picks.leftBans.filter(function (bans){
				return bans.shortname === god.shortname
			});
			results += p1.length;
		}
		if($scope.picks.rightBans){
			var p2 = $scope.picks.rightBans.filter(function (bans){
				return bans.shortname === god.shortname
			});
			results += p2.length;
		}
		if($scope.picks.leftPicks){
			var p3 = $scope.picks.leftPicks.filter(function (bans){
				return bans.shortname === god.shortname
			});
			results += p3.length;
		}
		if($scope.picks.rightPicks){
			var p4 = $scope.picks.rightPicks.filter(function (bans){
				return bans.shortname === god.shortname
			});
			results += p4.length;
		}

		if(results > 0){
			return false;
		} else {
			return true;
		}
	};

	$scope.pickGod = function(god){
		// Check if god has already been picked

		if (!$scope.checkGodAvailability(god)) {
			$scope.message = "You must choose an available character";
		} else 
		if ($scope.phase < $scope.currentMode.order.length){
			var index = $scope.currentMode.order[$scope.phase];

			if (index[0] === "L"){
				if(index[1] === "B"){
					if(index[2] === "1"){
						if($scope.picks.leftBans){
							$scope.picks.leftBans[0] = god;
						} else {
							$scope.picks.leftBans = [];
							$scope.picks.leftBans[0] = god;
						}
					} else 
					if(index[2] == "2"){
						if($scope.picks.leftBans){
							$scope.picks.leftBans[1] = god;
						} else {
							$scope.picks.leftBans = [];
							$scope.picks.leftBans[1] = god;
						}
					} else 
					if(index[2] == "3"){
						if($scope.picks.leftBans){
							$scope.picks.leftBans[2] = god;
						} else {
							$scope.picks.leftBans = [];
							$scope.picks.leftBans[2] = god;
						}
					}
				} else 
				if(index[1] === "P"){
					if(index[2] === "1"){
						if($scope.picks.leftPicks){
							$scope.picks.leftPicks[0] = god;
						} else {
							$scope.picks.leftPicks = [];
							$scope.picks.leftPicks[0] = god;
						}
					} else 
					if(index[2] == "2"){
						if($scope.picks.leftPicks){
							$scope.picks.leftPicks[1] = god;
						} else {
							$scope.picks.leftPicks = [];
							$scope.picks.leftPicks[1] = god;
						}
					} else 
					if(index[2] == "3"){
						if($scope.picks.leftPicks){
							$scope.picks.leftPicks[2] = god;
						} else {
							$scope.picks.leftPicks = [];
							$scope.picks.leftPicks[2] = god;
						}
					} else 
					if(index[2] == "4"){
						if($scope.picks.leftPicks){
							$scope.picks.leftPicks[3] = god;
						} else {
							$scope.picks.leftPicks = [];
							$scope.picks.leftPicks[3] = god;
						}
					} else 
					if(index[2] == "5"){
						if($scope.picks.leftPicks){
							$scope.picks.leftPicks[4] = god;
						} else {
							$scope.picks.leftPicks = [];
							$scope.picks.leftPicks[4] = god;
						}
					}
				}
			} else 
			if (index[0] === "R"){
				if(index[1] === "B"){
					if(index[2] === "1"){
						if($scope.picks.rightBans){
							$scope.picks.rightBans[0] = god;
						} else {
							$scope.picks.rightBans = [];
							$scope.picks.rightBans[0] = god;
						}
					} else 
					if(index[2] == "2"){
						if($scope.picks.rightBans){
							$scope.picks.rightBans[1] = god;
						} else {
							$scope.picks.rightBans = [];
							$scope.picks.rightBans[1] = god;
						}
					} else 
					if(index[2] == "3"){
						if($scope.picks.rightBans){
							$scope.picks.rightBans[2] = god;
						} else {
							$scope.picks.rightBans = [];
							$scope.picks.rightBans[2] = god;
						}
					}
				} else 
				if(index[1] === "P"){
					if(index[2] === "1"){
						if($scope.picks.rightPicks){
							$scope.picks.rightPicks[0] = god;
						} else {
							$scope.picks.rightPicks = [];
							$scope.picks.rightPicks[0] = god;
						}
					} else 
					if(index[2] == "2"){
						if($scope.picks.rightPicks){
							$scope.picks.rightPicks[1] = god;
						} else {
							$scope.picks.rightPicks = [];
							$scope.picks.rightPicks[1] = god;
						}
					} else 
					if(index[2] == "3"){
						if($scope.picks.rightPicks){
							$scope.picks.rightPicks[2] = god;
						} else {
							$scope.picks.rightPicks = [];
							$scope.picks.rightPicks[2] = god;
						}
					} else 
					if(index[2] == "4"){
						if($scope.picks.rightPicks){
							$scope.picks.rightPicks[3] = god;
						} else {
							$scope.picks.rightPicks = [];
							$scope.picks.rightPicks[3] = god;
						}
					} else 
					if(index[2] == "5"){
						if($scope.picks.rightPicks){
							$scope.picks.rightPicks[4] = god;
						} else {
							$scope.picks.rightPicks = [];
							$scope.picks.rightPicks[4] = god;
						}
					}
				}
			}
			$scope.pickHistory.pop();
			$scope.phase +=1;
			$scope.message = "";
			console.log($scope.picks);
			// console.log($scope.phase);
			// console.log($scope.pickOrder);
			// console.log($scope.pickOrder[$scope.phase]);
		}
	};

	$scope.pickRandom = function(){
		var r;
		var randGod;
		var loopChecker = 200;
		do {
			rand = Math.floor((Math.random() * $scope.gods.length - 1) + 1);
			randGod = $scope.gods[rand];
			loopChecker = loopChecker - 1;
		}
		while ((!$scope.checkGodAvailability(randGod)) && loopChecker > 0);

		$scope.pickGod(randGod);
	};

	$scope.resetBoard = function(){
		$scope.picks = {};
		$scope.pickHistory = [];
		$scope.phase = 0;
	};

	$scope.undo = function(){
		if ($scope.phase > 0){
			var undoSlot = $scope.currentMode.order[($scope.phase - 1)];
			console.log(undoSlot);
			var godToUndo = $scope.findPick(undoSlot);
			$scope.pickHistory.push(godToUndo);
			$scope.findPick(undoSlot, true);
			$scope.phase -= 1;
		}
	};

	$scope.redo = function(){
		if ($scope.phase < 16 && $scope.pickHistory.length > 0){
			$scope.pickGod($scope.pickHistory[$scope.pickHistory.length -1]);
		}
	};



}]);

