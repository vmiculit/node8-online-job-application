angular.module('JobApp', [], function($locationProvider){
	$locationProvider.html5Mode(true);
});

angular.module('JobApp')
	.controller('homeController', ['$scope', function($scope){
		
	}]);

angular.module('JobApp')
	.controller('applicantController', ['$scope', '$http', function($scope, $http){

	$scope.applications = [];

	$http.get('http://localhost:3000/api/applicants')
		.then(function(response){

		response.data.forEach(function(item){
			$scope.applications.push(item);
		});

	});

	$scope.removeApplication = function(application){
		$http.post('http://localhost:3000/api/applicants', {appID: application._id})
			.then(function(response){

			$scope.applications = [];

			response.data.forEach(function(item){
			$scope.applications.push(item);
		});

			});
	};


	}]);

angular.module('JobApp')
	.controller('applicationController', ['$scope', '$http', '$location', function($scope, $http, $location){
		
		var appID = $location.path().split('/')[2]

		$http.get('http://localhost:3000/api/applicants/'+appID)
			.then(function(response){

			$scope.application = response.data[0]


		});





	}]);
