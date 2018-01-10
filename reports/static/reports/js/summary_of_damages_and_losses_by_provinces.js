//Table 2
var app = angular.module('sumOfDamagesAndLossesByProvincesApp', ['underscore', 'ui.bootstrap', 'popoverToggle', 'ngPrint']);

app.controller("sumOfDamagesAndLossesByProvincesController", function ($scope,$http,$parse, _) {
    $scope.incident;

    $scope.fetchSummaryData = function() {
        if($scope.incident) {
            $http({
                method: "POST",
                url: '/get_summary_data_by_sector_for_provinces',
                data: angular.toJson({
                    'com_data': {
                        'incident': $scope.incident,
                    },
                }),
            }).success(function(data) {
                $scope.data = data;
                $scope.sector_summary = data;
                console.log($scope.sector_summary);
            })
        }
    }

    $scope.checkIfNull = function() {
        var isNull = $scope.dlWaterSupplySumNat ? angular.equals({}, $scope.dlWaterSupplySumNat.water_supply.Table_7) : true;
        return isNull;
    }

//    $scope.fetchSummaryData();

 })
