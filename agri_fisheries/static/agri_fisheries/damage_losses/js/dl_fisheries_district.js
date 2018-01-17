//Table 3
var app = angular.module('dlFisheriesDistrictApp', ['underscore'])
app.controller('dlFisheriesDistrictController', function($scope, $http, $parse, _) {
    $scope.district;
    $scope.selectedDistrict;
    $scope.incident;
    $scope.fishing_types;
    $scope.dlDate;
    $scope.bs_data={};
    $scope.baselineDate;
    $scope.is_edit = false;
    $scope.is_valid_data = true;
    $scope.is_null = false;
    $scope.grantot = null;
    $scope.user_id;
    $scope.fishing_type;
    $scope.check_search = false;
    $scope.is_search = false;
    $scope.bsCreatedeDate;

    //Initialize data
    var init_data = {
        'agri_fisheries' : {
            'Table_3': {
                //Tab 1
                'DlfDmgFequipment' :[{
                    assets : 'Boats',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Engines',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Nets',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Traps and Cages',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Gears',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                'DlfDmgOequipment' : [{
                    assets : 'Computers',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Furniture',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Office supplies',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                'DlfDmgMachinery' : [{
                    assets : 'Vehicles',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                'DlfDmgStructures' : [{
                    assets : 'Harbour',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Cold storage',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                'DlfDmgPub': [{
                    assets : '1 floor',
                    tot_dest_num : null,
                    tot_dest_sqm : null,
                    pdmg_num : null,
                    pdmg_roof : null,
                    pdmg_wall : null,
                    pdmg_floor : null,
                    total : null,
                }, {
                    assets : '2-3 floors',
                    tot_dest_num : null,
                    tot_dest_sqm : null,
                    pdmg_num : null,
                    pdmg_roof : null,
                    pdmg_wall : null,
                    pdmg_floor : null,
                    total : null,
                }, {
                    assets : 'More than 3 floors',
                    tot_dest_num : null,
                    tot_dest_sqm : null,
                    pdmg_num : null,
                    pdmg_roof : null,
                    pdmg_wall : null,
                    pdmg_floor : null,
                    total : null,
                },  {
                    assets : 'Total',
                    tot_dest_num : null,
                    tot_dest_sqm : null,
                    pdmg_num : null,
                    pdmg_roof : null,
                    pdmg_wall : null,
                    pdmg_floor : null,
                    total : null,
                }],
                'DlfDmgPvt': [{
                    assets : '1 floor',
                    tot_dest_num : null,
                    tot_dest_sqm : null,
                    pdmg_num : null,
                    pdmg_roof : null,
                    pdmg_wall : null,
                    pdmg_floor : null,
                    total : null,
                }, {
                    assets : '2-3 floors',
                    tot_dest_num : null,
                    tot_dest_sqm : null,
                    pdmg_num : null,
                    pdmg_roof : null,
                    pdmg_wall : null,
                    pdmg_floor : null,
                    total : null,
                }, {
                    assets : 'More than 3 floors',
                    tot_dest_num : null,
                    tot_dest_sqm : null,
                    pdmg_num : null,
                    pdmg_roof : null,
                    pdmg_wall : null,
                    pdmg_floor : null,
                    total : null,
                }, {
                    assets : 'Total',
                    tot_dest_num : null,
                    tot_dest_sqm : null,
                    pdmg_num : null,
                    pdmg_roof : null,
                    pdmg_wall : null,
                    pdmg_floor : null,
                    total : null,
                }],
                //Tab 2
                'DlfLosIfisheries': [{
                    assets : 'Percentage Reduction in Value of Yield (%)',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Production losses (Private)',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Cleaning costs',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Higher operating expenses',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Other unexpected expenses',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Total',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }],
                'DlfLosRfisheries': [{
                    assets : 'Percentage Reduction in Value of Yield (%)',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Production losses',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Cleaning costs',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Higher operating expenses',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Other unexpected expenses',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Total',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }],
                'DlfLosMfisheries': [{
                    assets : 'Percentage Reduction in Value of Yield (%)',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Production losses',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Cleaning costs',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Higher operating expenses',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Other unexpected expenses',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }, {
                    assets : 'Total',
                    los_year_1_pub : null,
                    los_year_1_pvt : null,
                    los_year_2_pub : null,
                    los_year_2_pvt : null,
                    los_pub : null,
                    los_pvt : null,
                }],
            }
        }
    }

    $scope.dlFisheriesDistrict = angular.copy(init_data);

    //Get Districts and baseline related data
    $scope.changedValue = function getBsData(selectedValue) {
        if($scope.incident && selectedValue) {
            $http({
                method: "POST",
                url: "/fetch_incident_districts",
                data: angular.toJson({
                    'incident': $scope.incident,
                    'user': $scope.user_id
                }),
            }).success(function(data) {
                $scope.districts = data;
                $scope.selectedDistrict = "";
                console.log(data);
            })
        }

        if($scope.incident && $scope.district) {
            $scope.is_edit_disable = true;
            $scope.check_search = true;

            $http({
                method: 'POST',
                url: '/bs_get_data_mock',
                contentType: 'application/json; charset=utf-8',
                data: angular.toJson({
                    'db_tables': ['BifAstFequipment', 'BifAstOequipment', 'BifAstMachinery', 'BifAstStructures',
                        'BifAstBuildings', 'BifProduction'],
                    'com_data': {
                        'district': $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                    'table_name': 'Table_2',
                    'sector': 'agri_fisheries',
                }),
                dataType: 'json',
            }).then(function successCallback(response) {
                var data = response.data;

                angular.forEach(data, function(value, key) {
                    $scope.bs_data[key] = JSON.parse(value);
                });

                var is_null = false;
                angular.forEach($scope.bs_data, function(value, index) {
                    if(value == null) {
                        is_null = true;
                    }
                })

                if(is_null == true) {
                    $("#modal-container-239458").modal('show');
                    console.log('baseline table or tables are empty');
                    console.log($scope.bs_data);
                    $scope.currentBaselineDate = null;
                }
                else {
                    $http({
                        method: 'POST',
                        url: '/get_latest_bs_date',
                        contentType: 'application/json; charset=utf-8',
                        data: angular.toJson({
                            'com_data': {
                                'district': $scope.district.district__id,
                                'incident': $scope.incident,
                            },
                            'table_name': 'Table_2',
                            'sector': 'agri_fisheries'
                        }),
                        dataType: 'json',
                    }).then(function successCallback(response) {
                        console.log('response', response);
                        var result = response.data;
                        if(result.bs_date == null) {
                            $("#modal-container-239458").modal('show');
                        }
                        else {
                            var bs_date = result.bs_date.replace(/^"(.*)"$/, '$1');
                            $scope.currentBaselineDate = "Latest baseline data as at " + bs_date;
                            $scope.bsCreatedeDate = result.bs_created_date;
                            console.log('bs_date', result.bs_date);
                            console.log('bsCreatedeDate', result.bs_created_date);
                            generateRefencedData();
                        }
                    });
                }
            }, function errorCallback(response) {

            });
        }
    }

    //Get Fishing Types
    $scope.getFishingTypes = function(form) {
        $http({
            method: "POST",
            url: "fetch_fishing_types",
            data: angular.toJson(),

        }).success(function(data) {
            $scope.fishing_types = data;
        })
    }

    //Generate fields from baseline Data
    function generateRefencedData() {
        data_array = ['BifAstFequipment','BifAstOequipment','BifAstMachinery','BifAstStructures','BifProduction'];

        var dl_model1 = null;
        var dl_model2 = null;
        var dl_model3 = null;
        var dl_model4 = null;

        angular.forEach(data_array, function(value, key) {
            obj_array = $scope.bs_data[value];
            model_name = value;

            var particular_value_1 = null;
            var particular_value_2 = null;
            var particular_value_3 = null;
            var particular_value_4 = null;

            if(model_name == 'BifAstFequipment') {
                dl_model1 = 'DlfDmgFequipment';
                particular_value_1 = 'Total';
                $scope.dlFisheriesDistrict.agri_fisheries.Table_3[dl_model1] = [];
            }
            if(model_name == 'BifAstOequipment') {
                dl_model2 = 'DlfDmgOequipment';
                particular_value_2 = 'Total';
                $scope.dlFisheriesDistrict.agri_fisheries.Table_3[dl_model2] = [];
            }
            if(model_name == 'BifAstMachinery') {
                dl_model3 = 'DlfDmgMachinery';
                particular_value_3 = 'Total';
                $scope.dlFisheriesDistrict.agri_fisheries.Table_3[dl_model3] = [];
            }
            if(model_name == 'BifAstStructures') {
                dl_model4 = 'DlfDmgStructures';
                particular_value_4 = 'Total';
                $scope.dlFisheriesDistrict.agri_fisheries.Table_3[dl_model4] = [];
            }

            var obj1 = {
                assets : particular_value_1,
                dmg_dest_pub : null,
                dmg_dst_pvt : null,
                dmg_pdmg_pub : null,
                dmg_pdmg_pvt : null,
                dmg_pub : null,
                dmg_pvt : null,
            };
            var obj2 = {
                assets : particular_value_2,
                dmg_dest_pub : null,
                dmg_dst_pvt : null,
                dmg_pdmg_pub : null,
                dmg_pdmg_pvt : null,
                dmg_pub : null,
                dmg_pvt : null,
            };
            var obj3 = {
                assets : particular_value_3,
                if_avg_replace_cost : null,
                if_avg_repair_cost : null,
                rf_avg_replace_cost : null,
                rf_avg_repair_cost : null,
                mf_avg_replace_cost : null,
                mf_avg_repair_cost : null,
            };
            var obj4 = {
                assets : particular_value_4,
                if_avg_replace_cost : null,
                if_avg_repair_cost : null,
                rf_avg_replace_cost : null,
                rf_avg_repair_cost : null,
                mf_avg_replace_cost : null,
                mf_avg_repair_cost : null,
            };

            angular.forEach(obj_array, function(value, key) {
                var obj1 = {
                    assets : value.fields.assets,
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                };
                var obj2 = {
                    assets : value.fields.assets,
                    dmg_dest_pub : null,
                    dmg_dst_pvt : null,
                    dmg_pdmg_pub : null,
                    dmg_pdmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                };
                var obj3 = {
                    assets : value.fields.assets,
                    if_avg_replace_cost : null,
                    if_avg_repair_cost : null,
                    rf_avg_replace_cost : null,
                    rf_avg_repair_cost : null,
                    mf_avg_replace_cost : null,
                    mf_avg_repair_cost : null,
                };
                var obj4 = {
                    assets : value.fields.assets,
                    if_avg_replace_cost : null,
                    if_avg_repair_cost : null,
                    rf_avg_replace_cost : null,
                    rf_avg_repair_cost : null,
                    mf_avg_replace_cost : null,
                    mf_avg_repair_cost : null,
                };

                if(model_name == 'BifAstFequipment') {
                    $scope.dlFisheriesDistrict.agri_fisheries.Table_3[dl_model1].push(obj1);
                }
                if(model_name == 'BifAstOequipment') {
                    $scope.dlFisheriesDistrict.agri_fisheries.Table_3[dl_model2].push(obj2);
                }
                if(model_name == 'BifAstMachinery') {
                    $scope.dlFisheriesDistrict.agri_fisheries.Table_3[dl_model3].push(obj3);
                }
                if(model_name == 'BifAstStructures') {
                    $scope.dlFisheriesDistrict.agri_fisheries.Table_3[dl_model4].push(obj4);
                }
            });
            if(model_name == 'BifAstFequipment') {
               $scope.dlFisheriesDistrict.agri_fisheries.Table_3[dl_model1].push(obj1);
            }
            if(model_name == 'BifAstOequipment') {
               $scope.dlFisheriesDistrict.agri_fisheries.Table_3[dl_model2].push(obj2);
            }
            if(model_name == 'BifAstMachinery') {
               $scope.dlFisheriesDistrict.agri_fisheries.Table_3[dl_model3].push(obj3);
            }
            if(model_name == 'BifAstStructures') {
               $scope.dlFisheriesDistrict.agri_fisheries.Table_3[dl_model4].push(obj4);
            }
        });
    }

    //Save Data
    $scope.saveDlData = function(form) {
        $scope.submitted = true;
        if(form.$valid) {
            $http({
                method: 'POST',
                url: '/dl_save_data',
                contentType: 'application/json; charset=utf-8',
                data: angular.toJson({
                    'table_data': $scope.dlFisheriesDistrict,
                    'com_data': {
                        'district_id': $scope.district.district__id,
                        'incident_id': $scope.incident,
                        'user_id' : $scope.user_id,
                        'ftype_id': $scope.fishing_type.id,
                    },
                    'bs_date': $scope.bsCreatedeDate,
                    'is_edit' : $scope.is_edit,
                }),
                dataType: 'json',
            }).then(function successCallback(response) {
                if(response.data == 'False') {
                    $scope.is_valid_data = false;
                    $("#modal-container-239454").modal('show');
                }
                else {
                    $("#modal-container-239453").modal('show');
                }
            }, function errorCallback(response) {

            });
        }
    }

    //Calculate total
    $scope.CalTot = function(arr,property) {
        var finaltotal = 0;
        angular.forEach(arr, function(value, key) {
            if(value.assets != 'Total' && value.assets != 'Percentage Reduction in Value of Yield (%)') {
                finaltotal = finaltotal + value[property];
            }
        })
        return finaltotal;
    }

    $scope.CalTote = function(arr,property) {
        var finaltotal = 0;
        angular.forEach(arr, function(value, key) {
            if(value.assets != 'Total'){
                finaltotal = finaltotal + value[property] ;
            }
        })
        return finaltotal;
    }

    //Calculate Grand Total
    $scope.calGrandPubTotal = function(){
        var finaltotal1 = 0;
        var finaltotal2 = 0;
        var finaltotal3 = 0;
        var finaltotal4 = 0;
        var finaltotal5 = 0;
        var grantot = 0;

        var array1 = $scope.dlFisheriesDistrict.agri_fisheries.Table_3.DlfDmgFequipment;
        var array2 = $scope.dlFisheriesDistrict.agri_fisheries.Table_3.DlfDmgOequipment;
        var array3 = $scope.dlFisheriesDistrict.agri_fisheries.Table_3.DlfDmgMachinery;
        var array4 = $scope.dlFisheriesDistrict.agri_fisheries.Table_3.DlfDmgStructures;
        var array5 = $scope.dlFisheriesDistrict.agri_fisheries.Table_3.DlfDmgPub;

        console.log($scope.dlFisheriesDistrict.agri_fisheries.Table_3.DlfDmgFequipment);

        angular.forEach(array1, function(value, key) {
            if(value.assets != 'Total'){
                finaltotal1 = finaltotal1 + value.dmg_pub ;
             }
        })
        angular.forEach(array2, function(value, key) {
            if(value.assets != 'Total'){
                finaltotal2 = finaltotal2 + value.dmg_pub ;
             }
        })
        angular.forEach(array3, function(value, key) {
            if(value.assets != 'Total'){
                finaltotal3 = finaltotal3 + value.dmg_pub ;
             }
        })
        angular.forEach(array4, function(value, key) {
            if(value.assets != 'Total'){
                finaltotal4 = finaltotal4 + value.dmg_pub ;
             }
        })
         angular.forEach(array5, function(value, key) {
            if(value.assets != 'Total'){
                finaltotal5 = finaltotal5 + value.total ;
             }
        })

        grantot = finaltotal1 +  finaltotal2 + finaltotal3 + finaltotal4 + finaltotal5;
        return grantot;
    }

    $scope.calGrandPvtTotal = function() {
        var finaltotal1 = 0;
        var finaltotal2 = 0;
        var finaltotal3 = 0;
        var finaltotal4 = 0;
        var finaltotal5 = 0;
        var finaltotal6 = 0;
        var finaltotal7 = 0;
        var grantot = 0;
        var array1 = $scope.dlFisheriesDistrict.agri_fisheries.Table_3.DlfDmgFequipment;
        var array2 = $scope.dlFisheriesDistrict.agri_fisheries.Table_3.DlfDmgOequipment;
        var array3 = $scope.dlFisheriesDistrict.agri_fisheries.Table_3.DlfDmgMachinery;
        var array4 = $scope.dlFisheriesDistrict.agri_fisheries.Table_3.DlfDmgStructures;
        var array5 = $scope.dlFisheriesDistrict.agri_fisheries.Table_3.DlfDmgPvt;

        angular.forEach(array1, function(value, key) {
            if(value.assets != 'Total'){
                finaltotal1 = finaltotal1 + value.dmg_pvt ;
            }
        })

        angular.forEach(array2, function(value, key) {
            if(value.assets != 'Total') {
                finaltotal2 = finaltotal2 + value.dmg_pvt ;
            }
        })

        angular.forEach(array3, function(value, key) {
            if(value.assets != 'Total') {
                finaltotal3 = finaltotal3 + value.dmg_pvt ;
            }
        })

        angular.forEach(array4, function(value, key) {
            if(value.assets != 'Total') {
                finaltotal4 = finaltotal4 + value.dmg_pvt ;
            }
        })

        angular.forEach(array5, function(value, key) {
            if(value.assets != 'Total') {
                finaltotal5 = finaltotal5 + value.total ;
            }
        })
        grantot = finaltotal1 + finaltotal2 + finaltotal3 + finaltotal4 + finaltotal5;
        return grantot;
    }

    //Edit Data
    $scope.editDlData = function(form) {
        $scope.is_edit = true;
        $scope.submitted = true;
        document.getElementById("clearbtn").disabled = true;

        if(form.$valid) {
            $http({
                method: "POST",
                url: '/dl_fetch_edit_data',
                data: angular.toJson({
                    'table_name': 'Table_3',
                    'sector': 'agri_fisheries',
                    'com_data': {
                        'district': $scope.district.district__id,
                        'incident': $scope.incident,
                        'ftype_id': $scope.fishing_type.id,
                    },
                    'is_edit':$scope.is_edit
                }),
            }).success(function(data) {
                $scope.dlFisheriesDistrict = data;
                console.log($scope.dlFisheriesDistrict);
            })
        }
    }

    //Search Data
    $scope.searchDlData = function(form){
        document.getElementById("clearbtn").disabled = true;
		document.getElementById("editbtn").disabled = true;
		document.getElementById("subbtn").disabled = true;

		$scope.is_search = true;
        if(form.$valid) {
            $http({
                method: "POST",
                url: '/dl_fetch_edit_data',
                data: angular.toJson({
                    'table_name': 'Table_3',
                    'sector': 'agri_fisheries',
                    'com_data': {
                       'district': $scope.district.district__id,
                       'incident': $scope.incident,
                       'ftype_id': $scope.fishing_type.id,
                    },
                    'is_edit':$scope.is_edit
                }),
            }).success(function(data) {
                console.log(data);
                $scope.dlFisheriesDistrict = data;
            })
        }
    }

    //Cancel Edit
    $scope.cancelEdit = function() {
        $scope.is_edit = false;
        $scope.dlFisheriesDistrict = init_data;
        location.reload();
    }

    //Clear Function
    $scope.clear = function() {
        console.log('done');
        $scope.is_edit = false;
        $scope.dlFisheriesDistrict = angular.copy(init_data);
        location.reload();
    }

    $scope.convertToFloat = function(val) {
        var total = 0;
        if(val == null || isNaN(val)) {
            val=0;
        }

        total = parseFloat(val);
        return total;
    }
});
