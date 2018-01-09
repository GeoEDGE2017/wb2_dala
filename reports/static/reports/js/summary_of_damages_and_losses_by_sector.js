//Table 1
var app = angular.module('sumOfDamagesAndLossesBySectorApp', ['underscore', 'ui.bootstrap', 'popoverToggle', 'ngPrint']);

app.controller("sumOfDamagesAndLossesBySectorController", function ($scope,$http,$parse) {
    $scope.incident;

    $scope.fetchSummaryData = function() {
        alert('loadData');
        console.log('loadData');
        if($scope.incident) {
            $http({
                method: "POST",
                url: '/get_summary_data_by_sector',
                data: angular.toJson({
                    'com_data': {
                        'incident': $scope.incident,
                    },
                    'sectors': [
                        {'health': ['DmgHealthTot', 'LosHealthTot', 'HealthTotPub', 'HealthTotPvt']},
                        {'education': ['DmgEducationTot', 'EducationTotPub', 'EducationTotPvt', 'LosEducationTot']},
                        {'mining': ['DmgMiningTot', 'LosMiningTot', 'MiningTotPub', 'MiningTotPvt']}
                    ]
                }),
            }).success(function(data) {
                console.log('load ', data);
                $scope.data = data;
                $scope.dlWaterSupplySumNat = data;

    //            if($scope.checkIfNull()) {
    //                $("#modal-container-239456").modal('show');
    //            }
            })
        }
    }

    $scope.checkIfNull = function() {
        var isNull = $scope.dlWaterSupplySumNat ? angular.equals({}, $scope.dlWaterSupplySumNat.water_supply.Table_7) : true;
        return isNull;
    }

    $scope.fetchSummaryData();
})
