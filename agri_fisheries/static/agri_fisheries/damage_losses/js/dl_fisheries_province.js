//table 5
var app = angular.module('dlAgriFisheriesProApp', ['underscore']);
app.controller("DlAgriFisheriesProController", function ($scope, $http, $parse, _) {
    $scope.district;
    $scope.incident;
    $scope.bs_data={};
    $scope.province = "";
    $scope.is_edit = false;
    $scope.submitted = false;
    $scope.is_valid_data = true;
    var damagepublic = null;
    $scope.grnddamagepublic = null;
    var damageprivate = null;
    $scope.grnddamageprivate = null;
    var losPubliceyear1 = null;
    $scope.grndlosPubliceyear1 = null;
    $scope.grndlosPPrivateyear1 = null;
    $scope.grndlosPublicyear2 = null;
    $scope.grndlosPrivateyear2 = null;
    $scope.finalGrandTotPublic = null;
    $scope.finalGrandTotPrivate = null;
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
            console.log(data);
        })
    }

    $scope.fetchDlData = function(form) {
        if($scope.incident && $scope.province) {
            console.log($scope.province);
            console.log($scope.incident);
            $scope.is_edit = true;
            $scope.submitted = true;
            $http({
                method: "POST",
                url: '/dl_fetch_district_disagtn',
                data: angular.toJson({
                    'table_name': 'Table_5',
                    'sector': 'agri_fisheries',
                    'com_data': {
                        'province': $scope.province,
                        'incident': $scope.incident,
                    },
                }),
            }).success(function(data) {
                $scope.data = data;
                $scope.dlAgriFisheriesPro = data;
                console.log($scope.dlAgriFisheriesPro);
            })
        }
    }

    $scope.convertToInt = function(val1,val2,val3) {
        var sum = parseInt(val1) + parseInt(val2) + parseInt(val3);
        return sum;
    }

    $scope.convertTotal = function(val1,val2,val3,val4) {
        var sum = parseInt(val1) + parseInt(val2) + parseInt(val3) + parseInt(val4) ;
        return sum;
    }

    $scope.checkIfNull = function() {
        var isNull = $scope.dlAgriFisheriesPro ? angular.equals({}, $scope.dlAgriFisheriesPro.agri_fisheries.Table_5) : true;
        return isNull;
    }

    $scope.sumFunc2 = function(val1, val2) {
        if(val1 == null) {
            val1=0;
        }
        if(val2 == null) {
            val2=0;
        }

        var total = parseInt(val1) + parseInt(val2);
        return total;
    }

    $scope.getTotal = function(key) {
        $scope.finaltotalprivate = 0;
        var damagepublic =
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPubDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPubDistrict[0].dmg_pub ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPubDistrict[0].dmg_pub : 0) : 0 ) +

            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPubDistrict[1] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPubDistrict[1].dmg_pub ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPubDistrict[1].dmg_pub : 0):0) +

            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPubDistrict[2] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPubDistrict[2].dmg_pub ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPubDistrict[2].dmg_pub:0):0);


        var damagepublicstring = "damagepublic_" + key;

        var model = $parse(damagepublicstring);
        model.assign($scope, damagepublic);
        $scope.grnddamagepublic = $scope.grnddamagepublic + damagepublic ;

        var damageprivate =
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPvtDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPvtDistrict[0].dmg_pvt ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPvtDistrict[0].dmg_pvt : 0) : 0 ) +

            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPvtDistrict[1] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPvtDistrict[1].dmg_pvt ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPvtDistrict[1].dmg_pvt : 0):0) +

            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPvtDistrict[2] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPvtDistrict[2].dmg_pvt ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfDmgPvtDistrict[2].dmg_pvt:0):0);


        var damageprivatestring = "damageprivate_" + key;

        var model = $parse(damageprivatestring);
        model.assign($scope, damageprivate);

        $scope.grnddamageprivate = $scope.grnddamageprivate + damageprivate ;

        var losPubliceyear1 =
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosIfisheriesDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosIfisheriesDistrict[0].los_year_1_pub ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosIfisheriesDistrict[0].los_year_1_pub : 0) : 0 ) +

            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosRfisheriesDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosRfisheriesDistrict[0].los_year_1_pub ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosRfisheriesDistrict[0].los_year_1_pub : 0):0) +

            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosMfisheriesDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosMfisheriesDistrict[0].los_year_1_pub ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosMfisheriesDistrict[0].los_year_1_pub:0):0);


        var losPubliceyear1string = "losPubliceyear1_" + key;

        var model = $parse(losPubliceyear1string);
        model.assign($scope, losPubliceyear1);

        $scope.grndlosPubliceyear1 = $scope.grndlosPubliceyear1 + losPubliceyear1 ;

        var losPrivateyear1 =
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosIfisheriesDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosIfisheriesDistrict[0].los_year_1_pvt ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosIfisheriesDistrict[0].los_year_1_pvt : 0) : 0 ) +

            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosRfisheriesDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosRfisheriesDistrict[0].los_year_1_pvt ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosRfisheriesDistrict[0].los_year_1_pvt : 0):0) +

            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosMfisheriesDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosMfisheriesDistrict[0].los_year_1_pvt ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosMfisheriesDistrict[0].los_year_1_pvt:0):0);


        var losPrivateyear1string = "losPrivateyear1_" + key;

        var model = $parse(losPrivateyear1string);
        model.assign($scope, losPrivateyear1);

        $scope.grndlosPPrivateyear1 = $scope.grndlosPPrivateyear1 + losPrivateyear1 ;

        var losPublicyear2 =
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosIfisheriesDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosIfisheriesDistrict[0].los_year_2_pub ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosIfisheriesDistrict[0].los_year_2_pub : 0) : 0 ) +

            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosRfisheriesDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosRfisheriesDistrict[0].los_year_2_pub ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosRfisheriesDistrict[0].los_year_2_pub : 0):0) +

            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosMfisheriesDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosMfisheriesDistrict[0].los_year_2_pub ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosMfisheriesDistrict[0].los_year_2_pub:0):0);


        var losPublicyear2string = "losPublicyear2_" + key;

        var model = $parse(losPublicyear2string);
        model.assign($scope, losPublicyear2);

        $scope.grndlosPublicyear2 = $scope.grndlosPublicyear2 + losPublicyear2 ;

        var losPrivateyear2 =
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosIfisheriesDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosIfisheriesDistrict[0].los_year_2_pvt ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosIfisheriesDistrict[0].los_year_2_pvt : 0) : 0 ) +

            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosRfisheriesDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosRfisheriesDistrict[0].los_year_2_pvt ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosRfisheriesDistrict[0].los_year_2_pvt : 0):0) +

            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosMfisheriesDistrict[0] ?
            ($scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosMfisheriesDistrict[0].los_year_2_pvt ?
            $scope.dlAgriFisheriesPro.agri_fisheries.Table_5[key].DlfLosMfisheriesDistrict[0].los_year_2_pvt:0):0);


        var losPrivateyear2string = "losPrivateyear2_" + key;

        var model = $parse(losPrivateyear2string);
        model.assign($scope, losPrivateyear2);

        $scope.grndlosPrivateyear2 = $scope.grndlosPrivateyear2+ losPrivateyear2 ;

        $scope.finalGrandTotPublic =
        $scope.grnddamagepublic + $scope.grndlosPubliceyear1  + $scope.grndlosPublicyear2 ;

        $scope.finalGrandTotPrivate =
        $scope.grnddamageprivate + $scope.grndlosPPrivateyear1 + $scope.grndlosPrivateyear2;
    }

    $scope.getDmgPubGrndTot = function() {
        if(!angular.isUndefined($scope.dlAgriFisheriesPro)) {
            var tot_dmg_pub = 0;
            angular.forEach($scope.dlAgriFisheriesPro.agri_fisheries.Table_5, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(key == 'DlfDmgPubDistrict') {
                        angular.forEach(value_in, function(value_in_in) {
                            tot_dmg_pub = tot_dmg_pub + value_in_in.dmg_pub;
                        })
                    }
                })
            })
            return tot_dmg_pub;
        }
    }

    $scope.getDmgPvtGrndTot = function() {
        if(!angular.isUndefined($scope.dlAgriFisheriesPro)) {
            var tot_dmg_pvt = 0;
            angular.forEach($scope.dlAgriFisheriesPro.agri_fisheries.Table_5, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(key == 'DlfDmgPvtDistrict') {
                        angular.forEach(value_in, function(value_in_in) {
                            tot_dmg_pvt = tot_dmg_pvt + value_in_in.dmg_pvt;
                        })
                    }
                })
            })
            return tot_dmg_pvt;
        }
    }

    $scope.getLosYer1PubGrndTot = function() {
        if(!angular.isUndefined($scope.dlAgriFisheriesPro)) {
            var los_year_1_pub = 0;
            angular.forEach($scope.dlAgriFisheriesPro.agri_fisheries.Table_5, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(key == 'DlfLosIfisheriesDistrict') {
                        angular.forEach(value_in, function(value_in_in) {
                            los_year_1_pub = los_year_1_pub + value_in_in.los_year_1_pub;
                        })
                    }
                    if(key == 'DlfLosRfisheriesDistrict') {
                        angular.forEach(value_in, function(value_in_in) {
                            los_year_1_pub = los_year_1_pub + value_in_in.los_year_1_pub;
                        })
                    }
                    if(key == 'DlfLosMfisheriesDistrict') {
                        angular.forEach(value_in, function(value_in_in) {
                            los_year_1_pub = los_year_1_pub + value_in_in.los_year_1_pub;
                        })
                    }
                })
            })
            return los_year_1_pub;
        }
    }

    $scope.getLosYer1PvtGrndTot = function() {
        if(!angular.isUndefined($scope.dlAgriFisheriesPro)) {
            var los_year_1_pvt = 0;
            angular.forEach($scope.dlAgriFisheriesPro.agri_fisheries.Table_5, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(key == 'DlfLosIfisheriesDistrict') {
                        angular.forEach(value_in, function(value_in_in) {
                            los_year_1_pvt = los_year_1_pvt + value_in_in.los_year_1_pvt;
                        })
                    }
                    if(key == 'DlfLosRfisheriesDistrict') {
                        angular.forEach(value_in, function(value_in_in) {
                            los_year_1_pvt = los_year_1_pvt + value_in_in.los_year_1_pvt;
                        })
                    }
                    if(key == 'DlfLosMfisheriesDistrict') {
                        angular.forEach(value_in, function(value_in_in) {

                            los_year_1_pvt = los_year_1_pvt + value_in_in.los_year_1_pvt;
                        })
                    }
                })
            })
            return los_year_1_pvt;
        }
    }

    $scope.getLosYer2PubGrndTot = function() {
        if(!angular.isUndefined($scope.dlAgriFisheriesPro)) {
            var los_year_2_pub = 0;
            angular.forEach($scope.dlAgriFisheriesPro.agri_fisheries.Table_5, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(key == 'DlfLosIfisheriesDistrict') {
                        angular.forEach(value_in, function(value_in_in) {
                            los_year_2_pub = los_year_2_pub + value_in_in.los_year_2_pub;
                        })
                    }
                    if(key == 'DlfLosRfisheriesDistrict') {
                        angular.forEach(value_in, function(value_in_in) {
                            los_year_2_pub = los_year_2_pub + value_in_in.los_year_2_pub;
                        })
                    }
                    if(key == 'DlfLosMfisheriesDistrict') {
                        angular.forEach(value_in, function(value_in_in) {
                            los_year_2_pub = los_year_2_pub + value_in_in.los_year_2_pub;
                        })
                    }
                })
            })
            return los_year_2_pub;
        }
    }

    $scope.getLosYer2PvtGrndTot = function() {
        if(!angular.isUndefined($scope.dlAgriFisheriesPro)) {
            var los_year_2_pvt = 0;
            angular.forEach($scope.dlAgriFisheriesPro.agri_fisheries.Table_5, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(key == 'DlfLosIfisheriesDistrict') {
                        angular.forEach(value_in, function(value_in_in) {
                            los_year_2_pvt = los_year_2_pvt + value_in_in.los_year_2_pvt;
                        })
                    }
                    if(key == 'DlfLosRfisheriesDistrict') {
                        angular.forEach(value_in, function(value_in_in) {
                            los_year_2_pvt = los_year_2_pvt + value_in_in.los_year_2_pvt;
                        })
                    }
                    if(key == 'DlfLosMfisheriesDistrict') {
                        angular.forEach(value_in, function(value_in_in) {

                            los_year_2_pvt = los_year_2_pvt + value_in_in.los_year_2_pvt;
                        })
                    }
                })
            })
            return los_year_2_pvt;
        }
    }
 })
