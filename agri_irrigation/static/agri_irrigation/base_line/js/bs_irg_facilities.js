//Table 1
var app = angular.module('bsIrgFacilitiesApp', ['underscore'])

app.controller('bsIrgFacilitiesController', function($scope, $http,_) {
    $scope.district;
    $scope.baselineDate;
    $scope.division;
    $scope.region;
    $scope.bs_data={};
    $scope.is_edit = false;
    $scope.submitted = false;
    $scope.is_valid_data = true;

//Initialize Data
    var init_data = {
        'agri_irrigation': {
            'Table_1': {
                'BsIfMajor': [{
                    irrigation_facility : 'Tank 1',
                    capacity : null,
                    irrigated_area_paddy : null,
                    irrigated_area_ofc : null,
                    income_paddy : null,
                    income_ofc : null,
                    num_farmer_families : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_facility : 'Tank 2',
                    capacity : null,
                    irrigated_area_paddy : null,
                    irrigated_area_ofc : null,
                    income_paddy : null,
                    income_ofc : null,
                    num_farmer_families : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                'BsIfMedium': [{
                    irrigation_facility : 'Tank 1',
                    capacity : null,
                    irrigated_area_paddy : null,
                    irrigated_area_ofc : null,
                    income_paddy : null,
                    income_ofc : null,
                    num_farmer_families : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_facility : 'Tank 2',
                    capacity : null,
                    irrigated_area_paddy : null,
                    irrigated_area_ofc : null,
                    income_paddy : null,
                    income_ofc : null,
                    num_farmer_families : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                'BsIfMinor': [{
                    irrigation_facility : 'Tank 1',
                    capacity : null,
                    irrigated_area_paddy : null,
                    irrigated_area_ofc : null,
                    income_paddy : null,
                    income_ofc : null,
                    num_farmer_families : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_facility : 'Tank 2',
                    capacity : null,
                    irrigated_area_paddy : null,
                    irrigated_area_ofc : null,
                    income_paddy : null,
                    income_ofc : null,
                    num_farmer_families : null,
                    division:$scope.division,
                    region:$scope.region,
                }],
                'BsIfAnicuts': [{
                    irrigation_facility : 'Anicut 1',
                    capacity : null,
                    irrigated_area_paddy : null,
                    irrigated_area_ofc : null,
                    income_paddy : null,
                    income_ofc : null,
                    num_farmer_families : null,
                    division:$scope.division,
                    region:$scope.region,
                }, {
                    irrigation_facility : 'Anicut 2',
                    capacity : null,
                    irrigated_area_paddy : null,
                    irrigated_area_ofc : null,
                    income_paddy : null,
                    income_ofc : null,
                    num_farmer_families : null,
                    division:$scope.division,
                    region:$scope.region,
                }]
            }
        }
    }

    $scope.bsIrgFacilities = angular.copy(init_data);

//Add Enumerate Fileds
    $scope.insertAsset = function(table) {
        console.log($scope.bsIrgFacilities.agri_irrigation.Table_1[table]);
        var new_row;
        if(table == 'BsIfMajor') {
            new_row = {
                irrigation_facility : '',
                capacity : null,
                irrigated_area_paddy : null,
                irrigated_area_ofc : null,
                income_paddy : null,
                income_ofc : null,
                num_farmer_families : null,
            }
        }
        else if(table == 'BsIfMedium') {
            new_row = {
                irrigation_facility : '',
                capacity : null,
                irrigated_area_paddy : null,
                irrigated_area_ofc : null,
                income_paddy : null,
                income_ofc : null,
                num_farmer_families : null,
            }
        }
        else if(table == 'BsIfMinor') {
            new_row = {
                irrigation_facility : '',
                capacity : null,
                irrigated_area_paddy : null,
                irrigated_area_ofc : null,
                income_paddy : null,
                income_ofc : null,
                num_farmer_families : null,
            }
        }
        else if(table == 'BsIfAnicuts') {
            new_row = {
                irrigation_facility : '',
                capacity : null,
                irrigated_area_paddy : null,
                irrigated_area_ofc : null,
                income_paddy : null,
                income_ofc : null,
                num_farmer_families : null,
            }
        }
        $scope.bsIrgFacilities.agri_irrigation.Table_1[table].push(new_row);
    }

//Remove Enumerate Fields
    $scope.removeItem = function removeItem(table, index) {
        if(table == 'BsIfMajor') {
            $scope.bsIrgFacilities.agri_irrigation.Table_1.BsIfMajor.splice(index, 1);
        }
        else if(table == 'BsIfMedium') {
            $scope.bsIrgFacilities.agri_irrigation.Table_1.BsIfMedium.splice(index, 1);
        }
        else if(table == 'BsIfMinor') {
            $scope.bsIrgFacilities.agri_irrigation.Table_1.BsIfMinor.splice(index, 1);
        }
        else if(table == 'BsIfAnicuts') {
            $scope.bsIrgFacilities.agri_irrigation.Table_1.BsIfAnicuts.splice(index, 1);
        }
    }

//Save Data
    $scope.saveBsData = function(form) {
    var array = $scope.bsIrgFacilities.agri_irrigation.Table_1;
      var details = _.map(array, function(model_array) {
      _.map(model_array, function(model) {
          model.division = $scope.division;
          model.region = $scope.region;


      });
      });
        $scope.submitted = true;
        if (form.$valid) {
            $http({
            method: "POST",
            url: "/bs_save_data",
            data: angular.toJson({
            'table_data': $scope.bsIrgFacilities,
            'com_data': {'district': $scope.district,
            'bs_date': $scope.bs_date,
            },
            'is_edit': $scope.is_edit }),
            }).success(function(data) {

             $scope.bsIrgFacilities = init_data;
             $scope.is_edit = false;

             if(data == 'False')
              {
                    $("#modal-container-239454").modal('show');
                    $scope.is_valid_data = false;
                }
             else
              $("#modal-container-239453").modal('show');
        })
        }

    }

//Edit Data
    $scope.bsHsDataEdit = function(){
$scope.submitted = true;

   $scope.is_edit = true;
    $http({
    method: "POST",
    url: "/bs_fetch_edit_data",
    data: angular.toJson({'table_name': 'Table_1', 'sector': 'agri_irrigation',
    'com_data': {
          'district': $scope.district,
          'bs_date': $scope.bs_date,
          'division': $scope.division,
          'region':$scope.region,
          } }),
    }).success(function(data) {

    console.log(data);
    $scope.bsIrgFacilities = data;


    })
}

//Cancel Edit Data
$scope.cancelEdit = function(){
    $scope.is_edit = false;
    $scope.bsIrgFacilities = init_data;

}

//Clear Function
    $scope.clear = function() {
        console.log('done');
        $scope.is_edit = false;
        $scope.bsIrgFacilities = angular.copy(init_data);


    }
});
