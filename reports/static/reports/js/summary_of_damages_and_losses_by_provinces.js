//Table 2
var app = angular.module('sumOfDamagesAndLossesByProvincesApp', ['underscore', 'ui.bootstrap', 'popoverToggle', 'ngPrint']);
app.controller("sumOfDamagesAndLossesByProvincesController", function ($scope,$http,$parse) {
    $scope.incident;

    $scope.fetchSummaryData = function() {
        if($scope.incident) {
            $http({
                method: "POST",
                url: '/get1_summary_data_by_sector_for_provinces',
                data: angular.toJson({
                    'table_name': 'Table_2',
                    'com_data': {
                        'incident': $scope.incident,
                    },
                    'sectors': [{
                        'province': ['SumProvinceDmg', 'SumProvinceLoss', 'SumProvincePub', 'SumProvincePvt']},
                    ]
                }),
            }).success(function(data) {
                $scope.provinceSumNat = data;
                console.log($scope.provinceSumNat);
            })
        }
    }

    $scope.checkIfNull = function() {
        var isNull = $scope.provinceSumNat ? angular.equals({}, $scope.provinceSumNat.report.Table_2) : true;
        return isNull;
    }

    $scope.parseToFloat = function(val1=0) {
        if(val1 == null) {
            val1 = 0;
        }
        return parseInt(val1);
    }

    $scope.grandTotDamage = function() {
        if(!angular.isUndefined($scope.provinceSumNat)) {
            var tot_damage = 0;
            angular.forEach($scope.provinceSumNat.report.Table_2, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(value_in.length > 0) {
                        if(key == 'SumProvinceDmg') {
                            tot_damage = tot_damage + $scope.parseToFloat(value_in[0].tot_dmg);
                        }
                    }
                })
            })
            return tot_damage;
        }
    }

    $scope.grandTotLosses = function() {
        if(!angular.isUndefined($scope.provinceSumNat)) {
            var tot_losses = 0;
            angular.forEach($scope.provinceSumNat.report.Table_2, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(value_in.length > 0) {
                        if(key == 'SumProvinceLoss') {
                            tot_losses = tot_losses + $scope.parseToFloat(value_in[0].tot_loss);
                        }
                    }
                })
            })
            return tot_losses;
        }
    }

    $scope.grandTotLosses = function() {
        if(!angular.isUndefined($scope.provinceSumNat)) {
            var tot_losses = 0;
            angular.forEach($scope.provinceSumNat.report.Table_2, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(value_in.length > 0) {
                        if(key == 'SumProvinceLoss') {
                            tot_losses = tot_losses + $scope.parseToFloat(value_in[0].tot_loss);
                        }
                    }
                })
            })
            return tot_losses;
        }
    }

    $scope.grandTotPub = function() {
        if(!angular.isUndefined($scope.provinceSumNat)) {
            var tot_pub = 0;
            angular.forEach($scope.provinceSumNat.report.Table_2, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(value_in.length > 0) {
                        if(key == 'SumProvincePub') {
                            tot_pub = tot_pub + $scope.parseToFloat(value_in[0].tot_pub);
                        }
                    }
                })
            })
            return tot_pub;
        }
    }

    $scope.grandTotPvt = function() {
        if(!angular.isUndefined($scope.provinceSumNat)) {
            var tot_pvt = 0;
            angular.forEach($scope.provinceSumNat.report.Table_2, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(value_in.length > 0) {
                        if(key == 'SumProvincePvt') {
                            tot_pvt = tot_pvt + $scope.parseToFloat(value_in[0].tot_pvt);
                        }
                    }
                })
            })
            return tot_pvt;
        }
    }
})