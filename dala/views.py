from __future__ import absolute_import
import datetime
from django.core.serializers.json import DjangoJSONEncoder
from incidents.models import IncidentReport
from tourism.base_line.models import BsTouBusiness, InfType
import yaml, json
from django.apps import apps
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from settings.models import District, Province
from django.core import serializers
from django.conf import settings
from django.http import HttpResponse
from mining.base_line.models import Firm
from agri_livestock.base_line.models import Organization
from health.base_line.models import PrivateClinic
import reports.models
from education.base_line.models import PreSchools, PrimarySchools, SecondarySchools, TechInstitutes, Universities
from users.models import UserDistrict
import smtplib
from django.db import connection
import collections
import dateutil.parser

@csrf_exempt
def send_email(request):
    dl_data = (yaml.safe_load(request.body))
    username = dl_data['username']
    name = dl_data['name']
    cno = dl_data['cno']
    print(name);
    print(cno);

    fromaddr = 'sachh93@gmail.com'
    toaddrs = 'geoedgeapps@gmail.com'
    msg = 'The user of the account which has' + " " + str(username)+  " " + ' as the username has forgotten the password.Please contact.Name is' + " " + str(name) + ' and contact number is' + " " + str(cno)
    # Credentials (if needed)
    print("msg",msg)
    username = 'sachh93@gmail.com'
    password = 'sachiesep2317'

    # The actual mail send
    server = smtplib.SMTP('smtp.gmail.com:587')
    server.starttls()
    server.login(username,password)
    server.sendmail(fromaddr, toaddrs, msg)
    server.quit()

    return HttpResponse(
        json.dumps(True), content_type='application/javascript; charset=utf8'
    )


def fetch_districts(user):
    districts = District.objects.all().order_by('name')
    incidents = IncidentReport.objects.all()
    user = user
    print 'user', user
    if user.is_superuser:
        incidents = IncidentReport.objects.filter(active=True)
        return {'districts': districts, 'incidents': incidents, 'user': user}
    else:
        role = user.user_role.code_name

        if role == 'district':
            user_districts = UserDistrict.objects.filter(user_id=user.id)
            districts = []
            for user_district in user_districts:
                districts.extend(District.objects.filter(id=user_district.district_id))
            incidents = IncidentReport.objects.filter(effectedarea__district=user_district.district_id, active=True)

        elif role == 'provincial':
            province = user.province
            districts = province.district_set.all()
            incidents = IncidentReport.objects.filter(effectedarea__district__province=province, active=True).distinct()
        # incidents = IncidentReport.objects.all()
        return {'districts': districts, 'incidents': incidents, 'user': user}


@csrf_exempt
def fetch_incident_districts(request):
    dl_data = (yaml.safe_load(request.body))
    incident_id = dl_data['incident']
    get_user = dl_data['user']
    print "user", get_user
    user_districts = UserDistrict.objects.filter(user_id=get_user)
    districts = []
    for user_district in user_districts:
        districts.extend(District.objects.filter(id=user_district.district_id))
    incident = IncidentReport.objects.get(pk=incident_id)
    get_affected_district = incident.effectedarea_set.values('district__id', 'district__name').distinct().order_by('district__name')
    affected_district = []
    for affected_dis in get_affected_district:
        for district in districts:
            if affected_dis['district__id'] == district.id:
                print "yes", type(affected_dis)
                affected_district.append(affected_dis)
                print "dileepa", affected_district
    return HttpResponse(
        json.dumps(list(affected_district)),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def fetch_incident_provinces(request):
    dl_data = (yaml.safe_load(request.body))
    print dl_data
    incident_id = dl_data['incident']
    incident = IncidentReport.objects.get(pk=incident_id)
    affected_provinces = incident.effectedarea_set.values('district__id', 'district__province_id',
                                                          'district__province__name').distinct('district__province_id').order_by('district__province_id')

    return HttpResponse(
        json.dumps(list(affected_provinces)),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def fetch_business_types(request):
    print "-* fetch_business_types"
    dl_data = (yaml.safe_load(request.body))

    # change appropiately in the future
    # business_types = TouBusiness.objects.all()
    # business_types = TouBusiness.objects.filter(~Q(business=''))
    # from django.db.models import Q  ## for not operator

    # print "before getting objects"
    # business_types = BsTouBusiness.objects.all()
    # print "got objects"
    # business_types_json = business_types.values('business').distinct()
    # print "converted"
    # print dl_data['district']
    # print dl_data['bs_date']
    try:
        business_types = BsTouBusiness.objects.filter(district=dl_data['district'], bs_date=dl_data['bs_date'])
    except:
        business_types = BsTouBusiness.objects.filter(district=dl_data['district'])

    business_types_json = business_types.values('business').distinct()

    return HttpResponse(
        json.dumps(list(business_types_json)),
        content_type='application/javascript; charset=utf8'
    )

# dileepa
@csrf_exempt
def fetch_business_types_for_summary(request):
    print "-* fetch_business_types"
    dl_data = (yaml.safe_load(request.body))

    # change appropiately in the future
    # business_types = TouBusiness.objects.all()
    # business_types = TouBusiness.objects.filter(~Q(business=''))
    # from django.db.models import Q  ## for not operator

    print "before getting objects"
    business_types = BsTouBusiness.objects.all()
    print "got objects"
    business_types_json = business_types.values('business').distinct()
    print "converted"

    return HttpResponse(
        json.dumps(list(business_types_json)),
        content_type='application/javascript; charset=utf8'
    )


# chamupathi
# Tourism Infrastructure types
@csrf_exempt
def fetch_tourism_infrastructure_types(request):
    dl_data = (yaml.safe_load(request.body))

    # change appropiately in the future
    # business_types = TouBusiness.objects.all()
    # business_types = TouBusiness.objects.filter(~Q(business=''))
    # from django.db.models import Q  ## for not operator

    inf_types = InfType.objects.all()
    inf_types_json = inf_types.values('infrastructure').distinct()

    return HttpResponse(
        json.dumps(list(inf_types_json)),
        content_type='application/javascript; charset=utf8'
    )


# this method returns single columned data
@csrf_exempt
def fetch_entities_plain(request):
    data = (yaml.safe_load(request.body))
    model_name = data['model']
    sector = data['sector']

    sub_app_name = sector + '.base_line'
    model_class = apps.get_model(sub_app_name, model_name)
    fetched_data = model_class.objects.all()
    fetched_data_json = fetched_data.values()

    return HttpResponse(
        json.dumps(list(fetched_data_json)),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def fetch_pw_gen_firms(request):
    data = (yaml.safe_load(request.body))
    model_name = data['model']
    sector = data['sector']

    sub_app_name = sector + '.base_line'
    model_class = apps.get_model(sub_app_name, model_name)
    fetched_data = model_class.objects.all()
    fetched_data_json = fetched_data.values('assets', 'id', 'ownership', 'description')

    return HttpResponse(
        json.dumps(list(fetched_data_json)),
        content_type='application/javascript; charset=utf8'
    )


# this method returns single columned data
@csrf_exempt
def fetch_entities_plain_column(request):
    data = (yaml.safe_load(request.body))
    model_name = data['model']
    sector = data['sector']
    col = data['col']

    sub_app_name = sector + '.base_line'
    model_class = apps.get_model(sub_app_name, model_name)
    fetched_data = model_class.objects.all()
    fetched_data_json = fetched_data.values(col).distinct()

    return HttpResponse(
        json.dumps(list(fetched_data_json)),
        content_type='application/javascript; charset=utf8'
    )


# dileepa
@csrf_exempt
def fetch_entities_plain_column_from_district(request):
    print 'fetch_entities_plain_column_from_district'
    data = (yaml.safe_load(request.body))
    model_name = data['model']
    sector = data['sector']
    col = data['col']
    district = data['district']

    sub_app_name = sector + '.base_line'
    model_class = apps.get_model(sub_app_name, model_name)
    fetched_data = model_class.objects.filter(district=district["district__id"])
    fetched_data_json = fetched_data.values(col).distinct()

    return HttpResponse(
        json.dumps(list(fetched_data_json)),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def bs_save_data(request):
    bs_data = (yaml.safe_load(request.body))
    bs_table_hs_data = bs_data['table_data']
    com_data = bs_data['com_data']
    district = com_data['district']
    bs_date = com_data['bs_date']
    todate = timezone.now()
    is_edit = bs_data['is_edit']
    current_user = None

    try:
        current_user = com_data['user_id']
        print 'Current User', current_user
    except Exception as e:
        print 'Current User Error'

    print 'in adding', is_edit
    print bs_table_hs_data

    if not is_edit:
        print 'in'
        for sector in bs_table_hs_data:
            sub_app_name = sector + '.base_line'

            print 'sub_app_name :', sub_app_name

            for interface_table in bs_table_hs_data[sector]:
                print 'interface table', ' -->', interface_table, '\n'

                sub_app_session = apps.get_model(sub_app_name, 'BdSessionKeys')

                print 'got model'
                record_exist = sub_app_session.objects.filter(bs_date=com_data['bs_date'],
                                                            table_name=interface_table,
                                                            district=district)

                if not record_exist:

                    for db_table in bs_table_hs_data[sector][interface_table]:

                        print 'db table', ' -->', db_table, '\n'

                        for row in bs_table_hs_data[sector][interface_table][db_table]:

                            model_class = apps.get_model(sub_app_name, db_table)
                            model_object = model_class()

                            # assigning common properties to model object
                            model_object.created_date = todate
                            if current_user != None:
                                model_object.created_user = current_user
                                model_object.lmu = current_user
                            model_object.lmd = todate
                            model_object.district_id = district
                            model_object.bs_date = bs_date
                            # model_object.lmu = get_user_id_from_username('housing_user')

                            print 'row', ' --> ', row, '\n', ' object '

                            for property in row:
                                setattr(model_object, property, row[property])

                                print 'property ', ' --> ', property, ' db_property ', row[property], ' index ', '\n'
                                model_object.save()

                                # get bs full date
                    split_date = bs_date.split('/')
                    bs_month = split_date[0]
                    bs_year = split_date[1]
                    bs_full_date = datetime.date(int(bs_year), int(bs_month), 1)

                    bd_session = sub_app_session(bs_date=com_data['bs_date'], table_name=interface_table,
                                               date=todate, district_id=district, user=current_user, data_type='base_line',
                                               full_bs_date=bs_full_date)
                    bd_session.save()
                else:
                    return HttpResponse(False)

    else:
        bs_save_edit_data(bs_table_hs_data, com_data)

    return HttpResponse('success')


# dileepa
@csrf_exempt
def update_enumirate_bs_data(request):
    print 'update_enumirate_bs_data\n'
    data = (yaml.safe_load(request.body))
    enum_data = data['enum_data']
    com_data = data['com_data']

    interface_table_name = None
    for sector in enum_data:
        for interface_table in enum_data[sector]:
            interface_table_name = interface_table

    print data['sector']
    print interface_table_name
    print com_data['district']
    print com_data['bs_date']

    dsdate = get_bd_session_key_record(data['sector'], interface_table_name, com_data['district'], com_data['bs_date'])

    for sector in enum_data:
        sub_app_name = sector + '.base_line'
        print 'sub_app_name :', sub_app_name
        for interface_table in enum_data[sector]:
            for db_table in enum_data[sector][interface_table]:
                for row in enum_data[sector][interface_table][db_table]:
                    for dl_interface_table in row['dl_tables']:
                        for dl_db_table in row['dl_tables'][dl_interface_table]:
                            info = {'sector': data['sector'], 'dltable': get_db_table_from_model(str(dl_db_table)),
                                    'district': com_data['district'], 'dsdate': dsdate,
                                    'oldasset': row['oldasset'], 'newasset': row['newasset'],
                                    'dl_asset_field': row['dl_tables'][dl_interface_table][dl_db_table]['dl_asset_field']}

                            sql = """UPDATE {sector}.{dltable} dla
                                SET {dl_asset_field} = '{newasset}'
                                WHERE dla.{dl_asset_field} = (SELECT di.{dl_asset_field}
                                    FROM {sector}.{dltable} di
                                         JOIN {sector}.dl_session_keys dls ON di.created_date =  dls.date
                                         JOIN {sector}.bd_session_keys bss ON dls.bs_date = bss.date
                                    WHERE di.district = {district} AND bss.date = '{dsdate}'
                                    AND di.{dl_asset_field} = '{oldasset}')
                                AND dla.district = {district}
                                AND dla.created_date = (SELECT dls.date
                                    FROM {sector}.{dltable} di
                                         JOIN {sector}.dl_session_keys dls ON di.created_date =  dls.date
                                         JOIN {sector}.bd_session_keys bss ON dls.bs_date = bss.date
                                    WHERE di.district = {district} AND bss.date = '{dsdate}'
                                    AND di.{dl_asset_field} = '{oldasset}')""".format(**info)

                            print dl_db_table
                            print sql
                            cursor = connection.cursor()
                            cursor.execute(sql)
                            # row = cursor.fetchone()
    return HttpResponse('success')


# dileepa
@csrf_exempt
def update_enumirate_dl_data(request):
    print 'update_enumirate_dl_data\n'
    data = (yaml.safe_load(request.body))
    enum_data = data['enum_data']
    com_data = data['com_data']

    interface_table_name = None
    for sector in enum_data:
        for interface_table in enum_data[sector]:
            interface_table_name = interface_table

    print data['sector']
    print interface_table_name
    print com_data['district']
    print com_data['bs_date']

    dsdate = get_bd_session_key_record(data['sector'], interface_table_name, com_data['district'], com_data['bs_date'])

    for sector in enum_data:
        sub_app_name = sector + '.base_line'
        print 'sub_app_name :', sub_app_name
        for interface_table in enum_data[sector]:
            for db_table in enum_data[sector][interface_table]:
                for row in enum_data[sector][interface_table][db_table]:
                    for dl_interface_table in row['dl_tables']:
                        for dl_db_table in row['dl_tables'][dl_interface_table]:
                            info = {'sector': data['sector'], 'dltable': get_db_table_from_model(str(dl_db_table)),
                                    'district': com_data['district'], 'dsdate': dsdate,
                                    'oldasset': row['oldasset'], 'newasset': row['newasset'],
                                    'dl_asset_field': row['dl_tables'][dl_interface_table][dl_db_table]['dl_asset_field']}

                            sql = """UPDATE {sector}.{dltable} dla
                                SET {dl_asset_field} = '{newasset}'
                                WHERE dla.{dl_asset_field} = (SELECT di.{dl_asset_field}
                                    FROM {sector}.{dltable} di
                                         JOIN {sector}.dl_session_keys dls ON di.created_date =  dls.date
                                         JOIN {sector}.bd_session_keys bss ON dls.bs_date = bss.date
                                    WHERE di.district = {district} AND bss.date = '{dsdate}'
                                    AND di.{dl_asset_field} = '{oldasset}')
                                AND dla.district = {district}
                                AND dla.created_date = (SELECT dls.date
                                    FROM {sector}.{dltable} di
                                         JOIN {sector}.dl_session_keys dls ON di.created_date =  dls.date
                                         JOIN {sector}.bd_session_keys bss ON dls.bs_date = bss.date
                                    WHERE di.district = {district} AND bss.date = '{dsdate}'
                                    AND di.{dl_asset_field} = '{oldasset}')""".format(**info)

                            print dl_db_table
                            print sql
                            cursor = connection.cursor()
                            cursor.execute(sql)
                            # row = cursor.fetchone()
    return HttpResponse('success')


# dileepa
@csrf_exempt
def update_enumirate_bs_data(request):
    print 'update_enumirate_bs_data\n'
    data = (yaml.safe_load(request.body))
    enum_data = data['enum_data']
    com_data = data['com_data']

    interface_table_name = None
    for sector in enum_data:
        for interface_table in enum_data[sector]:
            interface_table_name = interface_table

    print data['sector']
    print interface_table_name
    print com_data['district']
    print com_data['bs_date']

    dsdate = get_bd_session_key_record(data['sector'], interface_table_name, com_data['district'], com_data['bs_date'])

    for sector in enum_data:
        sub_app_name = sector + '.base_line'
        print 'sub_app_name :', sub_app_name
        for interface_table in enum_data[sector]:
            for db_table in enum_data[sector][interface_table]:
                for row in enum_data[sector][interface_table][db_table]:
                    for dl_interface_table in row['dl_tables']:
                        for dl_db_table in row['dl_tables'][dl_interface_table]:
                            info = {'sector': data['sector'], 'dltable': get_db_table_from_model(str(dl_db_table)),
                                    'district': com_data['district'], 'dsdate': dsdate,
                                    'oldasset': row['oldasset'], 'newasset': row['newasset'],
                                    'dl_asset_field': row['dl_tables'][dl_interface_table][dl_db_table]['dl_asset_field']}

                            sql = """UPDATE {sector}.{bstable2}
                                SET {bs_asset_field} = '{newasset}'
                                WHERE {bstable2}.bs_date = (SELECT bd_session_keys.bs_date
                                    FROM {sector}.bd_session_keys
                                    WHERE (bd_session_keys.date = (SELECT distinct bd_session_keys.parent_bs_date
                                        FROM {sector}.bd_session_keys
                                        WHERE bd_session_keys.parent_bs_date = '{parentbsdate}'
                                            AND bd_session_keys.district = {district})
                                        AND bd_session_keys.district = {district}))
                                    AND {bstable2}.district = {district}
                                AND {bstable2}.{bs_asset_field} = '{oldasset}'""".format(**info)

                            sql = """UPDATE {sector}.{dltable} dla
                                SET {dl_asset_field} = '{newasset}'
                                WHERE dla.{dl_asset_field} = (SELECT di.{dl_asset_field}
                                    FROM {sector}.{dltable} di
                                         JOIN {sector}.dl_session_keys dls ON di.created_date = dls.date
                                         JOIN {sector}.bd_session_keys bss ON dls.bs_date = bss.date
                                    WHERE di.district = {district} AND bss.date = '{dsdate}'
                                    AND di.{dl_asset_field} = '{oldasset}')
                                AND dla.district = {district}
                                AND dla.created_date = (SELECT dls.date
                                    FROM {sector}.{dltable} di
                                         JOIN {sector}.dl_session_keys dls ON di.created_date =  dls.date
                                         JOIN {sector}.bd_session_keys bss ON dls.bs_date = bss.date
                                    WHERE di.district = {district} AND bss.date = '{dsdate}'
                                    AND di.{dl_asset_field} = '{oldasset}')""".format(**info)

                            print dl_db_table
                            print sql
                            cursor = connection.cursor()
                            cursor.execute(sql)
                            # row = cursor.fetchone()
    return HttpResponse('success')


# dileepa
@csrf_exempt
def update_other_government_enumirate_dl_data(request):
    print 'update_other_government_enumirate_dl_data\n'
    data = (yaml.safe_load(request.body))
    enum_data = data['enum_data']
    com_data = data['com_data']

    interface_table_name = None
    for sector in enum_data:
        for interface_table in enum_data[sector]:
            interface_table_name = interface_table

    print data['sector']
    print interface_table_name
    print com_data['district']
    print com_data['bs_date']

    dsdate = get_bd_session_key_record(data['sector'], interface_table_name, com_data['district'], com_data['bs_date'])

    for sector in enum_data:
        sub_app_name = sector + '.base_line'
        print 'sub_app_name :', sub_app_name
        for interface_table in enum_data[sector]:
            for db_table in enum_data[sector][interface_table]:
                for row in enum_data[sector][interface_table][db_table]:
                    for dl_interface_table in row['dl_tables']:
                        for dl_db_table in row['dl_tables'][dl_interface_table]:
                            info = {'sector': 'other_government', 'dltable': get_db_table_from_model(str(dl_db_table)),
                                    'district': com_data['district'], 'dsdate': dsdate,
                                    'oldasset': row['oldasset'], 'newasset': row['newasset'],
                                    'dl_asset_field': row['dl_tables'][dl_interface_table][dl_db_table]['dl_asset_field']}

                            print info

                            sql = """UPDATE {sector}.{dltable} dla
                                SET {dl_asset_field} = '{newasset}'
                                WHERE dla.{dl_asset_field} in (SELECT di.{dl_asset_field}
                                    FROM {sector}.{dltable} di
                                         JOIN {sector}.dl_session_keys dls ON di.created_date =  dls.date
                                         JOIN {sector}.bd_session_keys bss ON dls.bs_date = bss.date
                                    WHERE di.district = {district} AND bss.date = '{dsdate}'
                                    AND di.{dl_asset_field} = '{oldasset}')
                                AND dla.district = {district}
                                AND dla.created_date in (SELECT dls.date
                                    FROM {sector}.{dltable} di
                                         JOIN {sector}.dl_session_keys dls ON di.created_date =  dls.date
                                         JOIN {sector}.bd_session_keys bss ON dls.bs_date = bss.date
                                    WHERE di.district = {district} AND bss.date = '{dsdate}'
                                    AND di.{dl_asset_field} = '{oldasset}')""".format(**info)

                            print dl_db_table
                            print sql
                            cursor = connection.cursor()
                            cursor.execute(sql)
                            # row = cursor.fetchone()
    return HttpResponse('success')


# dileepa
def get_bd_session_key_record(sector, table_name, district, bs_date):
    print '*get_bd_session_key_record', sector, table_name, district, bs_date
    sub_app_name = sector + '.base_line'
    sub_app_session = apps.get_model(sub_app_name, 'BdSessionKeys')
    bd_session = sub_app_session.objects.get(district=district, bs_date=bs_date, table_name=table_name)
    print bd_session.date
    return bd_session.date


# dileepa
@csrf_exempt
def uupdate_enumirate_dl_data_with_firms(request):
    print 'uupdate_enumirate_dl_data_with_firms$\n'
    data = (yaml.safe_load(request.body))
    enum_data = data['enum_data']
    com_data = data['com_data']

    interface_table_name = None
    for sector in enum_data:
        for interface_table in enum_data[sector]:
            interface_table_name = interface_table

    print data['sector']
    print interface_table_name
    print com_data['district']
    print com_data['bs_date']
    print com_data['firm_id']

    dsdate = get_bd_session_key_record_with_firm(data['sector'], interface_table_name, com_data['district'], com_data['bs_date'], com_data['firm_id'])

    for sector in enum_data:
        sub_app_name = sector + '.base_line'
        print 'sub_app_name :', sub_app_name
        for interface_table in enum_data[sector]:
            for db_table in enum_data[sector][interface_table]:
                for row in enum_data[sector][interface_table][db_table]:
                    for dl_interface_table in row['dl_tables']:
                        for dl_db_table in row['dl_tables'][dl_interface_table]:
                            info = {'sector': data['sector'], 'dltable': get_db_table_from_model(str(dl_db_table)),
                                    'district': com_data['district'], 'firmid': com_data['firm_id'], 'dsdate': dsdate,
                                    'oldasset': row['oldasset'], 'newasset': row['newasset'],
                                    'dl_asset_field': row['dl_tables'][dl_interface_table][dl_db_table]['dl_asset_field']}

                            sql = """UPDATE {sector}.{dltable} dla
                                     SET {dl_asset_field} = '{newasset}'
                                     WHERE dla.{dl_asset_field} = (SELECT di.{dl_asset_field}
                                         FROM {sector}.{dltable} di
                                             JOIN {sector}.dl_session_keys dls ON di.created_date =  dls.date
                                             JOIN {sector}.bd_session_keys bss ON dls.bs_date = bss.date
                                         WHERE di.district = {district} AND bss.date = '{dsdate}' AND
                                         di.{dl_asset_field} = '{oldasset}' AND di.firm_id='{firmid}')
                                     AND dla.district = {district}
                                     AND dla.created_date = (SELECT dls.date
                                         FROM {sector}.{dltable} di
                                             JOIN {sector}.dl_session_keys dls ON di.created_date =  dls.date
                                             JOIN {sector}.bd_session_keys bss ON dls.bs_date = bss.date
                                         WHERE di.district = {district} AND bss.date = '{dsdate}' AND
                                         di.{dl_asset_field} = '{oldasset}'  AND di.firm_id='{firmid}')""".format(**info)

                            print dl_db_table
                            print sql
                            cursor = connection.cursor()
                            cursor.execute(sql)
                            # row = cursor.fetchone()
    return HttpResponse('success')


# dileepa
@csrf_exempt
def uupdate_enumirate_dl_data_with_organizations(request):
    print 'uupdate_enumirate_dl_data_with_organizations\n'
    data = (yaml.safe_load(request.body))
    enum_data = data['enum_data']
    com_data = data['com_data']

    interface_table_name = None
    for sector in enum_data:
        for interface_table in enum_data[sector]:
            interface_table_name = interface_table

    # print data['sector']
    # print interface_table_name
    # print com_data['district']
    # print com_data['bs_date']
    # print com_data['organization_id']

    print com_data

    dsdate = get_bd_session_key_record_with_organizations(data['sector'], interface_table_name, com_data['district'], com_data['bs_date'], com_data['organization_id'])

    for sector in enum_data:
        sub_app_name = sector + '.base_line'
        print 'sub_app_name :', sub_app_name
        for interface_table in enum_data[sector]:
            for db_table in enum_data[sector][interface_table]:
                for row in enum_data[sector][interface_table][db_table]:
                    for dl_interface_table in row['dl_tables']:
                        for dl_db_table in row['dl_tables'][dl_interface_table]:
                            info = {'sector': data['sector'], 'dltable': get_db_table_from_model(str(dl_db_table)),
                                    'district': com_data['district'], 'organizationid': com_data['organization_id'], 'dsdate': dsdate,
                                    'oldasset': row['oldasset'], 'newasset': row['newasset'],
                                    'dl_asset_field': row['dl_tables'][dl_interface_table][dl_db_table]['dl_asset_field']}

                            sql = """UPDATE {sector}.{dltable} dla
                                     SET {dl_asset_field} = '{newasset}'
                                     WHERE dla.{dl_asset_field} = (SELECT di.{dl_asset_field}
                                         FROM {sector}.{dltable} di
                                             JOIN {sector}.dl_session_keys dls ON di.created_date =  dls.date
                                             JOIN {sector}.bd_session_keys bss ON dls.bs_date = bss.date
                                         WHERE di.district = {district} AND bss.date = '{dsdate}' AND
                                         di.{dl_asset_field} = '{oldasset}' AND di.organization='{organizationid}')
                                     AND dla.district = {district}
                                     AND dla.created_date = (SELECT dls.date
                                         FROM {sector}.{dltable} di
                                             JOIN {sector}.dl_session_keys dls ON di.created_date =  dls.date
                                             JOIN {sector}.bd_session_keys bss ON dls.bs_date = bss.date
                                         WHERE di.district = {district} AND bss.date = '{dsdate}' AND
                                         di.{dl_asset_field} = '{oldasset}'  AND di.organization='{organizationid}')""".format(**info)

                            print dl_db_table
                            print sql
                            cursor = connection.cursor()
                            cursor.execute(sql)
                            # row = cursor.fetchone()
    return HttpResponse('success')


# dileepa
def get_bd_session_key_record_with_firm(sector, table_name, district, bs_date, firm_id):
    print '*get_bd_session_key_record_with_firm', sector, table_name, district, bs_date, firm_id
    sub_app_name = sector + '.base_line'
    sub_app_session = apps.get_model(sub_app_name, 'BdSessionKeys')
    bd_session = sub_app_session.objects.get(district=district, bs_date=bs_date, table_name=table_name, firm_id=firm_id)
    # bd_session = sub_app_session.objects.get(id=1)
    return bd_session.date


# dileepa
def get_bd_session_key_record_with_organizations(sector, table_name, district, bs_date, organization_id):
    print '*get_bd_session_key_record_with_organizations', sector, table_name, district, bs_date, organization_id
    sub_app_name = sector + '.base_line'
    sub_app_session = apps.get_model(sub_app_name, 'BdSessionKeys')
    bd_session = sub_app_session.objects.get(district=district, bs_date=bs_date, table_name=table_name, organization_id=organization_id)
    # bd_session = sub_app_session.objects.get(id=1)
    return bd_session.date


# dileepa
def get_db_table_from_model(model_name):
    # model_name = 'BsRbuRclassificattion'
    db_table_new = ''
    # print 'get_db_table_from_model ', model_name
    for i, s in enumerate(model_name):
        if str(s).isupper():
            if i != 0:
                db_table_new += str('_' + s.lower())
            else:
                db_table_new += str(s.lower())
        else:
            db_table_new += str(s)
    print db_table_new
    return db_table_new


# dileepa
@csrf_exempt
def bs_save_data_with_firm(request):
    print "bs_save_data_with_firm"
    bs_data = (yaml.safe_load(request.body))
    bs_table_hs_data = bs_data['table_data']
    com_data = bs_data['com_data']
    district = com_data['district']
    bs_date = com_data['bs_date']
    firm = int(com_data['firm_id'])
    todate = timezone.now()
    is_edit = bs_data['is_edit']

    current_user = None
    try:
        current_user = com_data['user_id']
        print 'Current User', current_user
    except Exception as e:
        print 'Current User Error'

    print 'in adding', is_edit
    print bs_table_hs_data
    print 'firm', firm

    if not is_edit:
        print 'in'
        for sector in bs_table_hs_data:

            sub_app_name = sector + '.base_line'

            print 'sub_app_name :', sub_app_name

            for interface_table in bs_table_hs_data[sector]:
                print 'interface table', ' -->', interface_table, '\n'

                sub_app_session = apps.get_model(sub_app_name, 'BdSessionKeys')

                print 'got model'
                record_exist = sub_app_session.objects.filter(bs_date=com_data['bs_date'],
                                                            table_name=interface_table,
                                                            district=district, firm_id=firm)

                print 'record_exist', record_exist

                if not record_exist:
                    print '--> in'
                    for db_table in bs_table_hs_data[sector][interface_table]:

                        print 'db table', ' -->', db_table, '\n'

                        for row in bs_table_hs_data[sector][interface_table][db_table]:

                            model_class = apps.get_model(sub_app_name, db_table)
                            model_object = model_class()

                            # assigning common properties to model object
                            model_object.created_date = todate
                            model_object.lmd = todate
                            model_object.district_id = district
                            model_object.bs_date = bs_date

                            if current_user != None:
                                model_object.created_user = current_user
                                model_object.lmu = current_user

                            print 'row', ' --> ', row, '\n', ' object '

                            for property in row:
                                setattr(model_object, property, row[property])

                                print 'property ', ' --> ', property, ' db_property ', row[property], ' index ', '\n'
                                model_object.save()

                                # get bs full date
                    split_date = bs_date.split('/')
                    bs_month = split_date[0]
                    bs_year = split_date[1]
                    bs_full_date = datetime.date(int(bs_year), int(bs_month), 1)

                    bd_session = sub_app_session(bs_date=com_data['bs_date'], table_name=interface_table,
                                               date=todate, district_id=district, data_type='base_line',
                                               full_bs_date=bs_full_date, firm_id=firm)
                    bd_session.save()
                else:
                    print '--> out'
                    return HttpResponse(False)

    else:
        bs_save_edit_data(bs_table_hs_data, com_data)

    return HttpResponse('success')


@csrf_exempt
def bs_save_data_with_organization(request):
    print "bs_save_data_with_organization"
    bs_data = (yaml.safe_load(request.body))
    bs_table_hs_data = bs_data['table_data']
    com_data = bs_data['com_data']
    district = com_data['district']
    bs_date = com_data['bs_date']
    organization = int(com_data['organization_id'])
    todate = timezone.now()
    is_edit = bs_data['is_edit']

    current_user = None
    try:
        current_user = com_data['user_id']
        print 'Current User', current_user
    except Exception as e:
        print 'Current User Error'

    print 'in adding', is_edit
    print bs_table_hs_data
    print 'firm', organization

    if not is_edit:
        print 'in'
        for sector in bs_table_hs_data:

            sub_app_name = sector + '.base_line'

            print 'sub_app_name :', sub_app_name

            for interface_table in bs_table_hs_data[sector]:
                print 'interface table', ' -->', interface_table, '\n'

                sub_app_session = apps.get_model(sub_app_name, 'BdSessionKeys')

                print 'got model'
                record_exist = sub_app_session.objects.filter(bs_date=com_data['bs_date'],
                                                            table_name=interface_table,
                                                            district=district, organization_id=organization)

                print 'record_exist', record_exist

                if not record_exist:
                    print '--> in'
                    for db_table in bs_table_hs_data[sector][interface_table]:

                        print 'db table', ' -->', db_table, '\n'

                        for row in bs_table_hs_data[sector][interface_table][db_table]:

                            model_class = apps.get_model(sub_app_name, db_table)
                            model_object = model_class()

                            # assigning common properties to model object
                            model_object.created_date = todate
                            model_object.lmd = todate
                            model_object.district_id = district
                            model_object.bs_date = bs_date

                            if current_user != None:
                                model_object.created_user = current_user
                                model_object.lmu = current_user

                            print 'row', ' --> ', row, '\n', ' object '

                            for property in row:
                                setattr(model_object, property, row[property])

                                print 'property ', ' --> ', property, ' db_property ', row[property], ' index ', '\n'
                                model_object.save()

                                # get bs full date
                    split_date = bs_date.split('/')
                    bs_month = split_date[0]
                    bs_year = split_date[1]
                    bs_full_date = datetime.date(int(bs_year), int(bs_month), 1)

                    bd_session = sub_app_session(bs_date=com_data['bs_date'], table_name=interface_table,
                                               date=todate, user=current_user, district_id=district, data_type='base_line',
                                               full_bs_date=bs_full_date, organization_id=organization)
                    bd_session.save()
                else:
                    print '--> out'
                    return HttpResponse(False)

    else:
        bs_save_edit_data(bs_table_hs_data, com_data)

    return HttpResponse('success')


@csrf_exempt
def bs_get_data(request):
    todate = timezone.now()
    data = (yaml.safe_load(request.body))
    com_data = data['com_data']
    district = com_data['district']
    incident_id = com_data['incident']
    sector = com_data['sector']
    incident = IncidentReport.objects.get(pk=incident_id)
    incident_date = incident.reported_date_time
    db_tables = data['db_tables']

    sub_app_name = sector + '.base_line'

    # get closest data based on district incident date and table number
    bs_session_model = apps.get_model(sub_app_name, 'BdSessionKeys')
    bs_session = bs_session_model.objects.values('bs_date').latest('date')
    bs_date = bs_session['bs_date']

    bs_mtable_data = {}

    for db_table in db_tables:
        model_class = apps.get_model(sub_app_name, db_table)
        bs_mtable_data[db_table] = serializers.serialize('json',
                                                         model_class.objects.filter(bs_date=bs_date).order_by('id'))

    return HttpResponse(
        json.dumps(bs_mtable_data),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def bs_get_data_mock(request):
    todate = timezone.now()
    data = (yaml.safe_load(request.body))
    com_data = data['com_data']
    district = com_data['district']
    incident_id = com_data['incident']
    sector = data['sector']
    incident = IncidentReport.objects.get(pk=incident_id)
    incident_date = incident.reported_date_time
    # incident_date = incident.incident_name
    table_name = data['table_name']
    db_tables = data['db_tables']
    bs_mtable_data = {}

    sub_app_name = sector + '.base_line'

    bs_session_model = apps.get_model(sub_app_name, 'BdSessionKeys')

    print 'incident_date', incident_date
    print 'bs_session_model', bs_session_model
    print '@'

    try:
        print "S------------"
        print "com_data[]", com_data

        thrid_filter_enable = False
        thrid_filter_key = None
        thrid_filter_value = None

        for com in com_data:
            if(com == 'firm_id'):
                print "------ firm_id"
                thrid_filter_key = com
                thrid_filter_value = com_data['firm_id']
                thrid_filter_enable = True
            elif(com == 'company_id'):
                print "------ company_id"
                thrid_filter_key = com
                thrid_filter_value = com_data['company_id']
                thrid_filter_enable = True
            elif(com == 'organization_id'):
                print "------ organizationtype_id"
                thrid_filter_key = com
                thrid_filter_value = com_data['organization_id']
                thrid_filter_enable = True
        print "------------E"

        bd_sessions = None

        if thrid_filter_enable:
            bd_sessions = bs_session_model.objects.extra(select={'difference': 'full_bs_date - %s'}, select_params=(incident_date,)). \
                filter(table_name=table_name, district=district, **{thrid_filter_key: thrid_filter_value}). \
                values('difference', 'id', 'bs_date', thrid_filter_key, 'date').order_by('difference').latest('difference')

            print '*'
            print bd_sessions
            print '**'

            bs_date = bd_sessions['bs_date']
            print 'bs_date', bs_date

            bs_created_date = bd_sessions['date']
            print '******* bs_created_date', bs_created_date

            for db_table in db_tables:
                model_class = apps.get_model(sub_app_name, db_table)
                # assuming there could be multiple data sets for bs_date
                bs_mtable_data[db_table] = serializers.serialize('json',
                                         model_class.objects.filter(bs_date=bs_date, district=district, **{thrid_filter_key: thrid_filter_value}).order_by('id'))

            return HttpResponse(json.dumps((bs_mtable_data)), content_type='application/javascript; charset=utf8')

        else:
            print "------+------"
            bd_sessions = bs_session_model.objects.extra(select={'difference': 'full_bs_date - %s'}, select_params=(incident_date,)). \
                filter(table_name=table_name, district=district). \
                values('difference', 'id', 'bs_date', 'date').order_by('difference').latest('difference')

            print '*'
            print bd_sessions
            print '**'
            bs_date = bd_sessions['bs_date']
            print '******* bs_date', bs_date

            bs_created_date = bd_sessions['date']
            print '******* bs_created_date', bs_created_date
            for db_table in db_tables:
                model_class = apps.get_model(sub_app_name, db_table)
                # assuming there could be multiple data sets for bs_date
                bs_mtable_data[db_table] = serializers.serialize('json',
                                                                 model_class.objects.filter(bs_date=bs_date, district=district).order_by('id'))

            print 'bs_mtable_data ', bs_mtable_data
            return HttpResponse(
                json.dumps((bs_mtable_data)),

                content_type='application/javascript; charset=utf8'
            )
    except Exception as ex:
        for db_table in db_tables:
            model_class = apps.get_model(sub_app_name, db_table)
            # assuming there could be multiple data sets for bs_date
            bs_mtable_data[db_table] = None

        return HttpResponse(
            json.dumps((bs_mtable_data)),

            content_type='application/javascript; charset=utf8'
        )


# dileepa
@csrf_exempt
def bs_get_data_mock_for_bs(request):
    todate = timezone.now()
    data = (yaml.safe_load(request.body))
    com_data = data['com_data']
    district = com_data['district']
    bs_date = com_data['bs_date']
    sector = data['sector']
    table_name = data['table_name']
    db_tables = data['db_tables']
    bs_mtable_data = {}

    sub_app_name = sector + '.base_line'

    bs_session_model = apps.get_model(sub_app_name, 'BdSessionKeys')

    print 'bs_session_model', bs_session_model
    print '@'

    try:
        bd_sessions = bs_session_model.objects.extra(where=["bs_date LIKE %s "], params=[bs_date]).filter(table_name=table_name, district=district). \
            values('id', 'bs_date').order_by('id').latest('id')

        print bd_sessions
        bs_date = bd_sessions['bs_date']
        print 'bs_date', bs_date
        for db_table in db_tables:
            print db_table
            model_class = apps.get_model(sub_app_name, db_table)
            # assuming there could be multiple data sets for bs_date
            bs_mtable_data[db_table] = serializers.serialize('json',
                                                             model_class.objects.filter(bs_date=bs_date,
                                                                                        district=district).order_by('id'))
        print 'bs_mtable_data ', bs_mtable_data
        return HttpResponse(
            json.dumps((bs_mtable_data)),
            content_type='application/javascript; charset=utf8'
        )
    except Exception as ex:
        print 'error ', ex.message
        for db_table in db_tables:
            model_class = apps.get_model(sub_app_name, db_table)
            # assuming there could be multiple data sets for bs_date
            bs_mtable_data[db_table] = None

        return HttpResponse(
            json.dumps((bs_mtable_data)),

            content_type='application/javascript; charset=utf8'
        )


# dileepa
@csrf_exempt
def get_latest_bs_date(request):
    print '\nget_latest_bs_date'
    print '----------------------'
    todate = timezone.now()
    data = (yaml.safe_load(request.body))
    com_data = data['com_data']
    district = com_data['district']
    incident_id = com_data['incident']
    sector = data['sector']
    incident = IncidentReport.objects.get(pk=incident_id)
    incident_date = incident.reported_date_time
    table_name = data['table_name']
    bs_mtable_data = {}

    sub_app_name = sector + '.base_line'

    bs_session_model = apps.get_model(sub_app_name, 'BdSessionKeys')

    print 'incident_date', incident_date
    print bs_session_model
    print '@'

    try:
        bd_sessions = bs_session_model.objects.extra(select={'difference': 'full_bs_date - %s'},
                                                     select_params=(incident_date,)). \
            filter(table_name=table_name, district=district). \
            values('difference', 'id', 'bs_date', 'date').order_by('difference').latest('difference')

        print bd_sessions

        bs_date = bd_sessions['bs_date']
        print 'bs_date', bs_date

        bs_created_date = str(bd_sessions['date'])
        print '******* bs_created_date', bs_created_date

        # data = {
        #     'bs_date': bs_date,
        #     'bs_created_date': bs_created_date,
        # }

        return HttpResponse(
            json.dumps(({
                'bs_date': bs_date,
                'bs_created_date': bs_created_date,
            })),
            content_type='application/json; charset=utf8'
        )
    except Exception as ex:
        print '** Error', ex
        bs_date = None

        return HttpResponse(
            json.dumps((bs_date)),
            content_type='application/json; charset=utf8'
        )


# dileepa
@csrf_exempt
def getlatest_bs_date_with_organization(request):
    print 'get_latest_bs_date_with_organization'
    print '*----------------------'
    todate = timezone.now()
    data = (yaml.safe_load(request.body))
    com_data = data['com_data']
    district = com_data['district']
    incident_id = com_data['incident']
    organization_id = com_data['organization_id']
    sector = data['sector']
    incident = IncidentReport.objects.get(pk=incident_id)
    incident_date = incident.reported_date_time
    table_name = data['table_name']
    bs_mtable_data = {}

    sub_app_name = sector + '.base_line'

    bs_session_model = apps.get_model(sub_app_name, 'BdSessionKeys')

    print 'incident_date', incident_date
    print bs_session_model
    print '@'

    try:
        bd_sessions = bs_session_model.objects.extra(select={'difference': 'full_bs_date - %s'},
                                                     select_params=(incident_date,)). \
            filter(table_name=table_name, district=district, organization=organization_id). \
            values('difference', 'id', 'bs_date', 'date').order_by('difference').latest('difference')

        print bd_sessions

        bs_date = bd_sessions['bs_date']
        print 'bs_date', bs_date

        bs_created_date = str(bd_sessions['date'])
        print '******* bs_created_date', bs_created_date

        # data = {
        #     'bs_date': bs_date,
        #     'bs_created_date': bs_created_date,
        # }
        print '&&&&& ', bs_created_date
        return HttpResponse(
            json.dumps(({
                'bs_date': bs_date,
                'bs_created_date': bs_created_date,
            })),
            content_type='application/json; charset=utf8'
        )
    except Exception as ex:
        print '** Error', ex
        bs_date = None

        return HttpResponse(
            json.dumps((bs_date)),
            content_type='application/json; charset=utf8'
        )


# dileepa
@csrf_exempt
def is_enum_used_in_dl(request):
    data = (yaml.safe_load(request.body))
    com_data = data['com_data']
    district = com_data['district']
    bs_date = com_data['bs_date']

    sector = data['sector']

    bs_data = data['bs_data']
    bs_table = bs_data['bs_table']
    bs_coloum_key = bs_data['bs_coloum_key']
    bs_coloum_value = bs_data['bs_coloum_value']

    dl_data = data['dl_data']
    # dl_table = dl_data['dl_table']
    # dl_coloum_key = dl_data['dl_coloum_key']

    # print sector, bs_table, dl_tables, dbcoloum_key, coloum_value, district
    print '@'
    for dl_table in dl_data:
        table = dl_table['dl_table']
        coloum = dl_table['dl_coloum_key']

        print table, coloum, bs_coloum_value

        dl_session_model = apps.get_model(sector + '.damage_losses', table)
        dl_sessions = dl_session_model.objects.all().filter(**{coloum: bs_coloum_value}).filter(district=district)

        print dl_sessions

        for item in dl_sessions:
            print 'id'
            print getattr(item, 'id')

        if len(dl_sessions) > 0:
            print True
            return HttpResponse(True)
        else:
            print False
            return HttpResponse(False)


@csrf_exempt
def edit_firm(request):
    firm_data = (yaml.safe_load(request.body))
    firm_id = firm_data['firm_id']
    firm_name = firm_data['firm_name']
    ownership = firm_data['ownership']

    print 'firm_id', firm_id, ' - firm_name', firm_name

    Firm.objects.filter(pk=firm_id).update(name=firm_name, ownership=ownership)

    return HttpResponse("Success")


@csrf_exempt
def edit_organization(request):
    firm_data = (yaml.safe_load(request.body))
    print '******'
    print firm_data
    firm_id = firm_data['firm_id']
    firm_name = firm_data['firm_name']
    ownership = firm_data['ownership']

    print 'firm_id', firm_id, ' - firm_name', firm_name, 'ownership - ', ownership

    Organization.objects.filter(pk=firm_id).update(name=firm_name, ownership=ownership)

    return HttpResponse("Success")


@csrf_exempt
def bs_fetch_edit_data(request):
    print '--------bs_fetch_edit_data'
    data = (yaml.safe_load(request.body))
    table_name = data['table_name']
    sector = data['sector']
    com_data = data['com_data']
    bs_date = com_data['bs_date']
    district = com_data['district']
    tables = settings.TABLE_PROPERTY_MAPPER[sector][table_name]

    bs_mtable_data = {sector: {}}
    bs_mtable_data[sector][table_name] = {}

    sub_app_name = sector + '.base_line'

    print bs_date, district
    print bs_date, district

    for table in tables:
        table_fields = tables[table]
        print 'table_fields', table_fields

        model_class = apps.get_model(sub_app_name, table)
        bs_mtable_data[sector][table_name][table] = list(model_class.objects.
                                                         filter(bs_date=bs_date, district=district).
                                                         values(*table_fields).order_by('id'))

    print 'print bs_mtable_data', bs_mtable_data
    return HttpResponse(
        # json.dumps(bs_mtable_data),
        # content_type='application/javascript; charset=utf8'
        json.dumps(bs_mtable_data, cls=DjangoJSONEncoder),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def bs_save_edit_data(table_data, com_data):
    district = com_data['district']
    bs_date = com_data['bs_date']
    todate = timezone.now()

    print 'table_data'
    print table_data

    try:
        current_user = com_data['user_id']
        print 'Edit Current User', current_user
    except Exception as e:
        print 'Current User Error'

    for sector in table_data:
        sub_app_name = sector + '.base_line'
        for interface_table in table_data[sector]:
            print 'interface table', ' -->', interface_table, '\n'
            for db_table in table_data[sector][interface_table]:
                print 'db table', ' -->', db_table, '\n'
                for row in table_data[sector][interface_table][db_table]:
                    if not has_the_id(row):
                        model_class = apps.get_model(sub_app_name, db_table)
                        model_object = model_class()

                        for property in row:
                            # assigning common properties to model object
                            setattr(model_object, property, row[property])

                            print 'property ', ' --> ', property, ' db_property ', row[property], ' index ', '\n'
                        if current_user != None:
                            model_object.created_user = current_user
                            model_object.lmu = current_user

                        model_object.created_date = todate
                        model_object.lmd = todate
                        model_object.district_id = district
                        model_object.bs_date = bs_date
                        model_object.save()
                        print "saved-----", model_object.id

                    else:
                        model_class = apps.get_model(sub_app_name, db_table)
                        model_object = model_class()
                        model_object = model_class.objects.filter(bs_date=bs_date, district=district, id=row['id'])
                        # if current_user != None:
                        # model_object["lmu"] = current_user
                        # print model_object["lmu"]
                            # model_object[0].lmu = current_user
                            # model_object[0].lmd = todate
                            # for property in row:
                            #     print '$', property
                        model_object.update(**row)

                        print 'row', ' --> ', row, ' id ', model_object[0].id


@csrf_exempt
def dl_save_data(request):
    print '-----------dl_save_data-----------*'
    dl_data = (yaml.safe_load(request.body))
    dl_table_data = dl_data['table_data']
    com_data = dl_data['com_data']
    todate = timezone.now()
    is_edit = dl_data['is_edit']
    admin_area = None
    filter_fields = {}
    current_user = None
    # print 'com_data', com_data
    print 'dl_data', dl_data
    try:
        print 'bs_date*', dl_data['bs_date']
    except:
        pass
    try:
        current_user = com_data['user_id']
        print 'Current User', current_user
    except:
        print 'Current User Error'

    if not is_edit:
        print "not edit"

        for sector in dl_table_data:

            sub_app_name = sector + '.damage_losses'
            print "app name ", sub_app_name

            for interface_table in dl_table_data[sector]:

                com_data['table_name'] = interface_table

                filter_fields = com_data
                print "be fore getting model"
                sub_app_session = apps.get_model(sub_app_name, 'DlSessionKeys')
                filter_fields.pop('user_id', None)
                print 'filter_fields', filter_fields
                record_exist = sub_app_session.objects.filter(**filter_fields)
                print "record_exist", record_exist

                if not record_exist:
                    print "record does not exist"

                    print 'interface table', ' -->', interface_table, '\n'
                    for db_table in dl_table_data[sector][interface_table]:

                        print 'db table', ' -->', db_table, '\n'

                        for row in dl_table_data[sector][interface_table][db_table]:

                            model_class = apps.get_model(sub_app_name, db_table)
                            model_object = model_class()

                            if current_user != None:
                                model_object.created_user = current_user
                                model_object.lmu = current_user
                            model_object.created_date = todate
                            model_object.lmd = todate

                            for com_property in com_data:
                                print com_data[com_property]
                                setattr(model_object, com_property, com_data[com_property])

                            print 'row', ' --> ', row, '\n', ' object '

                            for property in row:
                                setattr(model_object, property, row[property])

                                print 'property ', ' --> ', property, ' db_property ', row[property], ' index ', '\n'
                                model_object.save()
                    if 'district_id' in com_data:
                        district = District.objects.get(pk=com_data['district_id'])
                        filter_fields['province_id'] = district.province.id
                        filter_fields['user'] = current_user
                        try:
                            # filter_fields['bs_date'] = dl_data['bs_date']
                            filter_fields['bs_date'] = dl_data['bs_date']
                            print '*** ', dl_data['bs_date']
                            print '*** ', filter_fields['bs_date']
                        except Exception as e:
                            pass
                        dl_session = sub_app_session(**filter_fields)
                        print '=== filter_fields', filter_fields
                        dl_session.date = todate
                        dl_session.user = current_user
                        dl_session.data_type = 'damage_losses'
                        dl_session.save()
                    else:
                        dl_session = sub_app_session(**filter_fields)
                        dl_session.date = todate
                        dl_session.user = current_user
                        dl_session.save()

                    return HttpResponse(True)

                else:
                    return HttpResponse(False)

    else:
        dl_save_edit_data(dl_table_data, com_data, current_user)

    return HttpResponse('success')


# dileepa
@csrf_exempt
def dl_save_data_with_array(request):
    print '\n\ndl_save_data_with_array'
    dl_data = (yaml.safe_load(request.body))
    dl_table_data = dl_data['table_data']
    com_data = dl_data['com_data']
    todate = timezone.now()
    is_edit = dl_data['is_edit']
    admin_area = None

    filter_fields = {}

    current_user = None
    try:
        current_user = dl_data['user_id']
        print 'Current User', current_user
    except Exception as e:
        print 'Current User Error'

    if not is_edit:
        print "Mode - save"

        for sector in dl_table_data:
            print 'sector', sector
            sub_app_name = sector + '.damage_losses'
            print "app name ", sub_app_name

            for interface_table in dl_table_data[sector]:
                print 'interface_table', interface_table

                com_data['table_name'] = interface_table

                filter_fields = com_data
                print 'filter_fields', filter_fields
                print "be fore getting model"
                sub_app_session = apps.get_model(sub_app_name, 'DlSessionKeys')
                print "before filtering", com_data
                record_exist = sub_app_session.objects.filter(**filter_fields)

                if not record_exist:
                    print "record does not exist"

                    print 'interface table', ' ->', interface_table, '\n'
                    for db_table in dl_table_data[sector][interface_table]:
                        print '\tdb table', ' ->', db_table, '\n'

                        for row in dl_table_data[sector][interface_table][db_table]:
                            print '\t\trow', ' ->', row

                            model_class = apps.get_model(sub_app_name, db_table)
                            model_object = model_class()

                            if current_user != None:
                                model_object.created_user = current_user
                                model_object.lmu = current_user
                            model_object.created_date = todate
                            model_object.lmd = todate

                            for com_property in com_data:
                                print '\t\t\tcom_data[com_property]', com_data[com_property]
                                setattr(model_object, com_property, com_data[com_property])
                            print '------'

                            for property in row:
                                print '\t\t\tproperty', property
                                if isinstance(property, dict):
                                    model_object_item = model_class()

                                    model_object_item.created_date = todate
                                    model_object_item.lmd = todate

                                    for com_property in com_data:
                                        print com_data[com_property]
                                        setattr(model_object_item, com_property, com_data[com_property])

                                    for item in property:
                                        print 'model_object_item ', model_object_item
                                        print 'item ', item
                                        print 'property[item] ', property[item]
                                        if item == 'private_clinic':
                                            setattr(model_object_item, item, PrivateClinic.objects.only('id').get(id=property[item]))
                                            model_object_item.save()
                                        elif item == 'pre_school':
                                            setattr(model_object_item, item, PreSchools.objects.only('id').get(id=property[item]))
                                            model_object_item.save()
                                        elif item == 'primary_school':
                                            setattr(model_object_item, item, PrimarySchools.objects.only('id').get(id=property[item]))
                                            model_object_item.save()
                                        elif item == 'secondary_school':
                                            setattr(model_object_item, item, SecondarySchools.objects.only('id').get(id=property[item]))
                                            model_object_item.save()
                                        elif item == 'university':
                                            setattr(model_object_item, item, Universities.objects.only('id').get(id=property[item]))
                                            model_object_item.save()
                                        elif item == 'tech_institute':
                                            setattr(model_object_item, item, TechInstitutes.objects.only('id').get(id=property[item]))
                                            model_object_item.save()
                                        else:
                                            setattr(model_object_item, item, property[item])
                                            model_object_item.save()
                                            print 'property', property[item]
                                else:
                                    print '@@@@@', property, row[property]
                                    setattr(model_object, property, row[property])

                                    print 'property ', ' --> ', property, ' db_property ', row[property], ' index ', '\n'
                                    model_object.save()
                    if 'district_id' in com_data:
                        district = District.objects.get(pk=com_data['district_id'])
                        filter_fields['province_id'] = district.province.id
                        filter_fields['user'] = current_user
                        dl_session = sub_app_session(**filter_fields)
                        dl_session.date = todate
                        dl_session.data_type = 'damage_losses'
                        dl_session.save()
                    else:
                        filter_fields['user'] = current_user
                        dl_session = sub_app_session(**filter_fields)
                        dl_session.date = todate
                        dl_session.save()

                    return HttpResponse(True)

                else:
                    print "record_exist"
                    return HttpResponse(False)

    else:
        print "Mode - edit"
        dl_save_edit_data_with_array(dl_table_data, com_data)

    return HttpResponse('success')


@csrf_exempt
def dl_get_data(request):
    data = (yaml.safe_load(request.body))
    table_name = data['table_name']
    com_data = data['com_data']
    incident_id = com_data['incident']
    sector = data['sector']
    db_tables = data['db_tables']

    dl_mtable_data = {}
    filter_fields = {}

    sub_app_name = sector + '.damage_losses'

    if 'province' in com_data:
        admin_area = com_data['province']
        filter_fields = {'incident': incident_id, 'province': admin_area}
    elif 'district' in com_data:
        admin_area = com_data['district']
        filter_fields = {'incident': incident_id, 'district': admin_area}
    else:
        filter_fields = {'incident': incident_id}

    for db_table in db_tables:
        model_class = apps.get_model(sub_app_name, db_table)
        # dl_mtable_data[db_table] = serializers.serialize('json', model_class.objects.filter(incident=incident_id, district=district).order_by('id'))
        dl_mtable_data[db_table] = serializers.serialize('json',
                                                         model_class.objects.filter(**filter_fields).order_by('id'))

    return HttpResponse(
        json.dumps(dl_mtable_data),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def dl_fetch_edit_data(request):
    data = (yaml.safe_load(request.body))
    table_name = data['table_name']
    sector = data['sector']
    com_data = data['com_data']
    incident = com_data['incident']
    tables = settings.TABLE_PROPERTY_MAPPER[sector][table_name]

    sub_app_name = sector + '.damage_losses'
    filter_fields = com_data

    dl_mtable_data = {sector: {}}
    dl_mtable_data[sector][table_name] = {}

    for table in tables:
        table_fields = tables[table]
        model_class = apps.get_model(sub_app_name, table)
        dl_mtable_data[sector][table_name][table] = list(model_class.objects.
                                                         filter(**filter_fields).
                                                         values(*table_fields).order_by('id'))

        print '----------**|'
        print dl_mtable_data

    return HttpResponse(
        json.dumps(dl_mtable_data, cls=DjangoJSONEncoder),
        content_type='application/javascript; charset=utf8'
    )


# dileepa
@csrf_exempt
def dl_fetch_edit_data_with_array(request):
    data = (yaml.safe_load(request.body))
    table_name = data['table_name']
    sector = data['sector']
    keys = data['keys']
    com_data = data['com_data']
    incident = com_data['incident']
    tables = settings.TABLE_PROPERTY_MAPPER[sector][table_name]

    sub_app_name = sector + '.damage_losses'
    filter_fields = com_data

    dl_mtable_data = {sector: {}}
    dl_mtable_data[sector][table_name] = {}

    for table in tables:
        table_fields = tables[table]
        model_class = apps.get_model(sub_app_name, table)
        dl_mtable_data[sector][table_name][table] = list(model_class.objects.
                                                         filter(**filter_fields).
                                                         values(*table_fields).order_by('id'))

    sub_app_name = sector + '.base_line'

    dl_new_data = {sector: {}}
    dl_new_data[sector][table_name] = {}

    for tbl in dl_mtable_data[sector][table_name]:
        for key in keys:
            if tbl == key:
                # school_model = apps.get_model(sub_app_name, tbl)
                # bd_sessions = school_model.tbl.objects.order_by('id').values('city').distinct()
                data_set_ids = []

                print tbl, ' = ', key, ' -> ', keys[key]

                for i in dl_mtable_data[sector][table_name][tbl]:
                    # print '% ', i[keys[key]]

                    if i[keys[key]] not in data_set_ids:
                        data_set_ids.append(i[keys[key]])
                print '@', data_set_ids

                array_table_out = []
                for data_set_id in data_set_ids:
                    array_table_in = []
                    for i in dl_mtable_data[sector][table_name][tbl]:
                        print '# ', i, i[keys[key]]

                        if i[keys[key]] == data_set_id:
                            array_table_in.append(i)
                    array_table_out.append(array_table_in)
                print array_table_out
                dl_new_data[sector][table_name][tbl] = array_table_out
                break
            else:
                print dl_mtable_data[sector][table_name][tbl]
                dl_new_data[sector][table_name][tbl] = dl_mtable_data[sector][table_name][tbl]
    return HttpResponse(
        json.dumps(dl_new_data, cls=DjangoJSONEncoder),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def dl_save_edit_data(table_data, com_data, current_user):
    todate = timezone.now()
    for sector in table_data:
        sub_app_name = sector + '.damage_losses'

        for interface_table in table_data[sector]:
            print 'interface table', ' -->', interface_table, '\n'
            for db_table in table_data[sector][interface_table]:
                print 'db table', ' -->', db_table, '\n'

                for row in table_data[sector][interface_table][db_table]:
                    print 'row', row
                    print 'db_table', db_table,

                    model_class = apps.get_model(sub_app_name, db_table)

                    if not has_the_id(row):
                        print '*** has_the_id ', has_the_id(row)
                        model_object = model_class()
                        # assigning common properties to model object
                        # model_object.created_date = todate
                        model_object.lmd = todate
                        if current_user != None:
                            # model_object.created_user = current_user
                            model_object.lmu = current_user

                        for com_property in com_data:
                            print com_data[com_property]
                            setattr(model_object, com_property, com_data[com_property])

                        for property in row:
                            setattr(model_object, property, row[property])

                            print 'property ', ' --> ', property, ' db_property ', row[property], ' index ', '\n'
                        model_object.save()
                        print "saved--dl---", model_object.id
                        print "no id found in dl"

                    else:
                        print '*** has_the_id ', has_the_id(row)
                        model_object = model_class.objects.filter(id=row['id'])
                        model_object.lmd = todate

                        if current_user != None:
                            model_object.lmu = current_user

                        model_object.update(**row)
                        if 'ownership' in row:
                            print 'ownership row', ' --> ', row, ' id ', model_object[0].id, '\n'
                            model_class.objects.filter(id=model_object[0].id).update(lmu=current_user, lmd=todate, ownership=com_data['ownership'])
                        else:
                            print 'row', ' --> ', row, ' id ', model_object[0].id, '\n'
                            model_class.objects.filter(id=model_object[0].id).update(lmu=current_user, lmd=todate)


# dileepa
@csrf_exempt
def dl_save_edit_data_with_array(table_data, com_data):
    todate = timezone.now()
    print "Edit -------------"
    for sector in table_data:
        sub_app_name = sector + '.damage_losses'
        for interface_table in table_data[sector]:
            print 'interface table', ' -->', interface_table, '\n'
            for db_table in table_data[sector][interface_table]:
                print 'db table', ' -->', db_table, '\n'
                for row in table_data[sector][interface_table][db_table]:
                    model_class = apps.get_model(sub_app_name, db_table)
                    if isinstance(row, list):
                        for row_in in row:
                            if not has_the_id(row_in):
                                model_object = model_class()
                                # assigning common properties to model object
                                model_object.created_date = todate
                                model_object.lmd = todate

                                for com_property in com_data:
                                    print com_data[com_property]
                                    setattr(model_object, com_property, com_data[com_property])

                                for item in row_in:
                                    print 'model_object_item ', model_object
                                    print 'item ', item
                                    print 'property[item] ', row_in[item]
                                    if item == 'private_clinic':
                                        setattr(model_object, item,
                                                PrivateClinic.objects.only('id').get(id=row_in[item]))
                                        model_object.save()
                                    elif item == 'pre_school':
                                        setattr(model_object, item,
                                                PreSchools.objects.only('id').get(id=row_in[item]))
                                        model_object.save()
                                    elif item == 'primary_school':
                                        setattr(model_object, item,
                                                PrimarySchools.objects.only('id').get(id=row_in[item]))
                                        model_object.save()
                                    elif item == 'secondary_school':
                                        setattr(model_object, item,
                                                SecondarySchools.objects.only('id').get(id=row_in[item]))
                                        model_object.save()
                                    elif item == 'university':
                                        setattr(model_object, item,
                                                Universities.objects.only('id').get(id=row_in[item]))
                                        model_object.save()
                                    elif item == 'tech_institute':
                                        setattr(model_object, item,
                                                TechInstitutes.objects.only('id').get(id=row_in[item]))
                                        model_object.save()
                                    else:
                                        setattr(model_object, item, row_in[item])
                                        model_object.save()
                                        print 'property', row_in[item]

                                model_object.save()
                                print "saved--dl---", model_object.id
                                print "no id found in dl"

                            else:
                                print '@@@', row
                                model_object = model_class.objects.filter(id=row_in['id'])
                                model_object.update(**row_in)

                                print 'row', ' --> ', row, ' id ', model_object[0].id, '\n'
                    else:
                        if not has_the_id(row):
                            model_object = model_class()
                            # assigning common properties to model object
                            model_object.created_date = todate
                            model_object.lmd = todate

                            for com_property in com_data:
                                print com_data[com_property]
                                setattr(model_object, com_property, com_data[com_property])

                            for property in row:
                                setattr(model_object, property, row[property])

                                print 'property ', ' --> ', property, ' db_property ', row[property], ' index ', '\n'
                            model_object.save()
                            print "saved--dl---", model_object.id
                            print "no id found in dl"

                        else:
                            print '$$$', row
                            model_object = model_class.objects.filter(id=row['id'])
                            model_object.update(**row)

                            print 'row', ' --> ', row, ' id ', model_object[0].id, '\n'


# dileepa
@csrf_exempt
def dl_delete_data(table_data, com_data):
    todate = timezone.now()
    for sector in table_data:
        sub_app_name = sector + '.damage_losses'

        for interface_table in table_data[sector]:
            print 'interface table', ' -->', interface_table, '\n'
            for db_table in table_data[sector][interface_table]:
                print 'db table', ' -->', db_table, '\n'

                for row in table_data[sector][interface_table][db_table]:
                    print 'row', row
                    model_class = apps.get_model(sub_app_name, db_table)

                    if has_the_id(row):
                        model_object = model_class.objects.filter(id=row['id'])
                        # model_object.update(**row)
                        model_object.filter(**row).delete()
                        print 'row', ' --> ', row, ' id ', model_object[0].id, '\n'


@csrf_exempt
def has_the_id(row):
    keys = row.keys()

    for item in keys:
        if item == 'id':
            return True

    return False


# edit data baseline mining
@csrf_exempt
def bs_mining_fetch_edit_data(request):
    data = (yaml.safe_load(request.body))
    table_name = data['table_name']
    sector = data['sector']
    com_data = data['com_data']
    bs_date = com_data['bs_date']
    district = com_data['district']
    firm = com_data['firm']

    current_user = None
    try:
        current_user = com_data['user_id']
        print 'Current User', current_user
    except Exception as e:
        print 'Current User Error'

    tables = settings.TABLE_PROPERTY_MAPPER[sector][table_name]

    bs_mtable_data = {sector: {}}
    bs_mtable_data[sector][table_name] = {}

    for table in tables:
        table_fields = tables[table]

        sub_app_name = sector + '.base_line'
        model_class = apps.get_model(sub_app_name, table)
        bs_mtable_data[sector][table_name][table] = list(model_class.objects.
                                                         filter(bs_date=bs_date, district=district, firm_id=firm).
                                                         values(*table_fields).order_by('id'))

    return HttpResponse(
        json.dumps(bs_mtable_data),
        content_type='application/javascript; charset=utf8'
    )


# edit data baseline mining
@csrf_exempt
def bs_livestock_fetch_edit_data(request):
    data = (yaml.safe_load(request.body))
    table_name = data['table_name']
    sector = data['sector']
    com_data = data['com_data']
    bs_date = com_data['bs_date']
    district = com_data['district']
    organization = com_data['organization_id']

    current_user = None
    try:
        current_user = com_data['user_id']
        print 'Current User', current_user
    except Exception as e:
        print 'Current User Error'

    tables = settings.TABLE_PROPERTY_MAPPER[sector][table_name]

    bs_mtable_data = {sector: {}}
    bs_mtable_data[sector][table_name] = {}

    for table in tables:
        table_fields = tables[table]

        sub_app_name = sector + '.base_line'
        model_class = apps.get_model(sub_app_name, table)
        bs_mtable_data[sector][table_name][table] = list(model_class.objects.
                                                         filter(bs_date=bs_date, district=district, organization_id=organization).
                                                         values(*table_fields).order_by('id'))

    return HttpResponse(
        json.dumps(bs_mtable_data),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def dl_fetch_district_disagtn(request):
    print '*** dl_fetch_district_disagtn()'
    data = (yaml.safe_load(request.body))
    table_name = data['table_name']
    sector = data['sector']
    com_data = data['com_data']
    incident = com_data['incident']
    tables = settings.TABLE_PROPERTY_MAPPER[sector][table_name]

    dl_mtable_data = {sector: {}}
    dl_mtable_data[sector][table_name] = {}

    filter_fields = {}
    sub_app_name = sector + '.damage_losses'

    print 'com_data', com_data

    if 'province' in com_data:
        print 'if province'
        admin_area = com_data['province']
        filter_fields = {'incident': incident, 'district__province': admin_area}
    else:
        print 'else province'
        filter_fields = {'incident': incident}

    dl_session_model = apps.get_model(sub_app_name, 'DlSessionKeys')
    # should be checking against table name as well
    dl_sessions = dl_session_model.objects.filter(**filter_fields)

    for dl_session in dl_sessions:

        category_name = None

        if 'province' in com_data:
            district_id = dl_session.district.id
            filter_fields = {'incident': incident, 'district': district_id}
            category_name = dl_session.district.name
        else:
            province_id = None
            if dl_session.province:
                province_id = dl_session.province.id
                category_name = dl_session.province.name
            filter_fields = {'incident': incident, 'province': province_id}
            print '% - ', filter_fields

        # print dl_session.district.province
        print category_name, '***'

        if category_name is not None:

            dl_mtable_data[sector][table_name][category_name] = {}

            for table in tables:
                print table
                table_fields = tables[table]

                dl_mtable_data[sector][table_name][category_name][table] = {}

                table_fields = tables[table]
                model_class = apps.get_model(sub_app_name, table)

                table_fields = tables[table]
                print sector, table_name, category_name, table
                print filter_fields

                dl_mtable_data[sector][table_name][category_name][table] = list(model_class.objects.
                                                                                filter(**filter_fields)
                                                                                .values(*table_fields))

    dl_mtable_data[sector][table_name] = collections.OrderedDict(sorted(dl_mtable_data[sector][table_name].items()))

    return HttpResponse(
        json.dumps((dl_mtable_data), cls=DjangoJSONEncoder),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def dl_fetch_total_data(request):
    print '-------- dl_fetch_total_data'
    data = (yaml.safe_load(request.body))
    table_name = data['table_name']
    sector = data['sector']
    com_data = data['com_data']
    incident = com_data['incident']
    tables = settings.TABLE_PROPERTY_MAPPER[sector][table_name]

    filter_fields = {}
    sub_app_name = sector + '.damage_losses'

    print tables

    if 'province' in com_data:
        admin_area = com_data['province']
        filter_fields = {'incident': incident, 'province': admin_area}
    elif 'district' in com_data:
        admin_area = com_data['district']
        filter_fields = {'incident': incident, 'district': admin_area}
    else:
        filter_fields = {'incident': incident}

    dl_mtable_data = {sector: {}}
    dl_mtable_data[sector][table_name] = {}

    for table in tables:
        print table
        table_fields = tables[table]
        model_class = apps.get_model(sub_app_name, table)
        dl_mtable_data[sector][table_name][table] = list(model_class.objects.
                                                         filter(**filter_fields).
                                                         values(*table_fields))
        print model_class, filter_fields, table_fields

    return HttpResponse(
        json.dumps(dl_mtable_data, cls=DjangoJSONEncoder),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def fetch_entities(request):
    data = (yaml.safe_load(request.body))
    district_id = data['district']
    model_name = data['model']
    sector = data['sector']

    sub_app_name = sector + '.base_line'
    model_class = apps.get_model(sub_app_name, model_name)
    fetched_data = model_class.objects.filter(district_id=district_id).values('name', 'id', 'ownership')

    return HttpResponse(
        json.dumps(list(fetched_data)),
        content_type='application/javascript; charset=utf8'
    )


# dileepa
@csrf_exempt
def fetch_company_tele(request):
    data = (yaml.safe_load(request.body))
    district_id = data['district']
    model_name = data['model']
    sector = data['sector']

    sub_app_name = sector + '.base_line'
    model_class = apps.get_model(sub_app_name, model_name)
    fetched_data = model_class.objects.filter(district_id=district_id).values('company_name', 'id', 'ownership')

    return HttpResponse(
        json.dumps(list(fetched_data)),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def fetch_entities_all(request):
    data = (yaml.safe_load(request.body))
    district_id = data['district']
    model_name = data['model']
    sector = data['sector']

    sub_app_name = sector + '.base_line'
    model_class = apps.get_model(sub_app_name, model_name)
    fetched_data = model_class.objects.filter(district_id=district_id).values()

    return HttpResponse(
        json.dumps(list(fetched_data)),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def add_entity(request):
    print ' add_entity '
    print '------------'
    data = (yaml.safe_load(request.body))
    model_fields = data['model_fields']
    model_name = data['model']
    is_edit = data['is_edit']
    sector = data['sector']

    sub_app_name = sector + '.base_line'

    model_class = apps.get_model(sub_app_name, model_name)

    print is_edit

    if is_edit == False:
        print 'new'
        print model_fields
        model_object = model_class(**model_fields)
        model_object.save()

    else:
        print 'update'
        object_id = model_fields['id']
        modified_model = model_class.objects.filter(pk=object_id)
        modified_model.update(**model_fields)
        return HttpResponse(object_id)

    if model_object.id is not None:
        return HttpResponse(model_object.id)
    else:
        return HttpResponse(False)


# dileepa
@csrf_exempt
def edit_entity(request):
    data = (yaml.safe_load(request.body))
    model_fields = data['model_fields']
    model_name = data['model']
    is_edit = data['is_edit']
    sector = data['sector']

    sub_app_name = sector + '.base_line'

    model_class = apps.get_model(sub_app_name, model_name)

    print is_edit

    if is_edit == False:
        print 'new'
        print model_fields
        model_object = model_class(**model_fields)
        model_object.save()

    else:
        print '****update'
        object_id = model_fields['id']
        modified_model = model_class.objects.filter(pk=object_id)
        modified_model.update(**model_fields)
        return HttpResponse(object_id)

    if model_object.id is not None:
        return HttpResponse(model_object.id)
    else:
        return HttpResponse(False)


@csrf_exempt
def get_entity(request):
    data = (yaml.safe_load(request.body))
    model_fields = data['model_fields']
    model_name = data['model']
    sector = data['sector']

    sub_app_name = sector + '.base_line'
    object_id = model_fields['id']

    model_class = apps.get_model(sub_app_name, model_name)
    fetched_data = model_class.objects.filter(pk=object_id).values()

    return HttpResponse(
        json.dumps(list(fetched_data)),
        content_type='application/javascript; charset=utf8'
    )


# add entities with district ids
@csrf_exempt
def add_entity_with_district(request):
    data = (yaml.safe_load(request.body))
    model_fields = data['model_fields']
    model_name = data['model']
    is_edit = data['is_edit']
    sector = data['sector']
    district_id = data['district_id']

    sub_app_name = sector + '.base_line'

    model_class = apps.get_model(sub_app_name, model_name)

    print is_edit

    if is_edit == False:
        print 'new'

        model_object = model_class(**model_fields)
        model_object.district_id = district_id
        model_object.save()
        print model_object

    # update has to be done in the future for district
    else:
        print 'update'
        object_id = model_fields['id']
        modified_model = model_class.objects.filter(pk=object_id)
        modified_model.update(**model_fields)
        return HttpResponse(object_id)

    if model_object.id is not None:
        return HttpResponse(model_object.id)
    else:
        return HttpResponse(False)


@csrf_exempt
def dl_fetch_summary_disagtn(request):
    data = (yaml.safe_load(request.body))
    table_names = data['table_name']
    sectors = data['sector']
    com_data = data['com_data']
    incident = com_data['incident']

    dl_data = {}

    if 'province' in com_data:
        admin_area = com_data['province']
        filter_fields_sessions = {'incident': incident, 'district__province': admin_area}
    else:
        filter_fields_sessions = {'incident': incident}

    i = 0

    dl_sessions_all = []

    for sector in sectors:
        sub_app_name = sector + '.damage_losses'
        dl_session_model = apps.get_model(sub_app_name, 'DlSessionKeys')
        sector_dl_sessions = dl_session_model.objects.filter(**filter_fields_sessions).distinct()
        print sector
        print sector_dl_sessions
        for sector_dl_session in sector_dl_sessions:
            if 'province' in com_data:
                # cannot have same district twice
                if not sector_dl_session.district in dl_sessions_all:
                    dl_sessions_all.append(sector_dl_session)
            else:
                # cannot have same province twice
                if not sector_dl_session.province in dl_sessions_all:
                    dl_sessions_all.append(sector_dl_session)

    for sector in sectors:

        table_name = table_names[i]
        tables = settings.TABLE_PROPERTY_MAPPER[sector][table_name]

        dl_mtable_data = {sector: {}}
        dl_mtable_data[sector][table_name] = {}
        sub_app_name = sector + '.damage_losses'

        dl_session_model = apps.get_model(sub_app_name, 'DlSessionKeys')
        dl_sessions = dl_session_model.objects.filter(**filter_fields_sessions).distinct()

        for dl_session in dl_sessions_all:

            category_name = None

            if 'province' in com_data:
                district_id = dl_session.district.id
                filter_fields = {'incident': incident, 'district': district_id}
                category_name = dl_session.district.name
            else:
                province_id = None
                if dl_session.province:
                    province_id = dl_session.province.id
                    category_name = dl_session.province.name
                filter_fields = {'incident': incident, 'province': province_id}

            if category_name is not None:
                dl_mtable_data[sector][table_name][category_name] = {}

                for table in tables:
                    table_fields = tables[table]

                    dl_mtable_data[sector][table_name][category_name][table] = {}

                    table_fields = tables[table]
                    model_class = apps.get_model(sub_app_name, table)

                    table_fields = tables[table]
                    print table
                    dl_mtable_data[sector][table_name][category_name][table] = list(model_class.objects.
                                                                                    filter(**filter_fields)
                                                                                    .values(*table_fields))

        dl_data.update(dl_mtable_data)
        i += 1

    print '----------'
    for s in dl_data:
        for t in dl_data[s]:
            print s, t
            dl_data[s][t] = collections.OrderedDict(sorted(dl_data[s][t].items()))
    print '----------'
    # print dl_data

    return HttpResponse(
        json.dumps((dl_data), cls=DjangoJSONEncoder),
        content_type='application/javascript; charset=utf8'
    )


@csrf_exempt
def dl_fetch_summary_dis_disagtn(request):
    data = (yaml.safe_load(request.body))
    table_names = data['table_name']
    sectors = data['sector']
    com_data = data['com_data']
    incident = com_data['incident']

    filter_fields = {}
    dl_data = {}

    if 'province' in com_data:
        admin_area = com_data['province']
        filter_fields = {'incident': incident, 'province': admin_area}
    elif 'district' in com_data:
        admin_area = com_data['district']
        filter_fields = {'incident': incident, 'district': admin_area}
    else:
        filter_fields = {'incident': incident}

    i = 0

    for sector in sectors:
        print sector
        sub_app_name = sector + '.damage_losses'
        dl_mtable_data = {sector: {}}

        table_name = table_names[i]
        tables = settings.TABLE_PROPERTY_MAPPER[sector][table_name]
        dl_mtable_data[sector][table_name] = {}

        for table in tables:
            dl_mtable_data[sector][table_name][table] = {}
            table_fields = tables[table]
            model_class = apps.get_model(sub_app_name, table)
            dl_mtable_data[sector][table_name][table] = list(model_class.objects.
                                                             filter(**filter_fields).
                                                             values(*table_fields))
            print dl_mtable_data
            dl_data.update(dl_mtable_data)
        i += 1

    return HttpResponse(
        json.dumps(dl_data, cls=DjangoJSONEncoder),
        content_type='application/javascript; charset=utf8'
    )


# dileepa
@csrf_exempt
def get_user_id_from_username(username):
    # from django.db import models
    # Public.UsersMyuser
    model_class = apps.get_model('public', 'UsersMyuser')
    result = model_class.objects.filter(username=username).filter(id)
    print '*******', username, result


# dileepa
# this method is only use for transport summary national should move to it's view.py
@csrf_exempt
def fetch_trans_rail_losses(request):
    print 'fetch_trans_rail_losses-------'
    data = (yaml.safe_load(request.body))
    print data
    incident = data['incident']
    model_name = data['models']
    sector = data['sector']

    print incident, model_name, sector

    sub_app_name = sector + '.damage_losses'
    model_class = apps.get_model(sub_app_name, model_name)
    fetched_data = model_class.objects.filter(incident=incident).values(
        'id', 'loss_type', 'year_1', 'year_2', 'tot_los', 'incident')

    print fetched_data

    return HttpResponse(
        json.dumps(list(fetched_data)),
        content_type='application/javascript; charset=utf8'
    )


# dileepa
# this method is only use for education, this should move to it's view.py
@csrf_exempt
def edit_school(request):
    data = (yaml.safe_load(request.body))
    model_fields = data['model_fields']
    model_name = data['model']
    sector = data['sector']

    sub_app_name = sector + '.base_line'

    model_class = apps.get_model(sub_app_name, model_name)

    print 'update'
    object_id = model_fields['id']
    modified_model = model_class.objects.filter(pk=object_id)
    modified_model.update(**model_fields)
    print object_id
    return HttpResponse(object_id)


# dileepa
# @csrf_exempt
# def get_summary_data_by_sector(request):
#     print "--------- get_summary_data_by_sector"
#     data = (yaml.safe_load(request.body))
#     com_data = data['com_data']
#     table_name = data['table_name']
#     incident = com_data['incident']
#     sectors = data['sectors']
#     print table_name
#
#     sector_summary = {'report': {}}
#
#     tables = settings.TABLE_PROPERTY_MAPPER['reports'][table_name]
#
#     for sector in sectors:
#         print sector, type(sector)
#         for key, views in sector.iteritems():
#             sector_summary['report'][key] = {}
#
#             for view in views:
#                 sector_summary['report'][key][view] = {}
#                 dl_session_model = apps.get_model('reports', view)
#                 # should be checking against table name as well
#
#                 try:
#                     filterd_fields = tables[key][view]
#                     sector_summary['report'][key][view] = list(
#                         dl_session_model.objects.filter(incident=incident).values(*filterd_fields))
#
#                     print sector_summary['report'][key][view]
#                 except Exception as e:
#                     print 'error', e
#
#     print '========'
#     print sector_summary
#
#     return HttpResponse(
#         json.dumps((sector_summary), cls=DjangoJSONEncoder),
#         content_type='application/javascript; charset=utf8'
#     )

@csrf_exempt
def get_summary_data_by_sector(request):
    print "--------- get_summary_data_by_sector"
    data = (yaml.safe_load(request.body))
    table_name = 'Table_1'
    com_data = data['com_data']
    incident = com_data['incident']
    sectors = data['sectors']

    sector_summary = {'report': {table_name: {}}}

    tables = settings.TABLE_PROPERTY_MAPPER['reports'][table_name]

    for sector in sectors:
        print sector, type(sector)
        for key, views in sector.iteritems():
            sector_summary['report'][table_name][key] = {}

            for view in views:
                sector_summary['report'][table_name][key][view] = {}
                dl_session_model = apps.get_model('reports', view)
                # should be checking against table name as well

                try:
                    filterd_fields = tables[key][view]
                    sector_summary['report'][table_name][key][view] = list(dl_session_model.objects.filter(incident=incident).
                                                                           values(*filterd_fields))

                    print sector_summary['report'][table_name][key][view]
                except Exception as e:
                    print 'error', e

    print '========'
    print sector_summary

    return HttpResponse(
        json.dumps((sector_summary), cls=DjangoJSONEncoder),
        content_type='application/javascript; charset=utf8'
    )


# dileepa
@csrf_exempt
def get1_summary_data_by_sector_for_provinces(request):
    print "--------- get_summary_data_by_sector_for_provinces"
    data = (yaml.safe_load(request.body))
    table_name = 'Table_2'
    com_data = data['com_data']
    incident = com_data['incident']
    sectors = data['sectors']

    sector_provinces_summary = {'report': {table_name: {}}}

    tables = settings.TABLE_PROPERTY_MAPPER['reports'][table_name]

    for sector in sectors:
        print sector, type(sector)
        for key, views in sector.iteritems():

            for view in views:
                dl_session_model = apps.get_model('reports', view)
                # should be checking against table name as well
                # print dl_session_model

                try:
                    filterd_fields = tables[key][view]
                    sector_provinces_summary_row = list(dl_session_model.objects.filter(incident=incident).values(*filterd_fields))

                    for i, l in enumerate(sector_provinces_summary_row):
                        # print '@', l, type(l), i
                        province_name = l['name']
                        province_id = l['province']
                        sector_provinces_summary['report'][table_name][province_name] = {}

                        for key2, views2 in sector.iteritems():
                            for view2 in views2:
                                sector_provinces_summary['report'][table_name][province_name][view2] = {}
                                dl_session_model2 = apps.get_model('reports', view2)
                                filterd_fields2 = tables[key2][view2]
                                sector_provinces_summary['report'][table_name][province_name][view2] = list(dl_session_model2.objects.filter(incident=incident, province=province_id).values(*filterd_fields2))
                except Exception as e:
                    print 'error', e

    print '========'
    print type(sector_provinces_summary)
    print sector_provinces_summary

    return HttpResponse(
        json.dumps((sector_provinces_summary), cls=DjangoJSONEncoder),
        content_type='application/javascript; charset=utf8'
    )
