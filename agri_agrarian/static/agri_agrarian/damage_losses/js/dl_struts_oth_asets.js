//Table 5
var app = angular.module('dlStrutsOthAsetsApp', [])
app.controller('dlStrutsOthAsetsController', ['$scope', '$http', function($scope, $http) {
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

    //Initailize data
    var init_data = {
        'agri_agrarian': {
            'Table_5': {
                //Tab 1
                'DsorDestStructures': [{
                    assets : '1 floor structure',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    tot_dest_pub : null,
                    tot_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : '2-3 floors structure',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    tot_dest_pub : null,
                    tot_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'More than 3 floors',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    tot_dest_pub : null,
                    tot_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Total',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    tot_dest_pub : null,
                    tot_dest_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }],
                //Tab 2
                'DsorDmgPubStructure': [{
                    assets : '1 floor structure',
                    num_part_dmg : null,
                    tot_dmg_roof : null,
                    tot_dmg_walls : null,
                    tot_dmg_floors : null,
                    damages : null,
                }, {
                    assets : '2-3 floors structure',
                    num_part_dmg : null,
                    tot_dmg_roof : null,
                    tot_dmg_walls : null,
                    tot_dmg_floors : null,
                    damages : null,
                }, {
                    assets : 'More than 3 floors',
                    num_part_dmg : null,
                    tot_dmg_roof : null,
                    tot_dmg_walls : null,
                    tot_dmg_floors : null,
                    damages : null,
                }, {
                    assets : 'Total',
                    num_part_dmg : null,
                    tot_dmg_roof : null,
                    tot_dmg_walls : null,
                    tot_dmg_floors : null,
                    damages : null,
                }],
                'DsorDmgPvtStructures': [{
                    assets : '1 floor structure',
                    num_part_dmg : null,
                    tot_dmg_roof : null,
                    tot_dmg_walls : null,
                    tot_dmg_floors : null,
                    damages : null,
                }, {
                    assets : '2-3 floors structure',
                    num_part_dmg : null,
                    tot_dmg_roof : null,
                    tot_dmg_walls : null,
                    tot_dmg_floors : null,
                    damages : null,
                }, {
                    assets : 'More than 3 floors',
                    num_part_dmg : null,
                    tot_dmg_roof : null,
                    tot_dmg_walls : null,
                    tot_dmg_floors : null,
                    damages : null,
                }, {
                    assets : 'Total',
                    num_part_dmg : null,
                    tot_dmg_roof : null,
                    tot_dmg_walls : null,
                    tot_dmg_floors : null,
                    damages : null,
                }],
                'DsorDmgPvtOequipment': [{
                    assets : 'Computers',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    num_dmg_pub : null,
                    num_dmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Furniture',
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
                'DsorDmgPvtMachinery': [{
                    assets : 'Vehicles',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    num_dmg_pub : null,
                    num_dmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Generators',
                    num_dest_pub : null,
                    num_dest_pvt : null,
                    num_dmg_pub : null,
                    num_dmg_pvt : null,
                    dmg_pub : null,
                    dmg_pvt : null,
                }, {
                    assets : 'Elevators',
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
            }
        }
    }

    $scope.dlStrutsOthAsets = angular.copy(init_data);

    //Get Districts and related baseline data
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
            $scope.is_edit_disable = true;
            $scope.check_search = true;

            $http({
                method: 'POST',
                url: '/bs_get_data_mock',
                contentType: 'application/json; charset=utf-8',
                data: angular.toJson({
                    'db_tables': ['BsoeOequipment', 'BsoeMachinery', 'BsoeStructure'],
                    'com_data': {
                        'district': $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                    'table_name': 'Table_3',
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
                            'table_name': 'Table_3',
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
        data_array = ['BsoeOequipment', 'BsoeMachinery'];
        var dl_model1 = null;
        var dl_model2 = null;

        angular.forEach(data_array, function(value, key) {
            obj_array = $scope.bs_data[value];
            console.log('test',obj_array);
            model_name = value;

            var particular_value_1 = null;
            var particular_value_2 = null;

            if(model_name == 'BsoeOequipment') {
                dl_model1 = 'DsorDmgPvtOequipment';
                particular_value_1 = 'Total';
                $scope.dlStrutsOthAsets.agri_agrarian.Table_5[dl_model1] = [];
            }
            if(model_name == 'BsoeMachinery') {
                dl_model2 = 'DsorDmgPvtMachinery';
                particular_value_2 = 'Total';
                $scope.dlStrutsOthAsets.agri_agrarian.Table_5[dl_model2] = [];
            }

            var obj1 = {
                assets : particular_value_1,
                num_dest_pub: null,
                num_dest_pvt: null,
                num_dmg_pub: null,
                num_dmg_pvt: null,
                dmg_pub: null,
                dmg_pvt: null
            };

            var obj2 = {
                assets : particular_value_2,
                num_dest_pub: null,
                num_dest_pvt: null,
                num_dmg_pub: null,
                num_dmg_pvt: null,
                dmg_pub: null,
                dmg_pvt: null
            };

            angular.forEach(obj_array, function(value, key) {
                var obj1 = {
                    assets : value.fields.assets,
                    num_dest_pub: null,
                    num_dest_pvt: null,
                    num_dmg_pub: null,
                    num_dmg_pvt: null,
                    dmg_pub: null,
                    dmg_pvt: null
                };
                var obj2 = {
                    assets : value.fields.assets,
                    num_dest_pub: null,
                    num_dest_pvt: null,
                    num_dmg_pub: null,
                    num_dmg_pvt: null,
                    dmg_pub: null,
                    dmg_pvt: null
                };

                if(model_name == 'BsoeOequipment') {
                    $scope.dlStrutsOthAsets.agri_agrarian.Table_5[dl_model1].push(obj1);
                }
                if(model_name == 'BsoeMachinery') {
                    $scope.dlStrutsOthAsets.agri_agrarian.Table_5[dl_model2].push(obj2);
                }
            });
            if(model_name == 'BsoeOequipment') {
                $scope.dlStrutsOthAsets.agri_agrarian.Table_5[dl_model1].push(obj1);
            }
            if(model_name == 'BsoeMachinery') {
                $scope.dlStrutsOthAsets.agri_agrarian.Table_5[dl_model2].push(obj2);
            }
        });
    }

    //Save data
    $scope.saveDlData = function(form) {
        $scope.submitted = true;
        $scope.is_submit = true;
        if(form.$valid) {
            $http({
                method: 'POST',
                url: '/dl_save_data',
               contentType: 'application/json; charset=utf-8',
                data: angular.toJson({
                    'table_data': $scope.dlStrutsOthAsets,
                    'com_data': {
                        'district_id': $scope.district.district__id,
                        'incident_id' : $scope.incident,
                        'user_id' : $scope.user_id,
                    },
                    'bs_date': $scope.bsCreatedeDate,
                    'is_edit':$scope.is_edit
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
                console.log(response);
            });
        }
        $scope.is_submit = false;
    }

    //Edit Data
    $scope.editDlData = function(form){
       $scope.is_edit = true;
       $scope.submitted = true;
       document.getElementById("clearbtn").disabled = true;
        if(form.$valid) {
            $http({
                method: "POST",
                url: '/dl_fetch_edit_data',
                data: angular.toJson({
                    'table_name': 'Table_5',
                    'sector': 'agri_agrarian',
                    'com_data': {
                        'district':  $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                   'is_edit':$scope.is_edit
               }),
            }).success(function(data) {
                $scope.dlStrutsOthAsets = data;
                console.log($scope.dlStrutsOthAsets);
            })
        }
    }

    //search Data
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
                    'table_name':  'Table_5',
                    'sector':'agri_agrarian',
                    'com_data': {
                        'district':  $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                    'is_edit':$scope.is_edit
                }),
            }).success(function(data) {
                $scope.dlStrutsOthAsets = data;
                console.log($scope.dlStrutsOthAsets);
            })
        }
    }

    //Cancel Edit
    $scope.cancelEdit = function(){
         $scope.is_edit = false;
         $scope.dlStrutsOthAsets = init_data;
         location.reload();
    }

    //Calculate Public Total
    $scope.calPubTotal=function(arr){
        var finaltotal = 0;
        angular.forEach(arr, function(value, key) {
            if(value.assets != 'Total'){
                finaltotal = finaltotal + value.dmg_pub ;
            }
        })
        return finaltotal;
    }

    //Calculate Private Total
    $scope.calPvtTotal=function(arr){
        var finaltotal = 0;
        angular.forEach(arr, function(value, key) {
            if(value.assets != 'Total'){
                finaltotal = finaltotal + value.dmg_pvt ;
            }
        })
        return finaltotal;
    }

    //Calculate Damage Total
    $scope.calDamgTotal=function(arr){
        var finaltotal = 0;
        angular.forEach(arr, function(value, key) {
            if(value.assets != 'Total'){
                finaltotal = finaltotal + value.damages ;
            }
        })
        return finaltotal;
    }

    //Calculate Grand Public Total
    $scope.calGrandPubTotal=function() {
        var finaltotal1 = 0;
        var finaltotal2 = 0;
        var finaltotal3 = 0;
        var finaltotal4 = 0;
        var grantot = 0;
        var array1=$scope.dlStrutsOthAsets.agri_agrarian.Table_5.DsorDestStructures;
        var array2 =$scope.dlStrutsOthAsets.agri_agrarian.Table_5.DsorDmgPubStructure;
        var array3 =$scope.dlStrutsOthAsets.agri_agrarian.Table_5.DsorDmgPvtOequipment;
        var array4 =$scope.dlStrutsOthAsets.agri_agrarian.Table_5.DsorDmgPvtMachinery;


        angular.forEach(array1, function(value, key) {
            finaltotal1 = value.dmg_pub ;
        })

        angular.forEach(array2, function(value, key) {
            if(value.assets != 'Total'){
                finaltotal2 = finaltotal2 + value.damages;
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

        grantot = finaltotal1+ finaltotal2 + finaltotal3 + finaltotal4;
        console.log('pub',finaltotal1, finaltotal2 , finaltotal3,finaltotal4);
        return grantot;
    }

    //Calculate Grand Private Total
    $scope.calGrandPvtTotal=function(){
        var finaltotal1 = 0;
        var finaltotal2 = 0;
        var finaltotal3 = 0;
        var finaltotal4 = 0;
        var finaltotal5 = 0;
        var grantot = 0;

        var array1=$scope.dlStrutsOthAsets.agri_agrarian.Table_5.DsorDestStructures;
        var array2 =$scope.dlStrutsOthAsets.agri_agrarian.Table_5.DsorDmgPvtStructures;
        var array3 =$scope.dlStrutsOthAsets.agri_agrarian.Table_5.DsorDmgPvtOequipment;
        var array4 =$scope.dlStrutsOthAsets.agri_agrarian.Table_5.DsorDmgPvtMachinery;

        angular.forEach(array1, function(value, key) {
             finaltotal1 =  value.dmg_pvt ;

        })

        angular.forEach(array2, function(value, key) {
            if(value.assets !='Total'){
                finaltotal2 = finaltotal2 + value.damages;
            }
        })

        angular.forEach(array3, function(value, key) {
            if(value.assets !='Total'){
                finaltotal3 = finaltotal3 + value.dmg_pvt ;
            }
        })

        angular.forEach(array4, function(value, key) {
            if(value.assets !='Total'){
                finaltotal4 = finaltotal4 + value.dmg_pvt ;
            }
        })

        grantot = finaltotal1+ finaltotal2 + finaltotal3 + finaltotal4 ;
        console.log('pvt',finaltotal1, finaltotal2 , finaltotal3,finaltotal4);
        return grantot;
    }

    //Clear Function
    $scope.clear = function() {
        console.log('done');
        $scope.is_edit = false;
        $scope.dlStrutsOthAsets = angular.copy(init_data);
        location.reload();
    }
}]);
