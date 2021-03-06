//Table 4
var app = angular.module('dlSumLivestockPoultryDstApp', ['underscore'])

app.controller('dlSumLivestockPoultryDstController', function($scope, $http,$parse, _) {
    $scope.dlEduDistrict;
    $scope.total;
    $scope.iter_tot;
    $scope.district;
    $scope.bs_date;
    $scope.is_edit = false;
    $scope.submitted = false;
    $scope.isLoded = false;
    $scope.user_id;

    $scope.changedValue = function getDlData() {
        if ($scope.incident) {
            $http({
                method: "POST",
                url: '/fetch_incident_districts',
                data: angular.toJson({
                    'incident': $scope.incident,
                    'user': $scope.user_id
                }),
            }).success(function(data) {
                $scope.districts = data;
                $scope.district = "";
                console.log(data);
            })
        }
    }

    $scope.loadData = function(form) {
        if($scope.incident && $scope.district){
            $scope.isLoded = true;
            if(form.$valid) {
                $scope.tot_damages = null;
                $scope.is_edit = true;
                $scope.submitted = true;
                $http({
                    method: "POST",
                    url: '/dl_fetch_total_data',
                    data: angular.toJson({
                        'table_name': 'Table_4',
                        'sector': 'agri_livestock',
                        'com_data': {
                            'district': $scope.district.district__id,
                            'incident': $scope.incident,
                            'user_id' : $scope.user_id,
                        },
                        'is_edit': $scope.is_edit
                   }),
                }).success(function(data) {
                    $scope.data = data;
                    console.log('get',$scope.data);
                })
            }
         }
    }

    //Calculate Private Total
    $scope.calTotal = function(arr,property) {
        var finaltotal = 0;
        angular.forEach(arr, function(value, key) {
            if(value.animals != "Total"){
                finaltotal = finaltotal + $scope.convertToFloat(value[property]);
                console.log($scope.convertToFloat(value[property]));
            }
        })
        return finaltotal;
    }

    $scope.calTotal1 = function() {
        var finaltotal1 = 0;
        var finaltotal2 = 0;
        var garnd = 0;

        if($scope.data) {
            var arrayone = $scope.data.agri_livestock.Table_4.DlpNdaLivestockPubDistrict;
            var arraytwo = $scope.data.agri_livestock.Table_4.DlpNdaPoultryPubDistrict;
        }

        angular.forEach(arrayone, function(value, key) {
            if(value.animals != "Total") {
                finaltotal1 = finaltotal1 + value.damages;
            }
        })

        angular.forEach(arraytwo, function(value, key) {
            if(value.animals == "Total") {
                finaltotal2 = value.damages;
            }
        })

        garnd = finaltotal1 + finaltotal2;
        return garnd;
    }

    $scope.calTotal2 = function() {
        var finaltotal1 = 0;
        var finaltotal2 = 0;
        var garnd = 0;
        if($scope.data) {
            var arrayone = $scope.data.agri_livestock.Table_4.DlpNdaLivestockPvtDistrict;
            var arraytwo= $scope.data.agri_livestock.Table_4.DlpNdaPoultryPvtDistrict;
        }

        angular.forEach(arrayone, function(value, key) {
            if(value.animals != "Total") {
                finaltotal1 = finaltotal1 + value.damages;
            }
        })

        angular.forEach(arraytwo, function(value, key) {
            if(value.animals == "Total") {
                finaltotal2 = value.damages;
            }
        })

        garnd = finaltotal1 + finaltotal2;
        return garnd;
    }

    $scope.convertToFloat = function(val) {
        var total = 0;
        if(val == null || isNaN(val)) {
            val = 0;
        }

        total = parseFloat(val);
        return total;
    }
});
