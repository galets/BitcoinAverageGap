var myApp = angular.module('myApp',[ ]);

myApp.filter('volume_filter', function() {
  return function(items, args) {
    var filtered = [];
    angular.forEach(items, function(item) {
      if (item.volume_percent && item.volume_percent > 1) {
        filtered.push(item);
      }
    });
    return filtered;
  };
});

myApp.controller('IndexController', ['$scope', '$http', '$interval',
  function($scope, $http, $interval) {
    $scope.data = null;
    $scope.data_loading = true;
    $scope.exchanges = null;
    $scope.exchanges_loading = true;
      
    $scope.reload = function() {
        $scope.data_loading = true;
        $http.get("https://api.bitcoinaverage.com/ticker/USD/")
          .success(function(data, status, headers, config) {
              $scope.data = data;
              $scope.data_loading = false;
          })
          .error(function(data, status, headers, config) {
              $scope.data = null;
              $scope.data_loading = false;
          });
          
        $scope.exchanges_loading = true;
        $http.get("https://api.bitcoinaverage.com/exchanges/USD")
          .success(function(data, status, headers, config) {
              $scope.exchanges = data;
              $scope.exchanges_loading = false;
          })
          .error(function(data, status, headers, config) {
              $scope.exchanges = null;
              $scope.exchanges_loading = false;
          });
    };
    
    $scope.reload();
    
    $interval(function() {
        $scope.reload();
    }, 20000);

}]);