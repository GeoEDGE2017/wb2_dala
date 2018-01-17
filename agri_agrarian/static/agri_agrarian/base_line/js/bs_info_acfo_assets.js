//Table 2
var app = angular.module('bsInfoAcfoAssetsApp', [])
app.controller('bsInfoAcfoAssetsController', ['$scope', '$http', function($scope, $http) {
    $scope.district;
    $scope.bs_date;
    $scope.bs_data={};
    $scope.is_edit = false;
    $scope.submitted = false;
    $scope.is_valid_data = true;
    $scope.is_edit_disable = false;
    $scope.user_id;
    $scope.is_submit = false;
    $scope.check_search = false;
    $scope.is_search = false;

    //initialize data
    var init_data = {
        'agri_agrarian': {
            'Table_2': {
                'BacfSeasonalCrops': [{
                    seasonal_crops : 'Rice',
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                }, {
                    seasonal_crops : 'Maize',
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                }, {
                    seasonal_crops : 'Vegetables',
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                }, {
                    seasonal_crops : 'Floriculture crops',
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                }],
                'BacfPlantnCrops': [{
                    plantn_crops : 'Coconut',
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                }, {
                    plantn_crops : 'Tea',
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                }, {
                    plantn_crops : 'Rubber',
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                }],
                'BacfExportCrops': [{
                    export_crops : 'Coffee',
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                }, {
                    export_crops : 'Fruit trees',
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                }, {
                    export_crops : 'Cinnamon',
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                }],
                'BacfForestry': [{
                    forestry : 'Timber',
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                }],
                'BacfOther': [{
                    other_products : 'Honey',
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                }],
                'BacfFarmEquipment': [{
                    assets : 'Tractor',
                    avg_replace_cost : null,
                    avg_repair_cost : null,
                }],
                'BacfStocks': [{
                    assets : 'Seeds',
                    avg_value : null,
                }, {
                    assets : 'Fertilizer',
                    avg_value : null,
                }, {
                    assets : 'Pesticides',
                    avg_value : null,
                }],
                'BacfAvgrePlantnCrops': [{
                    assets : 'Coconut',
                    avg_value : null,
                }, {
                    assets : 'Tea',
                    avg_value : null,
                }, {
                    assets : 'Rubber',
                    avg_value : null,
                }],
                'BacfAvgreExportCrops': [{
                    assets : 'Coffee',
                    avg_value : null,
                }, {
                    assets : 'Fruit Trees',
                    avg_value : null,
                }, {
                    assets : 'Cinnamon',
                    avg_value : null,
                }],
                'BacfAvgreForestry': [{
                    assets : 'Timber',
                    avg_value : null,
                }]
            }
        }
    }

    $scope.bsInfoAcfoAssets = angular.copy(init_data);

    //Disable Edit Button
    $scope.changeDis = function changeDis() {
        if($scope.district && $scope.bs_date){
            $scope.is_edit_disable = true;
              $scope.check_search = true;
        }
        else {
            $scope.is_edit_disable = false;
            $scope.check_search = false;
        }
    }

    //related baseline data
    $scope.getValue = function getBsData() {
        if($scope.district && $scope.bs_date) {
            $http({
                method: 'POST',
                url: '/bs_get_data_mock_for_bs',
                contentType: 'application/json; charset=utf-8',
                data: angular.toJson({
                    'db_tables': ['BcagSeasonalCrops','BcagPlantnCrops','BcagExportCrops','BcagForestry','BcagOther'],
                    'com_data': {
                        'district': $scope.district,
                        'bs_date': $scope.bs_date,
                    },
                    'table_name': 'Table_1',
                    'sector':'agri_agrarian',
                }),
                dataType: 'json',
            }).then(function successCallback(response) {
                var data = response.data;
                angular.forEach(data, function(value, key) {
                    $scope.bs_data[key] = JSON.parse(value);
                    console.log('*** ', $scope.bs_data[key]);
                });
                console.log(response);
                generateRefencedData();
            }, function errorCallback(response) {
            });
        }
    }

    //Generate fields Related to baseline Data
    function generateRefencedData() {
        data_array = ['BcagSeasonalCrops','BcagPlantnCrops','BcagExportCrops','BcagForestry','BcagOther'];
        var bs_model1 = null;
        var bs_model2 = null;
        var bs_model3 = null;
        var bs_model4 = null;
        var bs_model5 = null;
        var bs_model6 = null;
        var bs_model7 = null;
        var bs_model8 = null;

        angular.forEach(data_array, function(value, key) {
            obj_array = $scope.bs_data[value];
            model_name = value;

            if(model_name == 'BcagSeasonalCrops') {
                bs_model1 = 'BacfSeasonalCrops';
                $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model1] = [];
            }
            if(model_name == 'BcagPlantnCrops') {
                bs_model2 = 'BacfPlantnCrops';
                bs_model5 = 'BacfAvgrePlantnCrops';
                $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model2] = [];
                $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model5] = [];
            }
            if(model_name == 'BcagExportCrops') {
                bs_model3 = 'BacfExportCrops';
                bs_model6 = 'BacfAvgreExportCrops';
                $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model3] = [];
                $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model6] = [];
            }
            if(model_name == 'BcagForestry') {
                bs_model4 = 'BacfForestry';
                bs_model7 = 'BacfAvgreForestry';
                $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model4] = [];
                $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model7] = [];
            }
            if(model_name == 'BcagOther') {
                bs_model8 = 'BacfOther';
                $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model8] = [];

            }

            angular.forEach(obj_array, function(value, key) {
                var obj1 = {
                    seasonal_crops : value.fields.seasonal_crops,
                    avg_value: null,
                    productn_pub: null,
                    productn_pvt: null,
                    productn_cost_nplanted: null,
                    productn_cost_mstage: null,
                    productn_cost_hstage: null,
                };
                 var obj2 = {
                    plantn_crops : value.fields.plantn_crops,
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                };
                var obj3 = {
                    export_crops : value.fields.export_crops,
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                };

                var obj4 = {
                    forestry : value.fields.forestry,
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                };

                var obj5 = {
                    assets : value.fields.plantn_crops,
                    avg_value : null,
                };
                var obj6 = {
                    assets : value.fields.export_crops,
                    avg_value : null,
                };
                var obj7 = {
                    assets : value.fields.forestry,
                    avg_value : null,
                };

                var obj8 = {
                    other_products : value.fields.other_products,
                    avg_value : null,
                    productn_pub : null,
                    productn_pvt : null,
                    productn_cost_nplanted : null,
                    productn_cost_mstage : null,
                    productn_cost_hstage : null,
                };
                 if(model_name == 'BcagSeasonalCrops') {
                    console.log(model_name);
                    $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model1].push(obj1);
                }
                 if(model_name == 'BcagPlantnCrops') {
                    console.log(model_name);
                    $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model2].push(obj2);
                    $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model5].push(obj5);
                }
                 if(model_name == 'BcagExportCrops') {
                    console.log(model_name);
                    $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model3].push(obj3);
                    $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model6].push(obj6);
                }
                if(model_name == 'BcagForestry') {
                    console.log(model_name);
                    $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model4].push(obj4);
                    $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model7].push(obj7);
                }
                if(model_name == 'BcagOther') {
                    console.log(model_name);
                    $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[bs_model8].push(obj8);
                }
            });

        });
    }

    //Save Data
    $scope.saveBsData = function(form) {
       $scope.submitted = true;
       $scope.is_submit = true;
        if (form.$valid) {
             $http({
                method: "POST",
                url: "/bs_save_data",
                data: angular.toJson({
                    'table_data': ($scope.bsInfoAcfoAssets),
                    'com_data': {
                        'district': $scope.district,
                        'bs_date': $scope.bs_date,
                        'user_id' : $scope.user_id,
                    },
                    'is_edit': $scope.is_edit,
                    'sector':'agri_agrarian'
                }),
            }).success(function(data) {
                $scope.bsInfoAcfoAssets = init_data;
                $scope.is_edit = false;

                if (data == 'False') {
                    $("#modal-container-239454").modal('show');
                    $scope.is_valid_data = false;
                }
                else {
                    $("#modal-container-239453").modal('show');
                }
            })
        }
        $scope.is_submit = false;
    }

    //edit data
    $scope.editBsData = function(form) {
        $scope.submitted = true;
        $scope.is_edit = true;
        document.getElementById("clearbtn").disabled = true;
        if (form.$valid) {
            $http({
                method: "POST",
                url: "/bs_fetch_edit_data",
                data: angular.toJson({
                    'table_name': 'Table_2',
                    'sector': 'agri_agrarian',
                    'com_data': {
                        'district': $scope.district,
                        'bs_date': $scope.bs_date
                    }
                }),
            }).success(function(data) {
                console.log(data);
                var edit_data_not_found = false;

                if(data != null) {
                    angular.forEach(data.agri_agrarian.Table_2, function(value, index) {
                        console.log(value);
                        if(value.length == 0) {
                            edit_data_not_found = true;
                        }
                    })
                    if(edit_data_not_found != true) {
                        $scope.bsInfoAcfoAssets = data;
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

    //search data
    $scope.searchBsData = function(form){
        document.getElementById("clearbtn").disabled = true;
		document.getElementById("editbtn").disabled = true;
		document.getElementById("subbtn").disabled = true;

		$scope.is_search = true;
        if (form.$valid) {
            $http({
                method: "POST",
                url: "/bs_fetch_edit_data",
                data: angular.toJson({
                    'table_name': 'Table_2',
                    'sector': 'agri_agrarian',
                    'com_data': {
                        'district': $scope.district,
                        'bs_date': $scope.bs_date
                    }
                }),
            }).success(function(data) {
                console.log(data);
                var edit_data_not_found = false;

                if(data != null) {
                    angular.forEach(data.agri_agrarian.Table_2, function(value, index) {
                        console.log(value);
                        if(value.length == 0) {
                            edit_data_not_found = true;
                        }
                    })
                    if(edit_data_not_found != true) {
                        $scope.bsInfoAcfoAssets = data;
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
    $scope.cancelEdit = function(){
        $scope.is_edit = false;
        $scope.bsInfoAcfoAssets = init_data;
        location.reload();
    }

    //Clear Function
    $scope.clear = function() {
        $scope.is_edit = false;
        $scope.bsInfoAcfoAssets = angular.copy(init_data);
        location.reload();
    }

    //Add Enumerate fields
    $scope.insertAsset = function(table) {
        console.log($scope.bsInfoAcfoAssets.agri_agrarian.Table_2[table]);
        var new_row;
        if(table == 'BacfFarmEquipment') {
            new_row = {
                assets : '',
                avg_replace_cost : null,
                avg_repair_cost : null,
            }
        }
        else if(table == 'BacfStocks') {
            new_row = {
                assets : '',
                avg_replace_cost : null,
                avg_repair_cost : null,
            }
        }
        $scope.bsInfoAcfoAssets.agri_agrarian.Table_2[table].push(new_row);
    }

    //remove Enumerate fields
    $scope.removeItem = function removeItem(table, index) {
        if(table == 'BacfFarmEquipment') {
            $scope.bsInfoAcfoAssets.agri_agrarian.Table_2.BacfFarmEquipment.splice(index, 1);
        }
        else if(table == 'BacfStocks') {
            $scope.bsInfoAcfoAssets.agri_agrarian.Table_2.BacfStocks.splice(index, 1);
        }
    }
}]);
