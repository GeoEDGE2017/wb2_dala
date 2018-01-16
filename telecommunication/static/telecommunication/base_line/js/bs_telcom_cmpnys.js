//Table 1
var app = angular.module('bsTelcomCmpnysApp', [])
app.controller('bsTelcomCmpnysController', function($scope, $http) {
    $scope.district;
    $scope.user_id;
    $scope.baselineDate;
    $scope.bs_data={};
    $scope.is_edit = false;
    $scope.is_submit = false;
    $scope.new_company = {id: null, district:null, company_name: null, ownership: null};
    $scope.submitted = false;
    $scope.is_valid_data = true;
    $scope.name;
    $scope.companies = [];
    $scope.is_edit_model = false;
    $scope.ownership;
    $scope.company;
    $scope.is_edit_disable = false;
    $scope.user_id;
    $scope.editTelCompany;
    $scope.is_submit = false;
    $scope.check_search = false;
	$scope.is_search = false;

    var init_data = {
        'telecommunication': {
            'Table_1': {
                'BsTelCompany': [],
            }
        }
    }

    $scope.bsTelcomCmpnys = angular.copy(init_data);

     //Disable Edit Button
    $scope.changeDis = function changeDis() {
        if($scope.district && $scope.bs_date) {
            $scope.is_edit_disable = true;
            $scope.check_search = true;
        }
        else {
            $scope.is_edit_disable = false;
            $scope.check_search = false;
        }
    }

    $scope.saveBsData = function(form) {
        $scope.submitted = true;
        $scope.is_submit = true;
        if (form.$valid) {
            var array = $scope.bsTelcomCmpnys.telecommunication.Table_1;
            var details = _.map(array, function(model_array) {
                _.map(model_array, function(model) {
                    model.company = model.company.id;
                });
            });
            console.log($scope.bsTelcomCmpnys);
            $http({
                method: "POST",
                url: "/bs_save_data",
                data: angular.toJson({
                    'table_data' : ($scope.bsTelcomCmpnys),
                    'com_data': {
                        'district' : $scope.district,
                        'bs_date' : $scope.bs_date,
                        'user_id' : $scope.user_id,
                    },
                    'is_edit' : $scope.is_edit,
                    'sector' : 'telecommunication',
                }),
            }).success(function(data) {
                console.log(data);
                $scope.is_edit = false;
                if (data == 'False') {
                    $scope.is_valid_data = false;
                    $("#modal-container-239454").modal('show');
                }
                else {
                    $("#modal-container-239453").modal('show');
                }
            }).error(function(data, status) {})
        }
        $scope.is_submit = false;
    }

    $scope.saveCompany = function() {
        console.log($scope.editTelCompany);
        if($scope.district != null && $scope.bs_date != null) {
            if(!$scope.is_edit_model) {
                $scope.new_company = {
                    company_name: $scope.company,
                    ownership: $scope.ownership
                };
                $http({
                    method: "POST",
                    url: "/add_entity_with_district",
                    data: angular.toJson({
                        'model_fields': $scope.new_company,
                        'model': 'CompanyName',
                        'is_edit': $scope.is_edit_model,
                        'sector': 'telecommunication',
                        'district_id': $scope.district,
                    }),
                }).success(function(data) {
                    if(data)
                        $scope.companies.push($scope.new_company);
                        $("#modal-container-218029").modal('hide');
                        $scope.is_edit_model = false;
                        window.location.reload();
                })
            }
        }
        else {
            console.log('District is not selected');
        }
    }

    $scope.editCompany = function() {
        console.log($scope.editTelCompany);
        if($scope.district != null && $scope.bs_date != null) {
            $http({
                method: "POST",
                url: "/add_entity_with_district",
                data: angular.toJson({
                    'model_fields': $scope.editTelCompany,
                    'model': 'CompanyName',
                    'is_edit': true,
                    'sector': 'telecommunication',
                    'district_id': $scope.district,
                }),
            }).success(function(data) {
                if(data) {
                    $scope.companies.push($scope.new_company);
                    $("#modal-container-218029").modal('hide');
                    window.location.reload();
                }
            })
        }
        else {
            console.log('District is not selected');
        }
    }

    $scope.fetchCompanies = function() {
        console.log($scope.district);
        if($scope.district != null) {
            $http({
                method: "POST",
                url: "/fetch_company_tele",
                data: angular.toJson({
                    'district': $scope.district,
                    'model': 'CompanyName',
                    'sector': 'telecommunication'
                }),
            }).success(function(data) {
                console.log(data);
                $scope.companies = data;
            })
        }
    }

    $scope.addFermForForm = function() {
        if($scope.district != null) {
            var new_row = {
                fixed_voice : false,
                fixed_tv : false,
                fixed_data : false,
                mobile_voice : false,
                mobile_data : false,
                ownership : $scope.ownership,
                company : $scope.company,
                company_name : '',
            }
            $scope.bsTelcomCmpnys.telecommunication.Table_1.BsTelCompany.push(new_row);
            console.log($scope.bsTelcomCmpnys.telecommunication.Table_1.BsTelCompany);
        }
    }

    $scope.removeFermForForm = function(table, index) {
        console.log(table, index);
        if(table == 'BsTelCompany') {
            $scope.bsTelcomCmpnys.telecommunication.Table_1.BsTelCompany.splice(index, 1);
        }
    }

    //Edit Data
    $scope.editBsData = function(form) {
        $scope.is_edit = true;
        $scope.submitted = true;
        document.getElementById("clearbtn").disabled = true;
        if(form.$valid) {
            $http({
                method: "POST",
                url: '/bs_fetch_edit_data',
                data: angular.toJson({
                    'table_name': 'Table_1',
                    'sector': 'telecommunication',
                    'com_data': {
                        'district': $scope.district,
                        'bs_date': $scope.bs_date,
                    },
                }),
            }).success(function(data) {
                var edit_data_not_found = false;
                if(data != null) {
                    angular.forEach(data.telecommunication.Table_1, function(value, index) {
                        console.log(value);
                        if(value.length == 0) {
                            edit_data_not_found = true;
                        }
                    })
                    if(edit_data_not_found != true) {
                        $scope.bsTelcomCmpnys = data;
                        $scope.setTelCompanyIDs();
                        console.log($scope.bsTelcomCmpnys);
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

    //Edit Data
    $scope.searchBsData = function(form) {
        document.getElementById("clearbtn").disabled = true;
		document.getElementById("editbtn").disabled = true;
		document.getElementById("subbtn").disabled = true;
		$scope.is_search = true;
        if(form.$valid) {
            $http({
                method: "POST",
                url: '/bs_fetch_edit_data',
                data: angular.toJson({
                    'table_name':  'Table_1',
                    'sector': 'telecommunication',
                    'com_data': {
                        'district': $scope.district,
                        'bs_date': $scope.bs_date,
                    },
                }),
            }).success(function(data) {
                var edit_data_not_found = false;
                if(data != null) {
                    angular.forEach(data.telecommunication.Table_1, function(value, index) {
                        console.log(value);
                        if(value.length == 0) {
                            edit_data_not_found = true;
                        }
                    })
                    if(edit_data_not_found != true) {
                        $scope.bsTelcomCmpnys = data;
                        $scope.setTelCompanyIDs();
                        console.log($scope.bsTelcomCmpnys);
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

    $scope.setTelCompanyIDs = function() {
        angular.forEach($scope.bsTelcomCmpnys.telecommunication.Table_1.BsTelCompany, function(value, index) {
            console.log(value);
            angular.forEach($scope.companies, function(company_value, index_in) {
                if(company_value.id == value.company) {
                    $scope.bsTelcomCmpnys.telecommunication.Table_1.BsTelCompany[index].company = company_value;
                    $scope.bsTelcomCmpnys.telecommunication.Table_1.BsTelCompany[index].company_name = company_value.company_name;
                    $scope.bsTelcomCmpnys.telecommunication.Table_1.BsTelCompany[index].ownership = company_value.ownership;
                }
            })
        })
    }

    //Clear Function
    $scope.clear = function() {
        console.log("clear");
        $scope.is_edit = false;
        $scope.bsTelcomCmpnys = angular.copy(init_data);
        location.reload();
    }

    $scope.display = function() {
        console.log($scope.bsTelcomCmpnys);
    }

    //Cancel Edit
    $scope.cancelEdit = function() {
        console.log("edit close")
        $scope.is_edit = false;
        $scope.bsTelcomCmpnys = init_data;
        location.reload();
    }

    $scope.test = function() {
        console.log($scope.bsTelcomCmpnys);
        console.log($scope.companies);
        $scope.setTelCompanyIDs();
        console.log($scope.bsTelcomCmpnys);
    }
});
