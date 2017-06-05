
var bsAstTransWaterApp = angular.module('bsAstTransWaterApp', ['ui.bootstrap', 'popoverToggle']);

bsAstTransWaterApp.controller('BsAstTransWaterController', function BsAstTransWaterController($scope, $http) {

$scope.district;
$scope.baselineDate;
$scope.bs_date;
$scope.is_edit = false;
$scope.submitted = false;
$scope.is_valid_data = true;
$scope.is_edit_disable = false;

var init_data = {
'transport_water':{
'Table_1':{
    'BsAstWaterWcrafts':
                [{
                    assets :'Ships',
                    public: null,
                    private: null,
                    avg_replace_cost: null,
                    avg_repair_cost: null,
                },{
                    assets :'Ferries',
                    public: null,
                    private: null,
                    avg_replace_cost: null,
                    avg_repair_cost: null,
                }],
    'BsAstWaterEquipment':
                [{
                    assets :'Navigation equipment',
                    avg_replace_cost: null,
                    avg_repair_cost: null,
                },{
                    assets :'Baggage handling',
                    avg_replace_cost: null,
                    avg_repair_cost: null,
                },{
                    assets :'Security equipment',
                    avg_replace_cost: null,
                    avg_repair_cost: null,
                },
                {
                    assets :'Vehicles',
                    avg_replace_cost: null,
                    avg_repair_cost: null,
                },
                {
                    assets :'Office equipment',
                    avg_replace_cost: null,
                    avg_repair_cost: null,
                }],
      'BsAstWaterMaterials':
                [{
                    assets :'Fuel (per Liter)',
                    public: null,
                    private: null,
                    avg_replace_cost: null,
                    avg_repair_cost: null,
                }],
      'BsAstWaterStructures':
                [{
                    assets :'Ports',
                    public: null,
                    private: null,
                    avg_replace_cost: null,
                    avg_repair_cost: null,
                }],
      'BsAstWaterBuildings':
                [{
                    assets :'1 floor',
                    avg_replace_cost: null,
                    avg_repair_cost_roof: null,
                    avg_repair_cost_wall: null,
                    avg_repair_cost_floor: null,
                },{
                    assets :'2-3 floors',
                    avg_replace_cost: null,
                    avg_repair_cost_roof: null,
                    avg_repair_cost_wall: null,
                    avg_repair_cost_floor: null,
                },{
                    assets :'More than3 floors',
                    avg_replace_cost: null,
                    avg_repair_cost_roof: null,
                    avg_repair_cost_wall: null,
                    avg_repair_cost_floor: null,
                }],

      'BsAstWaterEmployment':
                [{
                    assets :'Total Number of Employees of Water Transportation Companies',
                    male: null,
                    female: null,
                    total: null,
                },
                {
                    assets :'Total Number of Other Employees in Water Transport',
                    male: null,
                    female: null,
                    total: null,
                }],

}
}
}

$scope.bsAstTransWater = init_data;


//Disable Edit Button
    $scope.changeDis = function changeDis()
    {
        if($scope.district && $scope.bs_date){
            $scope.is_edit_disable = true;
        }
        else{
            $scope.is_edit_disable = false;
        }
    }


$scope.insertAssets = function(table)
{
    console.log($scope.bsAstTransWater.transport_water.Table_1.BsAstWaterStructures);
    var new_row;
    if(table == 'BsAstWaterWcrafts'){
    new_row = {
        assets :'',
        public: null,
        private: null,
        avg_replace_cost: null,
        avg_repair_cost: null,
    }
    }
    else if(table == 'BsAstWaterEquipment'){
    new_row = {
        assets :'',
        public: null,
        private: null,
        avg_replace_cost: null,
        avg_repair_cost: null,
    }
    }
    else if(table == 'BsAstWaterMaterials'){
    new_row = {
        assets :'',
        public: null,
        private: null,
        avg_replace_cost: null,
        avg_repair_cost: null,
    }
    }
    else if(table == 'BsAstWaterStructures'){
    new_row = {
        assets :'',
        public: null,
        private: null,
        avg_replace_cost: null,
        avg_repair_cost: null,
    }
    }


      $scope.bsAstTransWater.transport_water.Table_1[table].push(new_row);

}

$scope.removeItem = function removeItem(table, index)
{
if(table == 'BsAstWaterWcrafts'){
    $scope.bsAstTransWater.transport_water.Table_1.BsAstWaterWcrafts.splice(index,1);
    }
else if(table == 'BsAstWaterEquipment'){
    $scope.bsAstTransWater.transport_water.Table_1.BsAstWaterEquipment.splice(index,1);
    }
else if(table == 'BsAstWaterMaterials'){
    $scope.bsAstTransWater.transport_water.Table_1.BsAstWaterMaterials.splice(index,1);
    }
else if(table == 'BsAstWaterStructures'){
    $scope.bsAstTransWater.transport_water.Table_1.BsAstWaterStructures.splice(index,1);
    }

}


$scope.saveBsData = function()
{
$scope.submitted = true;

 $http({
    method: "POST",
    url: "/bs_save_data",
    data: angular.toJson({
    'table_data': ($scope.bsAstTransWater),
    'com_data': {'district': $scope.district,
    'bs_date': $scope.bs_date,
    },
    'is_edit': $scope.is_edit }),
    }).success(function(data) {

     $scope.bsAstTransWater = init_data;
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

$scope.bsHsDataEdit = function()
{
$scope.submitted = true;

   $scope.is_edit = true;
    $http({
    method: "POST",
    url: "/bs_fetch_edit_data",
    data: angular.toJson({'table_name': 'Table_1', 'sector': 'transport_water', 'com_data': {'district': $scope.district,
          'bs_date': $scope.bs_date} }),
    }).success(function(data) {

    console.log(data);
    $scope.bsAstTransWater = data;
    })


}

$scope.cancelEdit = function()
{
    $scope.is_edit = false;
    $scope.bsAstTransWater = init_data;
}

    //Clear Function
    $scope.clear = function() {
        console.log("init")
        $scope.is_edit = false;
        $scope.bsAstTransWater = angular.copy(init_data);
    }
})
