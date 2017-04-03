var app = angular.module("hackerprojects", ['ngMaterial', 'ngMdIcons']); 
var url = "http://starlord.hackerearth.com/kickstarter";
app.controller("myCtrl", function($scope, $http, $filter) {
	
	$http.get(url)
		.then(function (response){
			$scope.projects = response.data;
		});
    $scope.prefix_url = "https://www.kickstarter.com/";    
	$scope.calculateHours = function(date){
		var today = new Date();
		var diff = (today-new Date(date))/1000;
		var hours =  diff/3600;
		var days = hours/24;
		return parseInt(days)+" days "+parseInt(hours%24)+" hours ";
	}

	$scope.currentPage = 0;
	$scope.pageSize = 10;
	$scope.getData = function () {
      return $filter('filter')($scope.projects, $scope.projects_search)
      
    }
    $scope.numberOfPages = function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }


	$scope.$watch("currentPage + numberPerPage", function() {
		var begin = (($scope.currentPage - 1) * $scope.numberPerPage)
		    , end = begin + $scope.numberPerPage;
	    $scope.filteredprojects = $scope.projects.slice(begin, end);
	});


});
app.filter('elapsed', function($filter){
	return function(date){
        if (!date) return;
        var time = Date.parse(date),
            difference = (new Date()) - time;

        // Seconds (e.g. 32s)
        difference /= 1000;
        if (difference < 60) return Math.floor(difference)+' s';

        // Minutes (e.g. 12m)
        difference /= 60;
        if (difference < 60) return Math.floor(difference)+' m';

        // Hours (e.g. 5h)
        difference /= 60;
        if (difference < 24) return Math.floor(difference)+' h';

        difference /= 24;
        if (difference > 0) return Math.floor(difference)+' d';

        // Date (e.g. Dec 2)
        return $filter('date')(time, 'MMM d');
    };
});
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
app.config(function($mdThemingProvider) {
   $mdThemingProvider.theme('customTheme') 
      .primaryPalette('grey')
      .accentPalette('orange')
      .warnPalette('red');
});
