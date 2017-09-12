from django.db import models
from incidents.models import IncidentReport
from settings.models import District, Province
from telecommunication.base_line.models import Ownership, CompanyName


class DlSessionKeys(models.Model):
    data_type = models.CharField(max_length=120, blank=True, null=True)
    date = models.DateTimeField(blank=True, null=True)
    user = models.IntegerField(blank=True, null=True)
    table_name = models.CharField(max_length=255, blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', related_name='tel_dl_province', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', related_name='tel_dl_district', blank=True, null=True)
    company = models.ForeignKey(CompanyName, db_column='company', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"dl_session_keys'


# Table 2
class DlNumEmpDistrict(models.Model):
    company = models.ForeignKey(CompanyName, db_column='company_id', blank=True, null=True)
    num_emp_male = models.BigIntegerField(blank=True, null=True)
    mun_emp_female = models.BigIntegerField(blank=True, null=True)
    tot_emp = models.BigIntegerField(blank=True, null=True)
    num_clients = models.BigIntegerField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"dl_num_emp_district'


class DmgAstTelStructure(models.Model):
    dmg_val_replace = models.FloatField(blank=True, null=True)
    pdmg_val_repair = models.FloatField(blank=True, null=True)
    tot_dmg = models.FloatField(blank=True, null=True)
    company = models.ForeignKey(CompanyName, db_column='company_id', blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"dmg_ast_tel_structure'


class DmgAstTelEquipment(models.Model):
    dmg_val_replace = models.FloatField(blank=True, null=True)
    pdmg_val_repair = models.FloatField(blank=True, null=True)
    tot_dmg = models.FloatField(blank=True, null=True)
    company = models.ForeignKey(CompanyName, db_column='company_id', blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"dmg_ast_tel_equipment'


class DmgAstTelMachinery(models.Model):
    dmg_val_replace = models.FloatField(blank=True, null=True)
    pdmg_val_repair = models.FloatField(blank=True, null=True)
    tot_dmg = models.FloatField(blank=True, null=True)
    company = models.ForeignKey(CompanyName, db_column='company_id', blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"dmg_ast_tel_machinery'


class DmgAstTelVehicles(models.Model):
    dmg_val_replace = models.FloatField(blank=True, null=True)
    pdmg_val_repair = models.FloatField(blank=True, null=True)
    tot_dmg = models.FloatField(blank=True, null=True)
    company = models.ForeignKey(CompanyName, db_column='company_id', blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"dmg_ast_tel_vehicles'


class DmgAstTelOthers(models.Model):
    dmg_val_replace = models.FloatField(blank=True, null=True)
    pdmg_val_repair = models.FloatField(blank=True, null=True)
    tot_dmg = models.FloatField(blank=True, null=True)
    company = models.ForeignKey(CompanyName, db_column='company_id', blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"dmg_ast_tel_others'


class DlLosses(models.Model):
    year1_los = models.FloatField(blank=True, null=True)
    year2_los = models.FloatField(blank=True, null=True)
    tot_losses = models.FloatField(blank=True, null=True)
    company = models.ForeignKey(CompanyName, db_column='company_id', blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"dl_losses'


# Table 3
class DlDmgFirmDistrict(models.Model):
    tot_damages = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    firm = models.ForeignKey(CompanyName, db_column='firm', blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"dl_dmg_firm_district'


class LosFirmYear1District(models.Model):
    year1_los = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    firm = models.ForeignKey(CompanyName, db_column='firm', blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"los_firm_year1_district'


class LosFirmYear2District(models.Model):
    year2_los = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    firm = models.ForeignKey(CompanyName, db_column='firm', blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"los_firm_year2_district'


# Table 5
class DlDmgBusTotNational(models.Model):
    tot_damages = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"dl_dmg_bus_tot_national'


class DlDmgBusTotGroupNational(models.Model):
    tot_damages = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"dl_dmg_bus_tot_group_national'


class DlDmgFirmNational(models.Model):
    tot_damages = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    firm = models.ForeignKey(CompanyName, db_column='firm', blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"dl_dmg_firm_national'


class DlDmgFirmGroupNational(models.Model):
    tot_damages = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"dl_dmg_firm_group_national'


class LosFirmYear1National(models.Model):
    year1_los = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    firm = models.ForeignKey(CompanyName, db_column='firm', blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)
    # company_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"los_firm_year1_national'


class LosFirmYear1GroupsNational(models.Model):
    year1_los = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"los_firm_year1_group_national'


class LosFirmYear2National(models.Model):
    year2_los = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    firm = models.ForeignKey(CompanyName, db_column='firm', blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)
    # company_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"los_firm_year2_national'


class LosFirmYear2GroupsNational(models.Model):
    year2_los = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telecommunication\".\"los_firm_year2_group_national'
