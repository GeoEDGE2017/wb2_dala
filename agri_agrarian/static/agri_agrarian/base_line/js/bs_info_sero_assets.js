//Table 3
var app = angular.module('bsInfoSeroAssetsApp', [])
app.controller('bsInfoSeroAssetsController', ['$scope', '$http', function($scope, $http) {
    $scope.district;
    $scope.baselineDate;
    $scope.bs_data={};
    $scope.bs_date;
    $scope.is_edit = false;
    $scope.submitted = false;
    $scope.is_valid_data = true;
    $scope.is_edit_disable = false;
    $scope.user_id;
    $scope.is_submit = false;
    $scope.check_search = false;
    $scope.is_search = false;

    //initialize Data
    var init_data = {
        'agri_agrarian': {
            'Table_3': {
                'BsoeStructure': [{
                    assets : '1 floor structure',
                    avg_replace_cost : null,
                    avg_repair_wall : null,
                    avg_repair_roof : null,
                    avg_repair_flooring : null,
                }, {
                    assets : '2-3 floors structure',
                    avg_replace_cost : null,
                    avg_repair_wall : null,
                    avg_repair_roof : null,
                    avg_repair_flooring : null,
                }, {
                    assets : 'More than 3 floors',
                    avg_replace_cost : null,
                    avg_repair_wall : null,
                    avg_repair_roof : null,
                    avg_repair_flooring : null,
                }],
                'BsoeOequipment': [{
                    assets : 'Computers',
                    avg_replace_cost : null,
                    avg_repair_cost : null,
                }, {
                    assets : 'Furniture',
                    avg_replace_cost : null,
                    avg_repair_cost : null,
                }],
                'BsoeMachinery': [{
                    assets : 'Vehicles',
                    avg_replace_cost : null,
                    avg_repair_cost : null,
                }, {
                    assets : 'Generators',
                    avg_replace_cost : null,
                    avg_repair_cost : null,
                }, {
                    assets : 'Elevators',
                    avg_replace_cost : null,
                    avg_repair_cost : null,
                }]
            }
        }
    }

    $scope.bsInfoSeroAssets = angular.copy(init_data);

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

    //Add Enumerate fields
    $scope.insertAsset = function(table) {
        console.log($scope.bsInfoSeroAssets.agri_agrarian.Table_3[table]);
        var new_row;
        if(table == 'BsoeStructure') {
            new_row = {
                assets : '',
                avg_replace_cost : null,
                avg_repair_wall : null,
                avg_repair_roof : null,
                avg_repair_flooring : null,
            }
        }
        else if(table == 'BsoeOequipment') {
            new_row = {
                assets : '',
                avg_replace_cost : null,
                avg_repair_cost : null,
            }
        }
        else if(table == 'BsoeMachinery') {
            new_row = {
                assets : '',
                avg_replace_cost : null,
                avg_repair_cost : null,
            }
        }
        $scope.bsInfoSeroAssets.agri_agrarian.Table_3[table].push(new_row);
    }

    //Remove Enumerate fields
    $scope.removeItem = function removeItem(table, index) {
        if(table == 'BsoeStructure') {
            $scope.bsInfoSeroAssets.agri_agrarian.Table_3.BsoeStructure.splice(index, 1);
        }
        else if(table == 'BsoeOequipment') {
            $scope.bsInfoSeroAssets.agri_agrarian.Table_3.BsoeOequipment.splice(index, 1);
        }
        else if(table == 'BsoeMachinery') {
            $scope.bsInfoSeroAssets.agri_agrarian.Table_3.BsoeMachinery.splice(index, 1);
        }
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
                    'table_data': ($scope.bsInfoSeroAssets),
                    'com_data': {
                        'district': $scope.district,
                        'bs_date': $scope.bs_date,
                        'user_id' : $scope.user_id,
                    },
                    'is_edit': $scope.is_edit,
                    'sector':'agri_agrarian'
                }),
            }).success(function(data) {
                $scope.bsInfoSeroAssets = init_data;
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

    //Edit Data
    $scope.editBsData = function(form){
        $scope.submitted = true;
        $scope.is_edit = true;
        document.getElementById("clearbtn").disabled = true;
        if (form.$valid) {
            $http({
                method: "POST",
                url: "/bs_fetch_edit_data",
                data: angular.toJson({
                    'table_name': 'Table_3',
                    'sector': 'agri_agrarian',
                    'com_data': {
                        'district': $scope.district,
                        'bs_date': $scope.bs_date
                    }
                }),
            }).success(function(data) {
                var edit_data_not_found = false;

                if(data != null) {
                    angular.forEach(data.agri_agrarian.Table_3, function(value, index) {
                        console.log(value);
                        if(value.length == 0) {
                            edit_data_not_found = true;
                        }
                    })
                    if(edit_data_not_found != true) {
                        $scope.bsInfoSeroAssets = data;
                        console.log($scope.bsInfoSeroAssets);
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

    //search Data
    $scope.searchBsData = function(form){
        document.getElementById("clearbtn").disabled = true;
		document.getElementById("editbtn").disabled = true;
		document.getElementById("subbtn").disabled = true;
		$scope.is_search = true;
        document.getElementById("clearbtn").disabled = true;

        if (form.$valid) {
            $http({
                method: "POST",
                url: "/bs_fetch_edit_data",
                data: angular.toJson({
                    'table_name': 'Table_3',
                    'sector': 'agri_agrarian',
                    'com_data': {
                        'district': $scope.district,
                        'bs_date': $scope.bs_date
                    }
                }),
            }).success(function(data) {
                var edit_data_not_found = false;

                if(data != null) {
                    angular.forEach(data.agri_agrarian.Table_3, function(value, index) {
                        console.log(value);
                        if(value.length == 0) {
                            edit_data_not_found = true;
                        }
                    })
                    if(edit_data_not_found != true) {
                        $scope.bsInfoSeroAssets = data;
                        console.log($scope.bsInfoSeroAssets);
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
        $scope.bsInfoSeroAssets = init_data;
        location.reload();
    }

    //Clear Function
    $scope.clear = function() {
        console.log('done');
        $scope.is_edit = false;
        $scope.bsInfoSeroAssets = angular.copy(init_data);
        location.reload();
    }
}]);
