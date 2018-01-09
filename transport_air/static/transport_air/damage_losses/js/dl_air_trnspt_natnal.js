//Table 5
var app = angular.module('dlSummeryTANatApp', []);

app.controller("DlSummeryTANatController", ['$scope','$http',function ($scope,$http) {
    $scope.district;
    $scope.incident;
    $scope.bs_data={};
    $scope.province = "";
    $scope.is_edit = false;
    $scope.submitted = false;
    $scope.is_valid_data = true;
    $scope.totaldpub = null;
    $scope.totaldpvt = null;
    $scope.totalyear1pub = null;
    $scope.totalyear1pvt = null;
    $scope.totalyear2pub = null;
    $scope.totalyear2pvt = null;
    $scope.finaltotalpublic = null;
    $scope.finaltotalprivate = null;
    $scope.total_num_affected = 0;
    $scope.user_id;

    $scope.fetchDlData = function() {
        if($scope.incident) {
            $scope.is_edit = true;
            $scope.submitted = true;
            console.log($scope.incident);
            $http({
                method: "POST",
                url: '/dl_fetch_district_disagtn',
                data: angular.toJson({
                    'table_name': 'Table_5',
                    'sector': 'transport_air',
                    'com_data': {
                        'incident': $scope.incident,
                    },
                }),
            }).success(function(data) {
                console.log('load ', data);
                $scope.dlAirTransSumNat = data;
            })
        }
    }

    $scope.checkIfNull = function() {
        var isNull = $scope.dlAirTransSumNat ? angular.equals({}, $scope.dlAirTransSumNat.transport_air.Table_5) : true;
        return isNull;
    }

    $scope.totDmgPub = function() {
        if(!angular.isUndefined($scope.dlAirTransSumNat)) {
            var tot_dmg_pub = 0;
            angular.forEach($scope.dlAirTransSumNat.transport_air.Table_5, function(value, key, index) {
                angular.forEach(value, function(value_in, key_in) {
                    if(key_in == 'DlAirDmgPubNational') {
                        angular.forEach(value_in, function(row) {
                            tot_dmg_pub = tot_dmg_pub + row.tot_destroyed_pub;
                        })
                    }
                })
            })
            return tot_dmg_pub;
        }
    }

    $scope.totDmgPvt = function() {
        if(!angular.isUndefined($scope.dlAirTransSumNat)) {
            var tot_dmg_pvt = 0;
            angular.forEach($scope.dlAirTransSumNat.transport_air.Table_5, function(value, key, index) {
                angular.forEach(value, function(value_in, key_in) {
                    if(key_in == 'DlAirDmgPvtNational') {
                        angular.forEach(value_in, function(row) {
                            tot_dmg_pvt = tot_dmg_pvt + row.tot_destroyed_pvt;
                        })
                    }
                })
            })
            return tot_dmg_pvt;
        }
    }

    $scope.totLosY1Pub = function() {
        if(!angular.isUndefined($scope.dlAirTransSumNat)) {
            var tot_y1_pub = 0;
            angular.forEach($scope.dlAirTransSumNat.transport_air.Table_5, function(value, key, index) {
                angular.forEach(value, function(value_in, key_in) {
                    if(key_in == 'DlAirLosNational') {
                        angular.forEach(value_in, function(row) {
                            tot_y1_pub = tot_y1_pub + row.year_1_pub;
                        })
                    }
                })
            })
            return tot_y1_pub;
        }
    }

    $scope.totLosY1Pvt = function() {
        if(!angular.isUndefined($scope.dlAirTransSumNat)) {
            var tot_y1_pvt = 0;
            angular.forEach($scope.dlAirTransSumNat.transport_air.Table_5, function(value, key, index) {
                angular.forEach(value, function(value_in, key_in) {
                    if(key_in == 'DlAirLosNational') {
                        angular.forEach(value_in, function(row) {
                            tot_y1_pvt = tot_y1_pvt + row.year_1_pvt;
                        })
                    }
                })
            })
            return tot_y1_pvt;
        }
    }

    $scope.totLosY2Pub = function() {
        if(!angular.isUndefined($scope.dlAirTransSumNat)) {
            var tot_y2_pub = 0;
            angular.forEach($scope.dlAirTransSumNat.transport_air.Table_5, function(value, key, index) {
                angular.forEach(value, function(value_in, key_in) {
                    if(key_in == 'DlAirLosNational') {
                        angular.forEach(value_in, function(row) {
                            tot_y2_pub = tot_y2_pub + row.year_2_pub;
                        })
                    }
                })
            })
            return tot_y2_pub;
        }
    }

    $scope.totLosY2Pvt = function() {
        if(!angular.isUndefined($scope.dlAirTransSumNat)) {
            var tot_y2_pvt = 0;
            angular.forEach($scope.dlAirTransSumNat.transport_air.Table_5, function(value, key, index) {
                angular.forEach(value, function(value_in, key_in) {
                    if(key_in == 'DlAirLosNational') {
                        angular.forEach(value_in, function(row) {
                            tot_y2_pvt = tot_y2_pvt + row.year_2_pvt;
                        })
                    }
                })
            })
            return tot_y2_pvt;
        }
    }
 }])
