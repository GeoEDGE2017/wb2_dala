//Table 4
var app = angular.module('dlFrstPrductAsetsApp', [])
app.controller('dlFrstPrductAsetsController', ['$scope', '$http', function($scope, $http) {
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
    $scope.is_edit_disable = false;
    $scope.is_submit = false;
    $scope.check_search = false;
    $scope.is_search = false;
    $scope.bsCreatedeDate;

    //Initialize Data
    var init_data = {
        'agri_agrarian': {
            'Table_4': {
                'DcpfFarmEquipment': [{
                    assets : 'Tractor',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    num_dmg_pub : null,
                    num_dmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    num_dmg_pub : null,
                    num_dmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                'DcpfSeasonalCrops': [{
                    assets : 'Rice',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Maize',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Vegetables',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Floriculture crops',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                'DcpfPlantnCrops': [{
                    assets : 'Coconut',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Tea',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Rubber',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                'DcpfExportCrops': [{
                    assets : 'Coffee',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Fruit trees',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Cinnamon',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                'DcpfForestry': [{
                    assets : 'Timber',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                'DcpfOther': [{
                    assets : 'Honey',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                'DcpfStocks': [{
                    assets : 'Seeds',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Fertilizers',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Pesticides',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                'DcpfRePlantnCrops': [{
                    assets : 'Coconut',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Tea',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Rubber',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                'DcpfReExportCrops': [{
                    assets : 'Coffee',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Fruit trees',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Cinnamon',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                'DcpfReForestry': [{
                    assets : 'Timber',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
            }
        }
    }

    $scope.dlFrstPrductAsets = angular.copy(init_data);

    //Get Districts and related baseline data
    $scope.changedValue = function getBsData(selectedValue) {
        console.log('inicdent', $scope.incident);
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

        if($scope.incident && $scope.district) {
            $scope.is_edit_disable = true;
            $scope.check_search = true;
            $http({
                method: 'POST',
                url: '/bs_get_data_mock',
                contentType: 'application/json; charset=utf-8',
                data: angular.toJson({
                    'db_tables': ['BacfFarmEquipment','BacfSeasonalCrops', 'BacfPlantnCrops', 'BacfExportCrops',
                        'BacfForestry', 'BacfOther', 'BacfStocks','BacfAvgrePlantnCrops','BacfAvgreExportCrops','BacfAvgreForestry'],
                    'com_data': {
                        'district': $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                    'table_name': 'Table_2',
                    'sector': 'agri_agrarian',
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
                            'sector': 'agri_agrarian'
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

    //Generate fields Related to baseline Data
    function generateRefencedData() {
        data_array = ['BacfFarmEquipment','BacfSeasonalCrops', 'BacfPlantnCrops', 'BacfExportCrops', 'BacfForestry', 'BacfOther', 'BacfStocks'];
            var dl_model1 = null;
            var dl_model2 = null;
            var dl_model3 = null;
            var dl_model4 = null;
            var dl_model5 = null;
            var dl_model6 = null;
            var dl_model7 = null;
            var dl_model8 = null;
            var dl_model9 = null;
            var dl_model10 = null;

        angular.forEach(data_array, function(value, key) {
            obj_array = $scope.bs_data[value];
            console.log('get array', obj_array);
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
            var particular_value_10 = null;

            if(model_name == 'BacfFarmEquipment') {
                dl_model1 = 'DcpfFarmEquipment';
                particular_value_1 = 'Total';
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model1] = [];
            }
            if(model_name == 'BacfSeasonalCrops') {
                dl_model2 = 'DcpfSeasonalCrops';
                particular_value_2 = 'Total';
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model2] = [];
            }
            if(model_name == 'BacfPlantnCrops') {
                dl_model3 = 'DcpfPlantnCrops';
                dl_model8 = 'DcpfRePlantnCrops';
                particular_value_3 = 'Total';
                particular_value_8 = 'Total'
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model3] = [];
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model8] = [];
            }
            if(model_name == 'BacfExportCrops') {
                dl_model4 = 'DcpfExportCrops';
                dl_model9 = 'DcpfReExportCrops';
                particular_value_4 = 'Total';
                particular_value_9 = 'Total';
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model4] = [];
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model9] = [];
            }
            if(model_name == 'BacfForestry') {
                dl_model5 = 'DcpfForestry';
                dl_model10 = 'DcpfReForestry';
                particular_value_5 = 'Total';
                particular_value_10 = 'Total';
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model5] = [];
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model10] = [];
            }
            if(model_name == 'BacfOther') {
                dl_model6 = 'DcpfOther';
                particular_value_6 = 'Total';
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model6] = [];
            }
            if(model_name == 'BacfStocks') {
                dl_model7 = 'DcpfStocks';
                particular_value_7 = 'Total';
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model7] = [];
            }

            var obj1 = {
                assets : particular_value_1,
                num_dest_pub : null,
                num_dest_pvt : null,
                num_dmg_pub : null,
                num_dmg_pvt : null,
                dmg_pub : null,
                dmg_pvt : null,
            };
            var obj2 = {
                assets : particular_value_2,
                num_dest_pub : null,
                num_dest_pvt : null,
                dmg_pub : null,
                dmg_pvt : null,
            };
            var obj3 = {
                assets : particular_value_3,
                num_dest_pub : null,
                num_dest_pvt : null,
                dmg_pub : null,
                dmg_pvt : null,
            };
            var obj4 = {
                assets : particular_value_4,
                num_dest_pub : null,
                num_dest_pvt : null,
                dmg_pub : null,
                dmg_pvt : null,
            };
            var obj5 = {
                assets : particular_value_5,
                num_dest_pub : null,
                num_dest_pvt : null,
                dmg_pub : null,
                dmg_pvt : null,
            };
            var obj6 = {
                assets : particular_value_6,
                num_dest_pub : null,
                num_dest_pvt : null,
                dmg_pub : null,
                dmg_pvt : null,
            };
            var obj7 = {
                assets : particular_value_7,
                num_dest_pub : null,
                num_dest_pvt : null,
                dmg_pub : null,
                dmg_pvt : null,
            };
            var obj8 = {
                assets : particular_value_8,
                num_dest_pub : null,
                num_dest_pvt : null,
                dmg_pub : null,
                dmg_pvt : null,
            };
            var obj9 = {
                assets : particular_value_9,
                num_dest_pub : null,
                num_dest_pvt : null,
                dmg_pub : null,
                dmg_pvt : null,
            };
            var obj10 = {
                assets : particular_value_10,
                num_dest_pub : null,
                num_dest_pvt : null,
                dmg_pub : null,
                dmg_pvt : null,
            };

            angular.forEach(obj_array, function(value, key) {
                var obj1 = {
                    assets : value.fields.assets,
                    avg_replace_cost : null,
                    avg_repair_cost : null,
                };
                var obj2 = {
                    assets : value.fields.seasonal_crops,
                    areas_cultivated : null,
                    avg_val_land : null,
                    num_families : null,
                    num_male : null,
                    num_female : null,
                };
                var obj3 = {
                    assets : value.fields.plantn_crops,
                    areas_cultivated : null,
                    avg_val_land : null,
                    num_families : null,
                    num_male : null,
                    num_female : null,
                };
                var obj4 = {
                    assets : value.fields.export_crops,
                    areas_cultivated : null,
                    avg_val_land : null,
                    num_families : null,
                    num_male : null,
                    num_female : null,
                };
                var obj5 = {
                    assets : value.fields.forestry,
                    areas_cultivated : null,
                    avg_val_land : null,
                    num_families : null,
                    num_male : null,
                    num_female : null,
                };
                var obj6 = {
                    assets : value.fields.other_products,
                    areas_cultivated : null,
                    avg_val_land : null,
                    num_families : null,
                    num_male : null,
                    num_female : null,
                };
                var obj7 = {
                    assets : value.fields.assets,
                    avg_value : null,
                };
                var obj8 = {
                    assets : value.fields.plantn_crops,
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                };
                var obj9 = {
                    assets : value.fields.export_crops,
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                };
                 var obj10 = {
                    assets : value.fields.forestry,
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                };

                if(model_name == 'BacfFarmEquipment') {
                    $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model1].push(obj1);
                }
                if(model_name == 'BacfSeasonalCrops') {
                    $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model2].push(obj2);
                }
                if(model_name == 'BacfPlantnCrops') {
                    $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model3].push(obj3);
                    $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model8].push(obj8);
                }
                if(model_name == 'BacfExportCrops') {
                    $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model4].push(obj4);
                    $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model9].push(obj9);
                }
                if(model_name == 'BacfForestry') {
                    $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model5].push(obj5);
                    $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model10].push(obj10);
                }
                if(model_name == 'BacfOther') {
                    $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model6].push(obj6);
                }
                if(model_name == 'BacfStocks') {
                    $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model7].push(obj7);
                }
            });

            if(model_name == 'BacfFarmEquipment') {
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model1].push(obj1);
            }
            if(model_name == 'BacfSeasonalCrops') {
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model2].push(obj2);
            }
            if(model_name == 'BacfPlantnCrops') {
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model3].push(obj3);
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model8].push(obj8);
            }
            if(model_name == 'BacfExportCrops') {
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model4].push(obj4);
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model9].push(obj9);
            }
            if(model_name == 'BacfForestry') {
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model5].push(obj5);
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model10].push(obj10);
            }
            if(model_name == 'BacfOther') {
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model6].push(obj6);
            }
            if(model_name == 'BacfStocks') {
                $scope.dlFrstPrductAsets.agri_agrarian.Table_4[dl_model7].push(obj7);
            }
        });
    }

    //Save Data
    $scope.saveDlData = function(form) {
        $scope.submitted = true;
        $scope.is_submit = true;
        if(form.$valid) {
            $http({
                method: 'POST',
                url: '/dl_save_data',
                contentType: 'application/json; charset=utf-8',
                data: angular.toJson({
                    'table_data': $scope.dlFrstPrductAsets,
                    'com_data': {
                        'district_id': $scope.district.district__id,
                        'incident_id' : $scope.incident,
                        'user_id' : $scope.user_id,
                    },
                    'bs_date': $scope.bsCreatedeDate,
                    'is_edit': $scope.is_edit
                }),
                dataType: 'json',
            }).then(function successCallback(response) {
                if(response.data == 'False' || response.data == false) {
                    $scope.is_valid_data = false;
                    $("#modal-container-239454").modal('show');
                }
                else {
                    $("#modal-container-239453").modal('show');
                }
            },
            function errorCallback(response) {
                $("#modal-container-239458").modal('show');
            });
        }
        $scope.is_submit = false;
    }

    //Edit Data
    $scope.editDlData = function(form) {
        $scope.is_edit = true;
        $scope.submitted = true;
        document.getElementById("clearbtn").disabled = true;
        if(form.$valid){
            $http({
                method: "POST",
                url: '/dl_fetch_edit_data',
                data: angular.toJson({
                    'table_name': 'Table_4',
                    'sector': 'agri_agrarian',
                    'com_data': {
                        'district': $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                   'is_edit':$scope.is_edit
               }),
            }).success(function(data) {
                var edit_data_not_found = false;
                if (data != null) {
                    angular.forEach(data.agri_agrarian.Table_4, function(value, index) {
                        console.log(value);
                        if (value.length == 0) {
                            edit_data_not_found = true;
                        }
                    })
                    if (edit_data_not_found != true) {
                        $scope.dlFrstPrductAsets = data;
                        console.log($scope.dlFrstPrductAsets);
                    }
                    else {
                        $("#modal-container-239456").modal('show');
                    }
                }
                else {
                    $("#modal-container-239456").modal('show');
                }
            })
        }
    }

    $scope.test = function(form) {
        $("#modal-container-239458").modal('show');
    }

    //Search Data
    $scope.searchDlData = function(form) {
        document.getElementById("clearbtn").disabled = true;
		document.getElementById("editbtn").disabled = true;
		document.getElementById("subbtn").disabled = true;

		$scope.is_search = true;
        if(form.$valid){
            $http({
                method: "POST",
                url: '/dl_fetch_edit_data',
                data: angular.toJson({
                    'table_name': 'Table_4',
                    'sector': 'agri_agrarian',
                    'com_data': {
                        'district': $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                    'is_edit': $scope.is_edit
                }),
            }).success(function(data) {
                var edit_data_not_found = false;

                if (data != null) {
                    angular.forEach(data.agri_agrarian.Table_4, function(value, index) {
                        console.log(value);
                        if (value.length == 0) {
                            edit_data_not_found = true;
                        }
                    })
                    if (edit_data_not_found != true) {
                        $scope.dlFrstPrductAsets = data;
                        console.log($scope.dlFrstPrductAsets);
                    }
                    else {
                        $("#modal-container-239456").modal('show');
                    }
                }
                else {
                    $("#modal-container-239456").modal('show');
                }
            })
        }
    }

    //Cancel Edit
    $scope.cancelEdit = function() {
        $scope.is_edit = false;
        $scope.dlFrstPrductAsets = init_data;
        location.reload();
    }

    //Calculate Public Total
    $scope.calPubTotal = function(arr) {
        var finaltotal = 0;
        angular.forEach(arr, function(value, key) {
            if(value.assets != "Total") {
                if(!isNaN(value.dmg_pub)) {
                    finaltotal = finaltotal + $scope.convertToFloat(value.dmg_pub);
                }
                else {
                    finaltotal = finaltotal + 0;
                }
            }
        })
        return finaltotal;
    }

    //Calculate Private Total
    $scope.calPvtTotal = function(arr) {
        var finaltotal = 0;
        angular.forEach(arr, function(value, key) {
            if(value.assets != "Total") {
                if(!isNaN(value.dmg_pvt)) {
                    finaltotal = finaltotal + $scope.convertToFloat(value.dmg_pvt);
                }
                else {
                    finaltotal = finaltotal + 0;
                }
            }
        })
        return finaltotal;
    }

    //Calculate Grand Public Total
    $scope.calGrandPubTotal = function() {
        var finaltotal1 = 0;
        var finaltotal2 = 0;
        var finaltotal3 = 0;
        var finaltotal4 = 0;
        var finaltotal5 = 0;
        var finaltotal6 = 0;
        var finaltotal7 = 0;
        var finaltotal8 = 0;
        var finaltotal9 = 0;
        var finaltotal10 = 0;
        var grantot = 0;

        var array1 = $scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfFarmEquipment;
        var array2 = $scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfSeasonalCrops;
        var array3 = $scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfPlantnCrops;
        var array4 = $scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfExportCrops;
        var array5 = $scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfForestry;
        var array6 = $scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfOther;
        var array7 = $scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfStocks;
        var array8 = $scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfRePlantnCrops;
        var array9 = $scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfReExportCrops;
        var array10 = $scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfReForestry;

        angular.forEach(array1, function(value, key) {
            if(value.assets != "Total") {
                finaltotal1 = finaltotal1 + $scope.convertToFloat(value.dmg_pub);
            }
        })

        angular.forEach(array2, function(value, key) {
            if(value.assets != "Total"){
                finaltotal2 = finaltotal2 + $scope.convertToFloat(value.dmg_pub);
            }
        })

        angular.forEach(array3, function(value, key) {
            if(value.assets != "Total"){
                finaltotal3 = finaltotal3 + $scope.convertToFloat(value.dmg_pub);
            }
        })

        angular.forEach(array4, function(value, key) {
            if(value.assets != "Total") {
                finaltotal4 = finaltotal4 + $scope.convertToFloat(value.dmg_pub);
            }
        })

        angular.forEach(array5, function(value, key) {
            if(value.assets != "Total") {
                finaltotal5 = finaltotal5 + $scope.convertToFloat(value.dmg_pub);
            }
        })

        angular.forEach(array6, function(value, key) {
            if(value.assets != "Total") {
                finaltotal6 = finaltotal6 + $scope.convertToFloat(value.dmg_pub);
            }
        })

        angular.forEach(array7, function(value, key) {
            if(value.assets != "Total") {
                finaltotal7 = finaltotal7 + $scope.convertToFloat(value.dmg_pub);
            }
        })

        angular.forEach(array8, function(value, key) {
            if(value.assets != "Total") {
                finaltotal8 = finaltotal8 + $scope.convertToFloat(value.dmg_pub);
            }
        })

        angular.forEach(array9, function(value, key) {
            if(value.assets != "Total") {
                finaltotal9 = finaltotal9 + $scope.convertToFloat(value.dmg_pub);
            }
        })

        angular.forEach(array10, function(value, key) {
            if(value.assets != "Total") {
                finaltotal10 = finaltotal10 + value.dmg_pub ;
            }
        })

        grantot = grantot +finaltotal1+ finaltotal2 + finaltotal3 + finaltotal4 + finaltotal5+
            finaltotal6 + finaltotal7 + finaltotal8 + finaltotal9 + finaltotal10;

        return grantot;
    }

    //Calculate Grand Private Total
    $scope.calGrandPvtTotal = function() {
        var finaltotal1 = 0;
        var finaltotal2 = 0;
        var finaltotal3 = 0;
        var finaltotal4 = 0;
        var finaltotal5 = 0;
        var finaltotal6 = 0;
        var finaltotal7 = 0;
        var finaltotal8 = 0;
        var finaltotal9 = 0;
        var finaltotal10 = 0;
        var grantot = 0;

        var array1=$scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfFarmEquipment;
        var array2 =$scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfSeasonalCrops;
        var array3 =$scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfPlantnCrops;
        var array4 =$scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfExportCrops;
        var array5 =$scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfForestry;
        var array6 =$scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfOther;
        var array7 =$scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfStocks;
        var array8 =$scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfRePlantnCrops;
        var array9 =$scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfReExportCrops;
        var array10 =$scope.dlFrstPrductAsets.agri_agrarian.Table_4.DcpfReForestry;

        angular.forEach(array1, function(value, key) {
            if(value.assets != "Total"){
                finaltotal1 = finaltotal1 + value.dmg_pvt ;
            }
        })

        angular.forEach(array2, function(value, key) {
            if(value.assets != "Total"){
                finaltotal2 = finaltotal2 + value.dmg_pvt ;
            }
        })

        angular.forEach(array3, function(value, key) {
            if(value.assets != "Total"){
                finaltotal3 = finaltotal3 + value.dmg_pvt ;
            }
        })

        angular.forEach(array4, function(value, key) {
            if(value.assets != "Total"){
                finaltotal4 = finaltotal4 + value.dmg_pvt ;
            }
        })

        angular.forEach(array5, function(value, key) {
            if(value.assets !="Total"){
                finaltotal5 = finaltotal5 + value.dmg_pvt ;
            }
        })

        angular.forEach(array6, function(value, key) {
            if(value.assets != "Total"){
                finaltotal6 = finaltotal6 + value.dmg_pvt ;
            }
        })

        angular.forEach(array7, function(value, key) {
            if(value.assets != "Total"){
                finaltotal7 = finaltotal7 + value.dmg_pvt ;
            }
        })

        angular.forEach(array8, function(value, key) {
            if(value.assets != "Total"){
                finaltotal8 = finaltotal8 + value.dmg_pvt ;
            }
        })

        angular.forEach(array9, function(value, key) {
            if(value.assets != "Total"){
                finaltotal9 = finaltotal9 + value.dmg_pvt ;
            }
        })

        angular.forEach(array10, function(value, key) {
            if(value.assets != "Total"){
                finaltotal10 = finaltotal10 + value.dmg_pvt ;
            }
        })

        grantot = grantot  + finaltotal1+ finaltotal2 + finaltotal3 + finaltotal4 +
            finaltotal5+ finaltotal6 + finaltotal7 + finaltotal8 + finaltotal9  + finaltotal10;

        return grantot;
    }

    //Clear Function
    $scope.clear = function() {
        console.log('clear');
        $scope.is_edit = false;
        $scope.dlFrstPrductAsets = angular.copy(init_data);
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
}]);
