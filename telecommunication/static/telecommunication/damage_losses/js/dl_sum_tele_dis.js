//Table 3
var app = angular.module('dlSumTeleDisApp', []);
app.controller("dlSumTeleDisController", ['$scope','$http',function ($scope,$http) {
    $scope.district;
    $scope.incident;
    $scope.dl_data={};
    $scope.is_edit=false;
    $scope.submitted = false;
    $scope.is_valid_data = true;
    $scope.districts=[];
    $scope.dlSummaryDis = null;
    $scope.tot_damages_pu = null;
    $scope.tot_damages_pv = null;
    $scope.year1_los_pu = null;
    $scope.year1_los_pv = null;
    $scope.year2_los_pu = null;
    $scope.year2_los_pv = null;
    $scope.pub_tot = null;
    $scope.pvt_tot = null;
    $scope.user_id;

    $scope.getDistrict = function getDistrict() {
        if($scope.incident) {
            $http({
                method: "POST",
                url: "/fetch_incident_districts",
                data: angular.toJson({
                    'incident': $scope.incident,
                    'user': $scope.user_id,
                }),
            }).success(function(data) {
                $scope.districts = data;
                $scope.district = "";
                console.log(data);
            })
        }
    }

    $scope.changedValue = function getBsData() {
        if($scope.incident && $scope.district) {
            $scope.submitted = true;
            $scope.tot_damages = null;
            $scope.is_edit = true;
            $scope.submitted = true;
            $http({
                method: "POST",
                url: '/dl_fetch_total_data',
                data: angular.toJson({
                    'table_name':'Table_3',
                    'sector':'telecommunication',
                    'com_data': {
                        'district':  $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                }),
            }).success(function(data) {
                $scope.data=data;
//                $scope.dlWaterSupplyDis = data;
                console.log($scope.data);
            })
        }
    }

    $scope.loadData = function(form) {
        $scope.submitted = true;
        if(form.$valid) {
            $scope.dlSummaryDis = null;

            $scope.tot_damages_pu = null;
            $scope.tot_damages_pv = null;
            $scope.year1_los_pu = null;
            $scope.year1_los_pv = null;
            $scope.year2_los_pu = null;
            $scope.year2_los_pv = null;
            $scope.pub_tot = null;
            $scope.pvt_tot = null

            $scope.tot_damages = null;
            $scope.is_edit = true;
            $scope.submitted = true;
            $http({
                method: "POST",
                url: '/dl_fetch_total_data',
                data: angular.toJson({
                    'table_name':  'Table_3',
                    'sector': 'telecommunication',
                    'com_data': {
                        'district':  $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                }),
            }).success(function(data) {
                console.log(data);
                $scope.dlSummaryDis = data;
            })
        }
    }

    $scope.getTotal = function($index) {
        var ownership = $scope.dlSummaryDis.telecommunication.Table_3.DlDmgFirmDistrict[$index].ownership;

        if(ownership == 'Public') {
            $scope.tot_damages_pu = $scope.tot_damages_pu + ($scope.dlSummaryDis.telecommunication.Table_3.DlDmgFirmDistrict[$index]?
            ($scope.dlSummaryDis.telecommunication.Table_3.DlDmgFirmDistrict[$index].tot_damages ?
            $scope.dlSummaryDis.telecommunication.Table_3.DlDmgFirmDistrict[$index].tot_damages : 0) :0);

            $scope.year1_los_pu = $scope.year1_los_pu + ($scope.dlSummaryDis.telecommunication.Table_3.LosFirmYear1District[$index]?
            ($scope.dlSummaryDis.telecommunication.Table_3.LosFirmYear1District[$index].year1_los ?
            $scope.dlSummaryDis.telecommunication.Table_3.LosFirmYear1District[$index].year1_los : 0):0);

            $scope.year2_los_pu =  $scope.year2_los_pu + ($scope.dlSummaryDis.telecommunication.Table_3.LosFirmYear2District[$index]?
            ($scope.dlSummaryDis.telecommunication.Table_3.LosFirmYear2District[$index].year2_los ?
            $scope.dlSummaryDis.telecommunication.Table_3.LosFirmYear2District[$index].year2_los : 0) :0);
        }
        else if(ownership == 'Private') {
            $scope.tot_damages_pv = $scope.tot_damages_pv +  ($scope.dlSummaryDis.telecommunication.Table_3.DlDmgFirmDistrict[$index]?
            ($scope.dlSummaryDis.telecommunication.Table_3.DlDmgFirmDistrict[$index].tot_damages ?
             $scope.dlSummaryDis.telecommunication.Table_3.DlDmgFirmDistrict[$index].tot_damages : 0 ):0);

            $scope.year1_los_pv = $scope.year1_los_pv + ($scope.dlSummaryDis.telecommunication.Table_3.LosFirmYear1District[$index] ?
            ($scope.dlSummaryDis.telecommunication.Table_3.LosFirmYear1District[$index].year1_los ?
            $scope.dlSummaryDis.telecommunication.Table_3.LosFirmYear1District[$index].year1_los : 0) :0);

            $scope.year2_los_pv = $scope.year2_los_pv +
            ($scope.dlSummaryDis.telecommunication.Table_3.LosFirmYear2District[$index]?
            ($scope.dlSummaryDis.telecommunication.Table_3.LosFirmYear2District[$index].year2_los ?
             $scope.dlSummaryDis.telecommunication.Table_3.LosFirmYear2District[$index].year2_los : 0 ):0);

             console.log('test',$scope.dlSummaryDis.telecommunication.Table_3.LosFirmYear2District[$index].year2_los);

        }

        $scope.pub_tot = $scope.tot_damages_pu + $scope.year1_los_pu + $scope.year2_los_pu;
        $scope.pvt_tot = $scope.tot_damages_pv + $scope.year1_los_pv + $scope.year2_los_pv;
    }
}])

