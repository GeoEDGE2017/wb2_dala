from django.conf.urls import include, url
from django.contrib import admin
# from tastypie.api import Api
from .import views
# from api.resources import DistrictResource, ProvinceResource, BmfPubMfResource

# v1_api = Api(api_name='v1')
# v1_api.register(DistrictResource())
# v1_api.register(ProvinceResource())
# v1_api.register(BmfPubMfResource())

urlpatterns = [
    #url(r'^admin/', admin.site.urls),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('dashboard.urls', namespace='dashboard')),
    url(r'^dashboard/', include('dashboard.urls', namespace='dashboard')),
    # url(r'^api/', include(v1_api.urls)),
    url(r'^health/', include('health.urls', namespace='health')),
    url(r'^education/', include('education.urls', namespace='education')),
    url(r'^users/', include('users.urls', namespace='users')),
    url(r'^reports/', include('reports.urls', namespace='reports')),
    url(r'^charts/', include('charts.urls', namespace='charts')),
    url(r'^new_charts/', include('new_charts.urls', namespace='new_charts')),
    url(r'^send_email', views.send_email, name='send_email'),

    # report builder
   # url(r'^report_builder/', include('report_builder.urls')),

    # common functions
    url(r'^bs_get_data$', views.bs_get_data, name='bs_get_data'),
    url(r'^bs_get_data_mock$', views.bs_get_data_mock, name='bs_get_data_mock'),
    url(r'^bs_fetch_edit_data$', views.bs_fetch_edit_data, name='bs_fetch_edit_data'),
    url(r'^bs_save_data$', views.bs_save_data, name='bs_save_data'),
    url(r'^fetch_entities$', views.fetch_entities, name='fetch_entities'),
    url(r'^add_entity$', views.add_entity, name='add_entity'),
    url(r'^get_entity$', views.get_entity, name='get_entity'),
    url(r'^edit_firm$', views.edit_firm, name='edit_firm'),
    url(r'^edit_organization', views.edit_organization, name='edit_organization'),
    url(r'^fetch_entities_all$', views.fetch_entities_all, name='fetch_entities_all'),

    url(r'^fetch_company_tele$', views.fetch_company_tele, name='fetch_company_tele'),

    url(r'^get_latest_bs_date', views.get_latest_bs_date, name='get_latest_bs_date'),
    url(r'^getlatest_bs_date_with_organization', views.getlatest_bs_date_with_organization, name='getlatest_bs_date_with_organization'),
    url(r'^dl_save_data_with_array', views.dl_save_data_with_array, name='dl_save_data_with_array'),
    url(r'^bs_get_data_mock_for_bs', views.bs_get_data_mock_for_bs, name='bs_get_data_mock_for_bs'),
    url(r'^dl_fetch_edit_data_with_array', views.dl_fetch_edit_data_with_array, name='dl_fetch_edit_data_with_array'),
    url(r'^dl_delete_data', views.dl_delete_data, name='dl_delete_data'),
    url(r'^is_enum_used_in_dl', views.is_enum_used_in_dl, name='is_enum_used_in_dl'),
    url(r'^bs_save_data_with_firm', views.bs_save_data_with_firm, name='bs_save_data_with_firm'),
    url(r'^bs_save_data_with_organization', views.bs_save_data_with_organization, name='bs_save_data_with_organization'),
    url(r'^get_summary_data_by_sector', views.get_summary_data_by_sector, name='get_summary_data_by_sector'),
    url(r'^get1_summary_data_by_sector_for_provinces', views.get1_summary_data_by_sector_for_provinces, name='get1_summary_data_by_sector_for_provinces'),

    url(r'^fetch_trans_rail_losses', views.fetch_trans_rail_losses, name='fetch_trans_rail_losses'),
    url(r'^edit_school', views.edit_school, name='edit_school'),

    # add_entity_with_district
    url(r'^add_entity_with_district$', views.add_entity_with_district, name='add_entity_with_district'),

    url(r'^dl_save_data$', views.dl_save_data, name='dl_save_data'),
    url(r'^dl_get_data$', views.dl_get_data, name='dl_get_data'),
    url(r'^dl_fetch_edit_data$', views.dl_fetch_edit_data, name='dl_fetch_edit_data'),
    url(r'^dl_fetch_district_disagtn$', views.dl_fetch_district_disagtn, name='dl_fetch_district_disagtn'),
    url(r'^dl_fetch_summary_disagtn$', views.dl_fetch_summary_disagtn, name='dl_fetch_summary_disagtn'),
    url(r'^dl_fetch_summary_dis_disagtn$', views.dl_fetch_summary_dis_disagtn, name='dl_fetch_summary_dis_disagtn'),

    url(r'^update_enumirate_dl_data$', views.update_enumirate_dl_data, name='update_enumirate_dl_data'),
    url(r'^update_other_government_enumirate_dl_data$', views.update_other_government_enumirate_dl_data, name='update_other_government_enumirate_dl_data'),
    url(r'^uupdate_enumirate_dl_data_with_firms$', views.uupdate_enumirate_dl_data_with_firms, name='uupdate_enumirate_dl_data_with_firms'),
    url(r'^uupdate_enumirate_dl_data_with_organizations$', views.uupdate_enumirate_dl_data_with_organizations, name='uupdate_enumirate_dl_data_with_organizations'),

    url(r'^fetch_incident_districts$', views.fetch_incident_districts, name='fetch_incident_districts'),
    url(r'^fetch_incident_provinces$', views.fetch_incident_provinces, name='fetch_incident_provinces'),

    # get Business Types
    url(r'^fetch_business_types$', views.fetch_business_types, name='fetch_business_types'),
    url(r'^fetch_business_types_for_summary$', views.fetch_business_types_for_summary, name='fetch_business_types_for_summary'),

    # get Business Types
    url(r'^fetch_tourism_infrastructure_types$', views.fetch_tourism_infrastructure_types, name='fetch_tourism_infrastructure_types'),

    # get entities all data
    url(r'^fetch_entities_plain$', views.fetch_entities_plain, name='fetch_entities_plain'),

    url(r'^fetch_pw_gen_firms$', views.fetch_pw_gen_firms, name='fetch_pw_gen_firms'),

    url(r'^fetch_entities_plain_column$', views.fetch_entities_plain_column, name='fetch_entities_plain_column'),

    url(r'^fetch_entities_plain_column_from_district$', views.fetch_entities_plain_column_from_district, name='fetch_entities_plain_column_from_district'),

    # agri_irrigation
    url(r'^agri_irrigation/', include('agri_irrigation.urls', namespace='agri_irrigation')),

    # agri_agrarian
    url(r'^agri_agrarian/', include('agri_agrarian.urls', namespace='agri_agrarian')),

    # agri_livestock
    url(r'^agri_livestock/', include('agri_livestock.urls', namespace='agri_livestock')),
     url(r'^bs_livestock_fetch_edit_data$', views.bs_livestock_fetch_edit_data, name='bs_livestock_fetch_edit_data'),

    # agri_fisheries
    url(r'^agri_fisheries/', include('agri_fisheries.urls', namespace='agri_fisheries')),

    # agri_summary
    url(r'^agri_summary/', include('agri_summary.urls', namespace='agri_summary')),

    # water_supply
    url(r'^water_supply/', include('water_supply.urls', namespace='water_supply')),

    # power_supply
    url(r'^power_supply/', include('power_supply.urls', namespace='power_supply')),

    # housing
    url(r'^housing/', include('housing.urls', namespace='housing')),

    # telecommunication
    url(r'^telecommunication/', include('telecommunication.urls', namespace='telecommunication')),

    # tourism
    url(r'^tourism/', include('tourism.urls', namespace='tourism')),

    # industry_services
    url(r'^industry_services/', include('industry_services.urls', namespace='industry_services')),

    # other govn services
    url(r'^other_govn_services/', include('other_govn_services.urls', namespace='other_govn_services')),

    # mining
    url(r'^mining/', include('mining.urls', namespace='mining')),
    url(r'^bs_mining_fetch_edit_data$', views.bs_mining_fetch_edit_data, name='bs_mining_fetch_edit_data'),
    url(r'^dl_fetch_district_disagtn$', views.dl_fetch_district_disagtn, name='dl_fetch_district_disagtn'),
    url(r'^dl_fetch_total_data$', views.dl_fetch_total_data, name='dl_fetch_total_data'),
    url(r'^dl_fetch_summary_disagtn$', views.dl_fetch_summary_disagtn, name='dl_fetch_summary_disagtn'),

    # transport_rail
    url(r'^transport_rail/', include('transport_rail.urls', namespace='transport_rail')),

    # transport-water
    url(r'^transport_water/', include('transport_water.urls', namespace='transport_water')),

    # transport-land
    url(r'^transport_land/', include('transport_land.urls', namespace='transport_land')),

    # transport_air
    url(r'^transport_air/', include('transport_air.urls', namespace='transport_air')),

    # transport_summary
    url(r'^transport_summary/', include('transport_summary.urls', namespace='transport_summary')),

    # test
    # url(r'^transport_summary/', include('transport_summary.urls', namespace='transport_summary')),
]
