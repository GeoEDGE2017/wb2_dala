//Table 2
var app = angular.module('sumOfDamagesAndLossesByProvincesApp', ['underscore', 'ui.bootstrap', 'popoverToggle', 'ngPrint']);

app.controller("sumOfDamagesAndLossesByProvincesController", function ($scope,$http,$parse) {
    $scope.incident;

    $scope.fetchSummaryData = function() {
        //alert('loadData');
        //console.log('loadData');
        if($scope.incident) {
            //alert('loadData2');
            $http({
                method: "POST",
                url: '/get1_summary_data_by_sector_for_provinces',
                data: angular.toJson({
                    'com_data': {
                        'incident': $scope.incident,
                    },
                    'sectors': [
                        {'province': ['SumProvinceDmg', 'SumProvinceLoss', 'SumProvincePub', 'SumProvincePvt']},
                    ]
                }),
            }).success(function(data) {
//                alert('loadData3');
                console.log('load ', data);
                $scope.provinceSumNat = data;

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