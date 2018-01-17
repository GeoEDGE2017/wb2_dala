var app = angular.module('dlSummeryAgProApp', []);
app.controller("DlSummeryAgProController", ['$scope','$http',function ($scope,$http) {
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
    $scope.provinces;

    // get relevant damage_losses data for calculations
    $scope.changedValue = function getBsData(selectedValue) {
        if($scope.incident && selectedValue) {
            fetchProvinces();
        }
        if($scope.incident && $scope.province) {
            $scope.fetchDlData();
        }
    }

    function fetchProvinces() {
        $http({
            method: "POST",
            url: '/fetch_incident_provinces',
            data: angular.toJson({
                'incident': $scope.incident
            }),
        }).success(function(data) {
            $scope.provinces = data;
            $scope.province = null;
        })
    }

    $scope.fetchDlData = function(form){
        if($scope.incident && $scope.province){
            $scope.is_edit = true;
            $scope.submitted = true;
                $http({
                    method: "POST",
                    url: '/dl_fetch_district_disagtn',
                    data: angular.toJson({
                        'table_name': 'Table_9',
                        'sector': 'agri_agrarian',
                        'com_data': {
                            'province': $scope.province,
                            'incident': $scope.incident,
                         },
                    }),
                }).success(function(data) {
                    $scope.dlAgriAgrarianPro = data;
                    console.log($scope.dlAgriAgrarianPro);
                })
        }
    }

    $scope.totDmgPublic = function() {
        if(!angular.isUndefined($scope.dlAgriAgrarianPro)) {
            var totDmg = 0;
            angular.forEach($scope.dlAgriAgrarianPro.agri_agrarian.Table_9, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(key == 'DsorDmgPubProvince') {
                        totDmg = totDmg + value_in[0].damages;
                    }
                })
            })
            return totDmg;
        }
    }

    $scope.totDmgPrivate = function() {
        if(!angular.isUndefined($scope.dlAgriAgrarianPro)) {
            var totDmg = 0;
            angular.forEach($scope.dlAgriAgrarianPro.agri_agrarian.Table_9, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(key == 'DsorDmgPvtProvince') {
                        totDmg = totDmg + value_in[0].damages;
                    }
                })
            })
            return totDmg;
        }
    }

    $scope.totLosY1Public = function() {
        if(!angular.isUndefined($scope.dlAgriAgrarianPro)) {
            var totDmg = 0;
            angular.forEach($scope.dlAgriAgrarianPro.agri_agrarian.Table_9, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(key == 'DsorLosYear1Province') {
                        totDmg = totDmg + value_in[0].dmg_los_pub;
                    }
                })
            })
            return totDmg;
        }
    }

    $scope.totLosY1Private = function() {
        if(!angular.isUndefined($scope.dlAgriAgrarianPro)) {
            var totDmg = 0;
            angular.forEach($scope.dlAgriAgrarianPro.agri_agrarian.Table_9, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(key == 'DsorLosYear1Province') {
                        totDmg = totDmg + value_in[0].dmg_los_pvt;
                    }
                })
            })
            return totDmg;
        }
    }

    $scope.totLosY2Public = function() {
        if(!angular.isUndefined($scope.dlAgriAgrarianPro)) {
            var totDmg = 0;
            angular.forEach($scope.dlAgriAgrarianPro.agri_agrarian.Table_9, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(key == 'DsorLosYear2Province') {
                        totDmg = totDmg + value_in[0].dmg_los_pub;
                    }
                })
            })
            return totDmg;
        }
    }

    $scope.totLosY2Private = function() {
        if(!angular.isUndefined($scope.dlAgriAgrarianPro)) {
            var totDmg = 0;
            angular.forEach($scope.dlAgriAgrarianPro.agri_agrarian.Table_9, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(key == 'DsorLosYear2Province') {
                        totDmg = totDmg + value_in[0].dmg_los_pvt;
                    }
                })
            })
            return totDmg;
        }
    }

    $scope.checkIfNull = function() {
        var isNull = $scope.dlAgriAgrarianPro ? angular.equals({}, $scope.dlAgriAgrarianPro.agri_agrarian.Table_9) : true;
        return isNull;
    }
 }])
