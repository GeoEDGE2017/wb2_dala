//Table 3
var app = angular.module('dlIrrigationApp', [])

app.controller('dlIrrigationController', ['$scope', '$http', function($scope, $http) {
    $scope.district;
    $scope.selectedDistrict;
    $scope.incident;
    $scope.dlDate;
    $scope.bs_data={};
    $scope.baselineDate;
    $scope.is_edit = false;
    $scope.is_valid_data = true;
    $scope.is_null = false;
    $scope.currentBaselineDate = null;
    $scope.user_id;
    $scope.check_search = false;
    $scope.is_search = false;

    //Initialize Data
    var init_data = {
        'agri_irrigation': {
            'Table_3': {
                //Tab 1     DlMajorTanks, DlMediumTanks, DlMinorTanks, DlAnicuts, DlOtherStructures, DlRiverEmbankmnt, DlBuildings
                'DlMajorTanks': [{
                    irrigation_assets : 'Bund',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Riprap',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Spill',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Main Canals',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Distributor Canals',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                }, {
                    irrigation_assets : 'Field Canals',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Total',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                'DlMediumTanks': [{
                    irrigation_assets : 'Bund',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                }, {
                    irrigation_assets : 'Riprap',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Spill',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Main Canals',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Distributor Canals',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Field Canals',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Total',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                'DlMinorTanks': [{
                    irrigation_assets : 'Bund',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Riprap',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Spill',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Main Canals',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Distributor Canals',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Field Canals',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Total',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                'DlAnicuts': [{
                    irrigation_assets : 'Bund',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Riprap',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Spill',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Main Canals',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Distributor Canals',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Field Canals',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Total',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                'DlOtherStructures': [{
                    irrigation_assets : 'Roads',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Bridges',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Culverts',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Causeways',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Retaining walls',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Interlock pavings',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Regulators',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Turnout',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Drops',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Retaining walls',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Canal linings',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Canal spill',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Under Crossing',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Over crossing',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Total',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                'DlRiverEmbankmnt': [{
                    irrigation_assets : 'River Embankments',
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                'DlBuildings': [{
                    building : '1 floor',
                    part_damaged_num : null,
                    part_damaged_roof : null,
                    part_damaged_wall : null,
                    part_damaged_floor : null,
                    tot_destroyed_num : null,
                    tot_destroyed_area : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    building : '2-3 floors',
                    part_damaged_num : null,
                    part_damaged_roof : null,
                    part_damaged_wall : null,
                    part_damaged_floor : null,
                    tot_destroyed_num : null,
                    tot_destroyed_area : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    building : 'More than 3 floors',
                    part_damaged_num : null,
                    part_damaged_roof : null,
                    part_damaged_wall : null,
                    part_damaged_floor : null,
                    tot_destroyed_num : null,
                    tot_destroyed_area : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    building : 'Total',
                    part_damaged_num : null,
                    part_damaged_roof : null,
                    part_damaged_wall : null,
                    part_damaged_floor : null,
                    tot_destroyed_num : null,
                    tot_destroyed_area : null,
                    damages : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                //Tab 2     DlLosMajorTanks, DlLosMediumTanks, DlLosMinorTanks, DlLosAnicuts, DlLosOther
                'DlLosMajorTanks': [{
                    irrigation_assets : 'Tank 1',
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Tank 2',
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                'DlLosMediumTanks':[{
                    irrigation_assets : 'Tank 1',
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Tank 2',
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                'DlLosMinorTanks':[{
                    irrigation_assets : 'Tank 1',
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Tank 2',
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                'DlLosAnicuts':[{
                    irrigation_assets : 'Anicut 1',
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'Anicut 2',
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                'DlLosOther':[{
                    irrigation_assets : 'Other Structures',
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_assets : 'River Embankments',
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                    division:$scope.division,
                    region:$scope.region,

                }, {
                    irrigation_assets : 'Buildings',
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                }, {
                    irrigation_assets : 'TOTAL LOSSES',
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
            }
        }
    }

    $scope.dlIrrigation = angular.copy(init_data);

    //Get Districts and get Baseline Data
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
            })
        }

        if($scope.incident && $scope.district ) {
            $scope.check_search = true;
            $http({
                method: 'POST',
                url: '/bs_get_data_mock',
                contentType: 'application/json; charset=utf-8',
                data: angular.toJson({
                    'db_tables': ['BsIfMajor', 'BsIfMedium', 'BsIfMinor', 'BsIfAnicuts', 'BsRciaMajorTanks',
                        'BsRciaMediumTanks', 'BsRciaMinorTanks', 'BsRciaAnicuts', 'BsRciaOtherStructures',
                        'BsRciRiverEmbankmnt','BsRciBuildings'],
                    'com_data': {
                        'district': $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                    'table_name': 'Table_1',
                    'sector':'agri_irrigation',
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
                            'table_name': 'Table_1',
                            'sector': 'agri_irrigation'
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

    //Get related Baseline Data
    function generateRefencedData() {
        data_array = ['BsIfMajor', 'BsIfMedium', 'BsIfMinor', 'BsIfAnicuts', 'BsRciaMajorTanks', 'BsRciaMediumTanks', 'BsRciaMinorTanks', 'BsRciaAnicuts', 'BsRciaOtherStructures', 'BsRciRiverEmbankmnt'];

        var dl_model1 = null;
        var dl_model2 = null;
        var dl_model3 = null;
        var dl_model4 = null;
        var dl_model5 = null;
        var dl_model6 = null;
        var dl_model7 = null;
        var dl_model8 = null;
        var dl_model9 = null;

        angular.forEach(data_array, function(value, key) {
            obj_array = $scope.bs_data[value];
            console.log('iri',obj_array);
            model_name = value;

            var particular_value_1 = null;
            var particular_value_2 = null;
            var particular_value_3 = null;
            var particular_value_4 = null;
            var particular_value_5 = null;
            var particular_value_6 = null;
            var particular_value_7 = null;
            var particular_value_8 = null;
            var particular_value_9 = null;

            if(model_name == 'BsRciaMajorTanks') {
               dl_model1 = 'DlMajorTanks';
               particular_value_1 = 'Total';
               $scope.dlIrrigation.agri_irrigation.Table_3[dl_model1] = [];
            }
            if(model_name == 'BsRciaMediumTanks') {
               dl_model2 = 'DlMediumTanks';
               particular_value_2 = 'Total';
               $scope.dlIrrigation.agri_irrigation.Table_3[dl_model2] = [];
            }
            if(model_name == 'BsRciaMinorTanks') {
               dl_model3 = 'DlMinorTanks';
               particular_value_3 = 'Total';
               $scope.dlIrrigation.agri_irrigation.Table_3[dl_model3] = [];
            }
            if(model_name == 'BsRciaAnicuts') {
               dl_model4 = 'DlAnicuts';
               particular_value_4 = 'Total';
               $scope.dlIrrigation.agri_irrigation.Table_3[dl_model4] = [];
            }
            if(model_name == 'BsRciaOtherStructures') {
               dl_model5 = 'DlOtherStructures';
               particular_value_5 = 'Total';
               $scope.dlIrrigation.agri_irrigation.Table_3[dl_model5] = [];
            }

            if(model_name == 'BsIfMajor') {
                dl_model6 = 'DlLosMajorTanks';
                $scope.dlIrrigation.agri_irrigation.Table_3[dl_model6] = [];
            }
            if(model_name == 'BsIfMedium') {
                dl_model7 = 'DlLosMediumTanks';
                $scope.dlIrrigation.agri_irrigation.Table_3[dl_model7] = [];
            }
            if(model_name == 'BsIfMinor') {
                dl_model8 = 'DlLosMinorTanks';
                $scope.dlIrrigation.agri_irrigation.Table_3[dl_model8] = [];
            }
            if(model_name == 'BsIfAnicuts') {
                dl_model9 = 'DlLosAnicuts';
                $scope.dlIrrigation.agri_irrigation.Table_3[dl_model9] = [];
            }

            var obj1 = {
                irrigation_assets : particular_value_1,
                partially_damaged : null,
                totally_destroyed : null,
                damages : null,
            };
            var obj2 = {
                irrigation_assets : particular_value_2,
                partially_damaged : null,
                totally_destroyed : null,
                damages : null,
            };
            var obj3 = {
                irrigation_assets : particular_value_3,
                partially_damaged : null,
                totally_destroyed : null,
                damages : null,
            };
            var obj4 = {
                irrigation_assets : particular_value_4,
                partially_damaged : null,
                totally_destroyed : null,
                damages : null,
            };
            var obj5 = {
                irrigation_assets : particular_value_5,
                partially_damaged : null,
                totally_destroyed : null,
                damages : null,
            };

            angular.forEach(obj_array, function(value, key) {
                var obj1 = {
                    irrigation_assets : value.fields.irrigation_facility,
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                };
                var obj2 = {
                    irrigation_assets : value.fields.irrigation_facility,
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                };
                var obj3 = {
                    irrigation_assets : value.fields.irrigation_facility,
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                };
                var obj4 = {
                    irrigation_assets : value.fields.irrigation_facility,
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                };
                var obj5 = {
                    irrigation_assets : value.fields.irrigation_facility,
                    partially_damaged : null,
                    totally_destroyed : null,
                    damages : null,
                };

                var obj6 = {
                    irrigation_assets : value.fields.irrigation_facility,
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                };
                var obj7 = {
                    irrigation_assets : value.fields.irrigation_facility,
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                };
                var obj8 = {
                    irrigation_assets : value.fields.irrigation_facility,
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                };
                var obj9 = {
                    irrigation_assets : value.fields.irrigation_facility,
                    high_operation_cost : null,
                    other_unexpected_expenses : null,
                    total_los : null,
                };

                if(model_name == 'BsRciaMajorTanks') {
                   $scope.dlIrrigation.agri_irrigation.Table_3[dl_model1].push(obj1);
                }
                if(model_name == 'BsRciaMediumTanks') {
                   $scope.dlIrrigation.agri_irrigation.Table_3[dl_model2].push(obj2);
                }
                if(model_name == 'BsRciaMinorTanks') {
                   $scope.dlIrrigation.agri_irrigation.Table_3[dl_model3].push(obj3);
                }
                if(model_name == 'BsRciaAnicuts') {
                   $scope.dlIrrigation.agri_irrigation.Table_3[dl_model4].push(obj4);
                }
                if(model_name == 'BsRciaOtherStructures') {
                   $scope.dlIrrigation.agri_irrigation.Table_3[dl_model5].push(obj5);
                }

                if(model_name == 'BsIfMajor') {
                   $scope.dlIrrigation.agri_irrigation.Table_3[dl_model6].push(obj6);
                }
                if(model_name == 'BsIfMedium') {
                   $scope.dlIrrigation.agri_irrigation.Table_3[dl_model7].push(obj7);
                }
                if(model_name == 'BsIfMinor') {
                   $scope.dlIrrigation.agri_irrigation.Table_3[dl_model8].push(obj8);
                }
                if(model_name == 'BsIfAnicuts') {
                   $scope.dlIrrigation.agri_irrigation.Table_3[dl_model9].push(obj9);
                }
            });

            if(model_name == 'BsRciaMajorTanks') {
                $scope.dlIrrigation.agri_irrigation.Table_3[dl_model1].push(obj1);
            }
            if(model_name == 'BsRciaMediumTanks') {
                $scope.dlIrrigation.agri_irrigation.Table_3[dl_model2].push(obj2);
            }
            if(model_name == 'BsRciaMinorTanks') {
                $scope.dlIrrigation.agri_irrigation.Table_3[dl_model3].push(obj3);
            }
            if(model_name == 'BsRciaAnicuts') {
                $scope.dlIrrigation.agri_irrigation.Table_3[dl_model4].push(obj4);
            }
            if(model_name == 'BsRciaOtherStructures') {
                $scope.dlIrrigation.agri_irrigation.Table_3[dl_model5].push(obj5);
            }
        });
    }

    //Save data
    $scope.saveDlData = function(form) {
        var array = $scope.dlIrrigation.agri_irrigation.Table_3;
        var details = _.map(array, function(model_array) {
            _.map(model_array, function(model) {
                model.division = $scope.division;
                model.region = $scope.region;
            });
        });
        $scope.submitted = true;
        if(form.$valid) {
            $http({
                method: 'POST',
                url:'/dl_save_data',
                contentType: 'application/json; charset=utf-8',
                data: angular.toJson({
                    'table_data': $scope.dlIrrigation,
                    'com_data': {
                        'district_id':  $scope.district.district__id,
                        'incident_id': $scope.incident,
                        'user_id': $scope.user_id,
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

    //Get Calculate data
    $scope.CalTot=function(arr) {
        var finaltotal = 0;
        angular.forEach(arr, function(value, key) {
            if(value.irrigation_assets != 'Total' && value.building != 'Total'){
                finaltotal = finaltotal + value.damages ;
             }
        })
        return finaltotal;
    }

    //Convert To Int Function
    $scope.convertToInt = function(val1,val2,val3,val4,val5,val6){
        var sum = parseInt(val1) + parseInt(val2) + parseInt(val3) + parseInt(val4) + parseInt(val5)+ parseInt(val6);
        return sum;
    }

    //Calculate Grand Total
    $scope.calGrandTotal=function() {
        var finaltotal1 = 0;
        var finaltotal2 = 0;
        var finaltotal3 = 0;
        var finaltotal4 = 0;
        var finaltotal5 = 0;
        var finaltotal5 = 0;
        var finaltotal6 = 0;
        var finaltotal7 = 0;
        var grantot = 0;
        var array1 = $scope.dlIrrigation.agri_irrigation.Table_3.DlMajorTanks;
        var array2 = $scope.dlIrrigation.agri_irrigation.Table_3.DlMediumTanks;
        var array3 = $scope.dlIrrigation.agri_irrigation.Table_3.DlMinorTanks;
        var array4 = $scope.dlIrrigation.agri_irrigation.Table_3.DlAnicuts;
        var array5 = $scope.dlIrrigation.agri_irrigation.Table_3.DlOtherStructures;
        var array6 = $scope.dlIrrigation.agri_irrigation.Table_3.DlBuildings;
        var array7= $scope.dlIrrigation.agri_irrigation.Table_3.DlRiverEmbankmnt;

        angular.forEach(array1, function(value, key) {
            if(value.irrigation_assets != 'Total' && value.building != 'Total'){
                finaltotal1 = finaltotal1 + value.damages ;
            }
        })

        angular.forEach(array2, function(value, key) {
            if(value.irrigation_assets != 'Total' && value.building != 'Total'){
                finaltotal2 = finaltotal2 + value.damages ;
            }
        })

        angular.forEach(array3, function(value, key) {
            if(value.irrigation_assets != 'Total' && value.building != 'Total'){
                finaltotal3 = finaltotal3 + value.damages ;
            }
        })

        angular.forEach(array4, function(value, key) {
            if(value.irrigation_assets != 'Total' && value.building != 'Total'){
                finaltotal4 = finaltotal4 + value.damages ;
            }
        })

        angular.forEach(array5, function(value, key) {
            if(value.irrigation_assets != 'Total' && value.building != 'Total'){
                finaltotal5 = finaltotal5 + value.damages;
            }
        })

        angular.forEach(array6, function(value, key) {
            if(value.irrigation_assets != 'Total' && value.building != 'Total'){
                finaltotal6 = finaltotal6 + value.damages;
            }
        })

        angular.forEach(array7, function(value, key) {
            if(value.irrigation_assets != 'Total' && value.building != 'Total'){
                finaltotal7 = finaltotal7 + value.damages ;
            }
        })

        grantot = finaltotal1+ finaltotal2 + finaltotal3  + finaltotal4 + finaltotal5 + finaltotal6 + finaltotal7 ;
        return grantot;
    }

    //Calculate Operating Loss
    $scope.calTotalOperatingLos=function() {
        var finaltotal1 = 0;
        var finaltotal2 = 0;
        var finaltotal3 = 0;
        var finaltotal4 = 0;
        var finaltotal5 = 0;
        var finaltotal6 = 0;
        var grantot = 0;
        var array1 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosMajorTanks;
        var array2 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosMediumTanks;
        var array3 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosMinorTanks;
        var array4 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosBuildingTanks;
        var array5 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosAnicuts;
        var array6 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosOther;

        angular.forEach(array1, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal1 = finaltotal1 + value.high_operation_cost ;
            }
        })

        angular.forEach(array2, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal2 = finaltotal2 + value.high_operation_cost ;
            }
        })

        angular.forEach(array3, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal3 = finaltotal3 + value.high_operation_cost ;
            }
        })

        angular.forEach(array4, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal4 = finaltotal4 + value.high_operation_cost ;
            }
        })

        angular.forEach(array5, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal5 = finaltotal5 + value.high_operation_cost ;
            }
        })

        angular.forEach(array6, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal6 = finaltotal6 + value.high_operation_cost ;
            }
        })

        grantot = grantot + finaltotal1+ finaltotal2 + finaltotal3 + finaltotal4+ finaltotal5+finaltotal6;
        return grantot;
    }

    //Calculate Total Other
    $scope.calTotalOther=function() {
        var finaltotal1 = 0;
        var finaltotal2 = 0;
        var finaltotal3 = 0;
        var finaltotal4 = 0;
        var finaltotal5 = 0;
        var finaltotal6 = 0;
        var grantot = 0;
        var array1 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosMajorTanks;
        var array2 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosMediumTanks;
        var array3 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosMinorTanks;
        var array4 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosBuildingsTanks;
        var array5 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosAnicuts;
        var array6 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosOther;

        angular.forEach(array1, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal1 = finaltotal1 + value.other_unexpected_expenses ;
            }
        })

        angular.forEach(array2, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal2 = finaltotal2 + value.other_unexpected_expenses ;
            }
        })

        angular.forEach(array3, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal3 = finaltotal3 + value.other_unexpected_expenses ;
            }
        })

        angular.forEach(array4, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal4 = finaltotal4 + value.other_unexpected_expenses ;
            }
        })

        angular.forEach(array5, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal5 = finaltotal5 + value.other_unexpected_expenses ;
            }
        })

        angular.forEach(array6, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal6 = finaltotal6 + value.other_unexpected_expenses ;
            }
        })

        grantot = grantot + finaltotal1+ finaltotal2 + finaltotal3 + finaltotal4 + finaltotal5+ finaltotal6;
        return grantot;
    }

    $scope.calTotalLosses=function() {
        var finaltotal1 = 0;
        var finaltotal2 = 0;
        var finaltotal3 = 0;
        var finaltotal4 = 0;
        var finaltotal5 = 0;
        var finaltotal6 = 0;
        var grantot = 0;
        var array1 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosMajorTanks;
        var array2 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosMediumTanks;
        var array3 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosMinorTanks;
        var array4 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosBuildingsTanks;
        var array5 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosAnicuts;
        var array6 = $scope.dlIrrigation.agri_irrigation.Table_3.DlLosOther;

        angular.forEach(array1, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal1 = finaltotal1 + value.total_los ;
            }
        })

        angular.forEach(array2, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES' ){
                finaltotal2 = finaltotal2 + value.total_los ;
            }
        })

        angular.forEach(array3, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal3 = finaltotal3 + value.total_los ;
            }
        })

        angular.forEach(array4, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal4 = finaltotal4 + value.total_los ;
            }
        })

        angular.forEach(array5, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES' ){
                finaltotal5 = finaltotal5 + value.total_los ;
            }
        })

        angular.forEach(array6, function(value, key) {
            if(value.irrigation_assets != 'TOTAL LOSSES'){
                finaltotal6 = finaltotal6 + value.total_los ;
            }
        })

        grantot = grantot + finaltotal1+ finaltotal2 + finaltotal3 + finaltotal4 + finaltotal5 + finaltotal6;
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
                    'sector': 'agri_irrigation',
                    'com_data': {
                        'district':  $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                    'is_edit':$scope.is_edit
                }),
            }).success(function(data) {
                console.log(data);
                $scope.dlIrrigation = data;

                console.log('alert',$scope.dlIrrigation.agri_irrigation.Table_3.DlMajorTanks[0].division);

                $scope.division = $scope.dlIrrigation.agri_irrigation.Table_3.DlMajorTanks[0].division;
                $scope.region = $scope.dlIrrigation.agri_irrigation.Table_3.DlMajorTanks[0].region;
            })
        }
    }

    //Edit Data
    $scope.searchDlData = function(form) {
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
                    'sector': 'agri_irrigation',
                    'com_data': {
                        'district': $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                    'is_edit':$scope.is_edit
                }),
            }).success(function(data) {
                console.log(data);
                $scope.dlIrrigation = data;
                $scope.division = $scope.dlIrrigation.agri_irrigation.Table_3.DlMajorTanks[0].division;
                $scope.region = $scope.dlIrrigation.agri_irrigation.Table_3.DlMajorTanks[0].region;
            })
        }
    }

    //Cancel Data
    $scope.cancelEdit = function(){
        $scope.is_edit = false;
        $scope.dlIrrigation = init_data;
        location.reload();
    }

    //Clear Function
    $scope.clear = function() {
        console.log('done');
        $scope.is_edit = false;
        $scope.dlIrrigation = angular.copy(init_data);
        location.reload();
    }
}]);
