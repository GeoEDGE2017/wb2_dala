from __future__ import unicode_literals
from django.db import models
from incidents.models import IncidentReport
from settings.models import Province


# Table 1
# health
class DmgHealthTot(models.Model):
    tot_dmg = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_health_tot'


class LosHealthTot(models.Model):
    tot_loss = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_health_tot'


class HealthTotPub(models.Model):
    tot_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'health_tot_pub'


class HealthTotPvt(models.Model):
    tot_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'health_tot_pvt'


# education
class EducationTotPub(models.Model):
    tot_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'education_tot_pub'


class EducationTotPvt(models.Model):
    tot_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'education_tot_pvt'


class DmgEducationTot(models.Model):
    tot_dmg = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_education_tot'


class LosEducationTot(models.Model):
    tot_dmg = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_education_tot'


# mining
class LosMiningTot(models.Model):
    tot_loss = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_mining_tot'


class MiningTotPub(models.Model):
    tot_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mining_tot_pub'


class MiningTotPvt(models.Model):
    tot_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mining_tot_pvt'


class DmgMiningTot(models.Model):
    tot_dmg = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_mining_tot'


# OthGov
class OthGovSerTotPub(models.Model):
    tot_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'oth_gov_ser_tot_pub'


class DmgOthGovSerTot(models.Model):
    tot_dmg = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_oth_gov_ser_tot'


class LosOthGovSerTot(models.Model):
    tot_loss = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_oth_gov_ser_tot'


# Agrarian
class AgrarianTotPub(models.Model):
    tot_damages_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'agrarian_tot_pub'


class AgrarianTotPvt(models.Model):
    tot_damages_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'agrarian_tot_pvt'


class DmgAgrarianTot(models.Model):
    tot_damages = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_agrarian_tot'


class LosAgrarianTot(models.Model):
    tot_damages = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_agrarian_tot'


# AirTransportation
class AirTransportationTotPub(models.Model):
    tot_destroyed = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'air_transportation_tot_pub'


class AirTransportationTotPvt(models.Model):
    tot_destroyed = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'air_transportation_tot_pvt'


class DmgAirTransportationTot(models.Model):
    tot_destroyed = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_air_transportation_tot'


class LosAirTransportationTot(models.Model):
    tot_los = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_air_transportation_tot'


# Communication
class CommunicationTotPub(models.Model):
    tot_damages_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'communication_tot_pub'


class CommunicationTotPvt(models.Model):
    tot_damages_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'communication_tot_pvt'


class DmgCommunicationTot(models.Model):
    tot_damages = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_communication_tot'


# Fisheries
class DmgFisheriesTot(models.Model):
    tot_damages_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_fisheries_tot'


class LosFisheriesTot(models.Model):
    los_year_2_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_fisheries_tot'


class FisheriesTotPub(models.Model):
    tot_damages_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fisheries_tot_pub'


class FisheriesTotPvt(models.Model):
    tot_damages_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fisheries_tot_pvt'


# Housing
class DmgHousingTot(models.Model):
    tot_dmg = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_housing_tot'


class LosHousingTot(models.Model):
    tot_loss = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_housing_tot'


class HousingTotPvt(models.Model):
    tot_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'housing_tot_pvt'


# IndustryServices
class LosIndustryServicesTot(models.Model):
    tot_damages_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_industry_services_tot'


class DmgIndustryServicesTot(models.Model):
    tot_damages_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_industry_services_tot'


class IndustryServicesTotPub(models.Model):
    tot_damages_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'industry_services_tot_pub'


class IndustryServicesTotPvt(models.Model):
    tot_damages_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'industry_services_tot_pvt'


# Irrigation
class DmgIrrigationTot(models.Model):
    damages = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_irrigation_tot'


class IrrigationTotPub(models.Model):
    tot_damages_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'irrigation_tot_pub'


class LosIrrigationTot(models.Model):
    total_los = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_irrigation_tot'


# LandTransportation
class DmgLandTransportationTot(models.Model):
    damages = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_land_transportation_tot'


class LandTransportationTotPub(models.Model):
    damages = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'land_transportation_tot_pub'


class LandTransportationTotPvt(models.Model):
    tot_damages_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'land_transportation_tot_pvt'


class LosLandTransportationTot(models.Model):
    loss = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_land_transportation_tot'


# Livestock
class DmgLivestockTot(models.Model):
    tot_damages_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_livestock_tot'


class LivestockTotPub(models.Model):
    tot_damages_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'livestock_tot_pub'


class LivestockTotPvt(models.Model):
    tot_damages_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'livestock_tot_pvt'


class LosLivestockTot(models.Model):
    tot_damages_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_livestock_tot'


class LosCommunicationTot(models.Model):
    tot_los = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_communication_tot'


# PowerSupply
class PowerSupplyTotPub(models.Model):
    dmg_tot_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply_tot_pub'


class PowerSupplyTotPvt(models.Model):
    dmg_tot_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply_tot_pvt'


class LosPowerSupplyTot(models.Model):
    tot_los = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_power_supply_tot'


class DmgPowerSupplyTot(models.Model):
    tot_destroyed = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_power_supply_tot'


# RailTransportation
class RailTransportationTotPub(models.Model):
    dmg_tot_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rail_transportation_tot_pub'


class LosRailTransportationTot(models.Model):
    tot_los = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_rail_transportation_tot'


class DmgRailTransportationTot(models.Model):
    tot_damages = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_rail_transportation_tot'


# Tourism
class TourismTotPub(models.Model):
    tot_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tourism_tot_pub'


class TourismTotPvt(models.Model):
    tot_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tourism_tot_pvt'


class LosTourismTot(models.Model):
    tot_loss = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_tourism_tot'


class DmgTourismTot(models.Model):
    tot_damages = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_tourism_tot'


# WaterSupply
class WaterSupplyTotPub(models.Model):
    tot_dmg_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'water_supply_tot_pub'


class DmgWaterSupplyTot(models.Model):
    dmg_tot_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_water_supply_tot'


class LosWaterSupplyTot(models.Model):
    tot_los = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_water_supply_tot'


# WaterTransportation
class WaterTransportationTotPub(models.Model):
    tot_destroyed = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'water_transportation_tot_pub'


class WaterTransportationTotPvt(models.Model):
    tot_destroyed = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'water_transportation_tot_pvt'


class LosWaterTransportationTot(models.Model):
    tot_los = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'los_water_transportation_tot'


class DmgWaterTransportationTot(models.Model):
    tot_destroyed = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dmg_water_transportation_tot'


# Table 2
class SumProvinceDmg(models.Model):
    tot_dmg = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', related_name='mn_dl_province123', blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sum_province_dmg'


class SumProvinceLoss(models.Model):
    tot_loss = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', related_name='mn_dl_province13', blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sum_province_loss'


class SumProvincePub(models.Model):
    tot_pub = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', related_name='mn_dl_province14', blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sum_province_pub'


class SumProvincePvt(models.Model):
    tot_pvt = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', related_name='mn_dl_province15', blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sum_province_pvt'























