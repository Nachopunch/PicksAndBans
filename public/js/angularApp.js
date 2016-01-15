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

app.controller('PbController', ['$scope', 'smiteDataService', 'lolDataService', function ($scope, smiteDataService, lolDataService){

	

	$scope.picks = [];
	$scope.pickHistory = [];
	$scope.phase = 0;
	$scope.selectedGod = '';
	$scope.gameData;

	$scope.selectGame = function(){
		$scope.resetBoard();
		if ($scope.selectedGame === "smite"){
			smiteDataService.success(function (data){
				$scope.gameData = data;
				$scope.gods = data.gods;
			});
		} else
		if ($scope.selectedGame === "lol"){
			lolDataService.success(function (data){
				$scope.gameData = data;
				$scope.gods = data.gods;
			});
		} else
		if ($scope.selectedGame === "dota"){
			dotaDataService.success(function (data){
				$scope.gameData = data;
				$scope.gods = data.gods;
			});
		}
	};

	$scope.selectGod = function(godName){
		$scope.selectedGod = godName;
	};

	$scope.pickGod = function(god){
		if ($scope.picks.indexOf(god) > -1) {
			$scope.message = "That god has already been picked";
		}
		else if ($scope.phase < 16){
			$scope.picks[$scope.phase] = god;
			$scope.pickHistory.pop();
			$scope.phase +=1;
			$scope.message = "";
		}
	};

	$scope.resetBoard = function(){
		$scope.picks = [];
		$scope.pickHistory = [];
		$scope.phase = 0;
	};

	$scope.undo = function(){
		if ($scope.phase > 0){
			$scope.pickHistory.push($scope.picks[$scope.picks.length -1]);
			$scope.picks.pop();
			$scope.phase -= 1;
		}
	};

	$scope.redo = function(){
		if ($scope.phase < 16 && $scope.pickHistory.length > 0){
			$scope.pickGod($scope.pickHistory[$scope.pickHistory.length -1]);
		}
	};

}]);

