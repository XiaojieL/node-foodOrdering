angular.module('foodService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Foods', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/food');
			},
			create : function(foodData) {
				return $http.post('/api/food', foodData);
			},
			delete : function(id) {
				return $http.delete('/api/food/' + id);
			},
			getTotal : function() {
				return $http.get('/api/total');
			},
			markAsDone : function(id) {
				return $http.get('/api/food/serve/' + id);
			},
		}
	}]);