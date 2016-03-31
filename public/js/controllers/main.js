angular.module('foodController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Foods', function($scope, $http, Foods) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.total = 0;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Foods.get()
			.success(function(data) {
				$scope.orders = data;
				$scope.loading = false;
			});

		$scope.getTotalPrices = function(){
			$scope.loading = true;
			Foods.getTotal()
				.success(function(data) {
					$scope.loading = false;
					$scope.total = data["total"];
				});
			};
		
		$scope.getTotalPrices();
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFood = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined && $scope.formData.price != undefined && $scope.formData.orderedBy != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Foods.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.orders = data; // assign our new list of todos
						$scope.getTotalPrices();
					});
			}
		};

		// mark an item as done
		$scope.markAsDone = function(id) {
			$scope.loading = true;
			Foods.markAsDone(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.orders = data; // assign our new list of todos
				});
		};

		// DELETE ==================================================================
		// delete a food order after checking it
		$scope.deleteFood = function(id) {
			$scope.loading = true;

			Foods.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.orders = data; // assign our new list of todos
					$scope.getTotalPrices();
				});
		};
	}]);