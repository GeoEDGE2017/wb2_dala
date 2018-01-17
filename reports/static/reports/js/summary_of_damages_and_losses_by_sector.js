//Table 1
var app = angular.module('sumOfDamagesAndLossesBySectorApp', ['underscore', 'ui.bootstrap', 'popoverToggle', 'ngPrint']);

app.controller("sumOfDamagesAndLossesBySectorController", function ($scope,$http,$parse) {
    $scope.incident;

    $scope.fetchSummaryData = function() {
        if($scope.incident) {
            $http({
                method: "POST",
                url: '/get_summary_data_by_sector',
                data: angular.toJson({
                    'table_name': 'Table_1',
                    'com_data': {
                        'incident': $scope.incident,
                    },
                    'sectors': [
                        {'transport_land': ['DmgLandTransportationTot', 'LosLandTransportationTot', 'LandTransportationTotPub',
                            'LandTransportationTotPvt']},
                        {'transport_air': ['DmgAirTransportationTot', 'LosAirTransportationTot', 'AirTransportationTotPub',
                            'AirTransportationTotPvt']},
                        {'transport_water': ['DmgWaterTransportationTot', 'LosWaterTransportationTot', 'WaterTransportationTotPub',
                            'WaterTransportationTotPvt']},
                        {'transport_rail': ['DmgRailTransportationTot', 'LosRailTransportationTot', 'RailTransportationTotPub']},
                        {'power_supply': ['DmgPowerSupplyTot', 'LosPowerSupplyTot', 'PowerSupplyTotPub']},
                        {'water_supply': ['DmgWaterSupplyTot', 'LosWaterSupplyTot', 'WaterSupplyTotPub']},
                        {'telecommunication': ['DmgCommunicationTot', 'LosCommunicationTot', 'CommunicationTotPub',
                            'CommunicationTotPvt']},
                        {'agri_agrarian': ['DmgAgrarianTot', 'LosAgrarianTot', 'AgrarianTotPub', 'AgrarianTotPvt']},
                        {'agri_livestock': ['DmgLivestockTot', 'LosLivestockTot', 'LivestockTotPub', 'LivestockTotPvt']},
                        {'agri_fisheries': ['DmgFisheriesTot', 'LosFisheriesTot', 'FisheriesTotPub', 'FisheriesTotPvt']},
                        {'agri_irrigation': ['DmgIrrigationTot', 'LosIrrigationTot', 'IrrigationTotPub']},
                        {'industry_services': ['DmgIndustryServicesTot', 'LosIndustryServicesTot', 'IndustryServicesTotPub',
                            'IndustryServicesTotPvt']},
                        {'tourism': ['DmgTourismTot', 'LosTourismTot', 'TourismTotPub', 'TourismTotPvt']},
                        {'housing': ['DmgHousingTot', 'LosHousingTot', 'HousingTotPvt']},
                        {'health': ['DmgHealthTot', 'LosHealthTot', 'HealthTotPub', 'HealthTotPvt']},
                        {'education': ['DmgEducationTot', 'EducationTotPub', 'EducationTotPvt', 'LosEducationTot']},
                        {'mining': ['DmgMiningTot', 'LosMiningTot', 'MiningTotPub', 'MiningTotPvt']},
                        {'other_government': ['DmgOthGovSerTot', 'LosOthGovSerTot', 'OthGovSerTotPub']}
                    ]
                }),
            }).success(function(data) {
                $scope.data = data;
                $scope.sector_summary = data;
                console.log($scope.sector_summary);

    //            if($scope.checkIfNull()) {
    //                $("#modal-container-239456").modal('show');
    //            }
            })
        }
    }

    $scope.checkIfNull = function() {
        var isNull = $scope.dlWaterSupplySumNat ? angular.equals({}, $scope.dlWaterSupplySumNat.water_supply.Table_7) : true;
        return isNull;
    }

//    $scope.fetchSummaryData();

    $scope.grandTotDamage = function() {
        if(!angular.isUndefined($scope.provinceSumNat)) {
            var tot_damage = 0;
            angular.forEach($scope.provinceSumNat.report.Table_2, function(value, index) {
                angular.forEach(value, function(value_in, key) {
                    if(value_in.length > 0) {
                        if(key == 'SumProvinceDmg') {
                            tot_damage = tot_damage + $scope.parseToFloat(value_in[0].tot_dmg);
                        }
                    }
                })
            })
            return tot_damage;
        }
    }
})
