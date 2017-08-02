//Table 1
var app = angular.module('bsNoofPeplEngdFisheriesApp', [])

app.controller('bsNoofPeplEngdFisheriesController', ['$scope', '$http', function($scope, $http) {
    $scope.district;
    $scope.baselineDate;
    $scope.bs_data={};
    $scope.is_edit = false;
    $scope.submitted = false;
    $scope.is_valid_data = true;
    $scope.user_id;

    //initialize Data
    var init_data = {
        'agri_fisheries': {
            'Table_1': {
                'BsPeoFisheries': [{
                    fisheries : 'Inland fisheries',
                    num_families : null,
                    num_male : null,
                    num_female : null,
                }, {
                    fisheries : 'River fishing',
                    num_families : null,
                    num_male : null,
                    num_female : null,
                }, {
                    fisheries : 'Marine fishing',
                    num_families : null,
                    num_male : null,
                    num_female : null,
                }, ],
            }
        }
    }

    $scope.bsNoofPeplEngdFisheries = angular.copy(init_data);

    //Save data
    $scope.saveBsData = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
            $http({
                method: "POST",
                url: "/bs_save_data",
                data: angular.toJson({
                    'table_data': ($scope.bsNoofPeplEngdFisheries),
                    'com_data': {
                        'district': $scope.district,
                        'bs_date': $scope.bs_date,
                        'user_id' : $scope.user_id,
                    },
                    'is_edit': $scope.is_edit,
                    'sector':'agri_fisheries'
                }),
            }).success(function(data) {
                $scope.bsNoofPeplEngdFisheries = init_data;
                $scope.is_edit = false;
                if (data == 'False'){
                    $("#modal-container-239454").modal('show');
                    $scope.is_valid_data = false;
                }
                else{
                    $("#modal-container-239453").modal('show');
                }
            })
        }
    }

    //Edit Data
    $scope.bsHsDataEdit = function(form){
        $scope.submitted = true;
        $scope.is_edit = true;
        if (form.$valid) {
            $http({
                method: "POST",
                url: "/bs_fetch_edit_data",
                data: angular.toJson({
                    'table_name': 'Table_1',
                    'sector': 'agri_fisheries',
                    'com_data': {
                        'district': $scope.district,
                        'bs_date': $scope.bs_date,
                        'user_id' : $scope.user_id,
                    }
                }),
            }).success(function(data) {
                console.log(data);
//                $scope.bsNoofPeplEngdFisheries = data;

                var edit_data_not_found = false;
                if(data != null) {
                    console.log('----if');
                    angular.forEach(data.agri_fisheries.Table_1, function(value, index) {
                        console.log('----forEach');
                        console.log(value);
                        if(value.length == 0) {
                            console.log('----');
                            edit_data_not_found = true;
                        }
                    })
                    if(edit_data_not_found != true) {
                        $scope.bsNoofPeplEngdFisheries = data;
                    }
                    else {
                        $("#modal-container-239456").modal('show');
                    }
                }
                else {
                    console.log('----else');
                    $("#modal-container-239456").modal('show');
                }
            })
        }
    }

    //Cancel Edit
    $scope.cancelEdit = function(){
        $scope.is_edit = false;
        $scope.bsNoofPeplEngdFisheries = init_data;
    }

    //Clear Function
    $scope.clear = function() {
        console.log('done');
        $scope.is_edit = false;
        $scope.bsNoofPeplEngdFisheries = angular.copy(init_data);
    }

}]);
