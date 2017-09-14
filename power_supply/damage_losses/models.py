from django.db import models

from power_supply.base_line.models import PvtPwPrdTypes, PvtPwProducers, BsPwGenFirm
from settings.models import District, Province
from incidents.models import IncidentReport


class DlSessionKeys(models.Model):
    data_type = models.CharField(max_length=120, blank=True, null=True)
    date = models.DateTimeField(blank=True, null=True)
    user = models.IntegerField(blank=True, null=True)
    table_name = models.CharField(max_length=255, blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', related_name='pow_dl_incident', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', related_name='pow_dl_province', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', related_name='pow_dl_district', blank=True, null=True)
    # pvt_pw_producers = models.ForeignKey(PvtPwProducers, db_column='pvt_pw_producers', related_name='pow_dl_pvt_pw_producers', blank=True, null=True)
    pw_gen_firm = models.ForeignKey(BsPwGenFirm, db_column='pw_gen_firm', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"dl_session_keys'


class CebNumEmp(models.Model):
    num_male = models.BigIntegerField(blank=True, null=True)
    num_female = models.BigIntegerField(blank=True, null=True)
    tot_emp = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"ceb_num_emp'


class CebNumCusAff(models.Model):
    num_domestic = models.BigIntegerField(blank=True, null=True)
    num_industrial = models.BigIntegerField(blank=True, null=True)
    num_commercial = models.BigIntegerField(blank=True, null=True)
    num_other = models.BigIntegerField(blank=True, null=True)
    num_total = models.BigIntegerField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)

    created_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"ceb_num_cus_aff'


class CebDmgAstGeneration(models.Model):
    num_dst_ast = models.FloatField(blank=True, null=True)
    tot_replace_cost = models.FloatField(blank=True, null=True)
    num_dmg_ast = models.FloatField(blank=True, null=True)
    to_repair_cost = models.FloatField(blank=True, null=True)
    tot_dmg = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"ceb_dmg_ast_generation'


class CebDmgAstTransmision(models.Model):
    num_dst_ast = models.FloatField(blank=True, null=True)
    tot_replace_cost = models.FloatField(blank=True, null=True)
    num_dmg_ast = models.FloatField(blank=True, null=True)
    to_repair_cost = models.FloatField(blank=True, null=True)
    tot_dmg = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"ceb_dmg_ast_transmision'


class CebDmgAstDistribution(models.Model):
    num_dst_ast = models.FloatField(blank=True, null=True)
    tot_replace_cost = models.FloatField(blank=True, null=True)
    num_dmg_ast = models.FloatField(blank=True, null=True)
    to_repair_cost = models.FloatField(blank=True, null=True)
    tot_dmg = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"ceb_dmg_ast_distribution'


class CebDmgAstStructures(models.Model):
    num_dst_ast = models.FloatField(blank=True, null=True)
    tot_replace_cost = models.FloatField(blank=True, null=True)
    num_dmg_ast = models.FloatField(blank=True, null=True)
    to_repair_cost = models.FloatField(blank=True, null=True)
    tot_dmg = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"ceb_dmg_ast_structures'


class CebLosAstIncome(models.Model):
    avg_income = models.FloatField(blank=True, null=True)
    reduction_y1 = models.FloatField(blank=True, null=True)
    reduction_y2 = models.FloatField(blank=True, null=True)
    losses_y1 = models.FloatField(blank=True, null=True)
    losses_y2 = models.FloatField(blank=True, null=True)
    tot_losses = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"ceb_los_ast_income'


class CebLosAstOther(models.Model):
    avg_income = models.FloatField(blank=True, null=True)
    reduction_y1 = models.FloatField(blank=True, null=True)
    reduction_y2 = models.FloatField(blank=True, null=True)
    losses_y1 = models.FloatField(blank=True, null=True)
    losses_y2 = models.FloatField(blank=True, null=True)
    tot_losses = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"ceb_los_ast_other'


class CebDmgAstOffEquipment(models.Model):
    num_dst_ast = models.FloatField(blank=True, null=True)
    tot_replace_cost = models.FloatField(blank=True, null=True)
    num_dmg_ast = models.FloatField(blank=True, null=True)
    to_repair_cost = models.FloatField(blank=True, null=True)
    tot_dmg = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"ceb_dmg_ast_off_equipment'


class CebDmgAstOther(models.Model):
    num_dst_ast = models.FloatField(blank=True, null=True)
    tot_replace_cost = models.FloatField(blank=True, null=True)
    num_dmg_ast = models.FloatField(blank=True, null=True)
    to_repair_cost = models.FloatField(blank=True, null=True)
    tot_dmg = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"ceb_dmg_ast_other'


class PvtNumEmp(models.Model):
    num_male = models.BigIntegerField(blank=True, null=True)
    num_female = models.BigIntegerField(blank=True, null=True)
    tot_emp = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    pw_gen_firm = models.ForeignKey(BsPwGenFirm, db_column='pw_gen_firm', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"pvt_num_emp'


class PvtDmgAst(models.Model):
    num_dst_ast = models.BigIntegerField(blank=True, null=True)
    tot_replace_cost = models.FloatField(blank=True, null=True)
    num_pdmg_ast = models.FloatField(blank=True, null=True)
    tot_repair_cost = models.FloatField(blank=True, null=True)
    tot_damaged_cost = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)
    pw_gen_firm = models.ForeignKey(BsPwGenFirm, db_column='pw_gen_firm', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"pvt_dmg_ast'


class PvtDmgLosses(models.Model):
    los_year1 = models.FloatField(blank=True, null=True)
    los_year2 = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    losses_type = models.CharField(max_length=255, blank=True, null=True)
    pw_gen_firm = models.ForeignKey(BsPwGenFirm, db_column='pw_gen_firm', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"pvt_dmg_losses'


# Table 4
class DlNumAffDistrict(models.Model):
    domestic = models.FloatField(blank=True, null=True)
    industrial = models.FloatField(blank=True, null=True)
    commercial = models.FloatField(blank=True, null=True)
    other = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"dl_num_aff_district'


class TotDmgCebDistrict(models.Model):
    tot_dmg = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"tot_dmg_ceb_district'


class TotLosCebDistrict(models.Model):
    losses_y1 = models.FloatField(blank=True, null=True)
    losses_y2 = models.FloatField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"tot_los_ceb_district'


class TotDmgPvtDistrict(models.Model):
    tot_replace_cost = models.FloatField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    pw_gen_firm = models.ForeignKey(BsPwGenFirm, db_column='pw_gen_firm', blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"tot_dmg_pvt_district'


class TotLossesPvtDistrict(models.Model):
    los_year1 = models.FloatField(blank=True, null=True)
    los_year2 = models.FloatField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    pw_gen_firm = models.ForeignKey(BsPwGenFirm, db_column='pw_gen_firm', blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    losses_type = models.CharField(max_length=255, blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"tot_losses_pvt_district'


# Table 5
class DlNumAffProvince(models.Model):
    domestic = models.BigIntegerField(blank=True, null=True)
    industrial = models.BigIntegerField(blank=True, null=True)
    commercial = models.BigIntegerField(blank=True, null=True)
    other = models.BigIntegerField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"dl_num_aff_province'


class TotDmgCebProvince(models.Model):
    tot_dmg = models.BigIntegerField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"tot_dmg_ceb_province'


class TotLosCebProvince(models.Model):
    losses_y1 = models.BigIntegerField(blank=True, null=True)
    losses_y2 = models.BigIntegerField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"tot_los_ceb_province'


class TotDmgPvtProvince(models.Model):
    tot_dmg = models.BigIntegerField(blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"tot_dmg_pvt_province'


class TotLossesPvtProvince(models.Model):
    los_year1 = models.BigIntegerField(blank=True, null=True)
    los_year2 = models.BigIntegerField(blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"tot_losses_pvt_province'


class Ownership(models.Model):
    ownership_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"ownership'

# Tbale 6


class DlNumAffNational(models.Model):
    domestic = models.BigIntegerField(blank=True, null=True)
    industrial = models.BigIntegerField(blank=True, null=True)
    commercial = models.BigIntegerField(blank=True, null=True)
    other = models.BigIntegerField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"dl_num_aff_national'


class TotDmgCebNational(models.Model):
    tot_dmg = models.BigIntegerField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"tot_dmg_ceb_national'


class TotLosCebNational(models.Model):
    losses_y1 = models.BigIntegerField(blank=True, null=True)
    losses_y2 = models.BigIntegerField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"tot_los_ceb_national'


class TotDmgPvtNational(models.Model):
    tot_dmg = models.BigIntegerField(blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"tot_dmg_pvt_national'


class TotLossesPvtNational(models.Model):
    los_year1 = models.BigIntegerField(blank=True, null=True)
    los_year2 = models.BigIntegerField(blank=True, null=True)
    ownership = models.CharField(max_length=255, blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    province = models.ForeignKey(Province, db_column='province', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'power_supply\".\"tot_losses_pvt_national'
