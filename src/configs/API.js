import { SCConfig } from './SCConfig';

const API = {
  UNIT: {
    UNIT_DETAIL: (id) => SCConfig.apiRoot + `/property_manager/units/${id}/`,
    UNIT_NEAR_ME: (lat, lon, page) =>
      SCConfig.apiRoot +
      `/property_manager/units/near-me/${lat},${lon}/?page=${page}`,
    UNITS_PUBLIC: () => SCConfig.apiRoot + '/property_manager/units/public/',
    UNIT_SUMMARY: (id) =>
      SCConfig.apiRoot + `/property_manager/units/${id}/summary/`,
    UNIT_SUMMARY_DETAIL: (id, id2) =>
      SCConfig.apiRoot + `/property_manager/units/${id}/summary_detail/${id2}/`,
    FILTER_SHARED_UNITS: (field) =>
      SCConfig.apiRoot + `/property_manager/shared_units/?ordering=${field}`,
    STAR_UNIT: (id) => SCConfig.apiRoot + `/property_manager/units/${id}/star/`,
    UNSTAR_UNIT: (id) =>
      SCConfig.apiRoot + `/property_manager/units/${id}/unstar/`,
    PIN_UNIT: (id) => SCConfig.apiRoot + `/property_manager/units/${id}/pin/`,
    UNPIN_UNIT: (id) =>
      SCConfig.apiRoot + `/property_manager/units/${id}/unpin/`,
    MANAGE_UNIT: (id) => SCConfig.apiRoot + `/property_manager/units/${id}/`,
    CHIP_SCAN: (id) =>
      SCConfig.apiRoot + `/property_manager/units/${id}/chip_scan/`,
    MANAGE_ACCESS: (id) =>
      SCConfig.apiRoot + `/property_manager/manage_access/${id}/`,
    AUTOMATE: (id) =>
      SCConfig.apiRoot + `/property_manager/units/${id}/automate/`,
    DEVICE_CONTROL: (id) =>
      SCConfig.apiRoot + `/property_manager/units/${id}/device_control/`,
  },
  SUB_UNIT: {
    REMOVE_SUB_UNIT: (unitId, id) =>
      SCConfig.apiRoot + `/property_manager/${unitId}/sub_units/${id}/`,
    CREATE_SUB_UNIT: (unitId) =>
      SCConfig.apiRoot + `/property_manager/${unitId}/sub_units/`,
    MANAGE_SUB_UNIT: (unitId, id) =>
      SCConfig.apiRoot + `/property_manager/${unitId}/sub_units/${id}/`,
    SENSOR_SCAN: (id) =>
      SCConfig.apiRoot + `/property_manager/stations/${id}/sensor_scan/`,
  },
  CHIP: {
    CHECK_FINALIZED: () =>
      SCConfig.apiRoot + '/property_manager/stations/check_chip_finalized/',
  },
  SENSOR: {
    DISPLAY: (id) =>
      SCConfig.apiRoot + `/property_manager/sensors/${id}/display/`,
    DISPLAY_VALUES: (id) =>
      SCConfig.apiRoot + `/property_manager/sensors/${id}/display_values/`,
    DISPLAY_VALUES_V2: (id) =>
      SCConfig.apiRoot + `/property_manager/sensors/${id}/display_values_v2/`,
    DISPLAY_HISTORY: (id, hId) =>
      SCConfig.apiRoot + `/property_manager/sensors/${id}/display_history/`,
    CAMERA_DISPLAY: (id) =>
      SCConfig.apiRoot + `/property_manager/sensors/${id}/cameras/`,
    REMOTE_CONTROL_OPTIONS: (id) =>
      SCConfig.apiRoot +
      `/property_manager/sensors/${id}/remote_control_options/`,
    QUICK_ACTION: (id) =>
      SCConfig.apiRoot + `/property_manager/sensors/${id}/quick_action/`,
    CHECK_CONNECTION: (id) =>
      SCConfig.apiRoot + `/property_manager/sensors/${id}/check_connection/`,
    UPDATE_SENSOR: (unit_id, station_id, id) =>
      SCConfig.apiRoot +
      `/property_manager/${unit_id}/sub_units/${station_id}/devices/${id}/`,
    ACTIVITY_LOG: () => SCConfig.apiRoot + '/chip_manager/action_log',
    ADD_TO_FAVOURITES: (unit_id, station_id, id) =>
      SCConfig.apiRoot +
      `/property_manager/${unit_id}/sub_units/${station_id}/devices/${id}/add_to_favourites/`,
    REMOVE_FROM_FAVOURITES: (unit_id, station_id, id) =>
      SCConfig.apiRoot +
      `/property_manager/${unit_id}/sub_units/${station_id}/devices/${id}/remove_from_favourites/`,
    DISPLAY_ACTIONS: (id) =>
      SCConfig.apiRoot + `/property_manager/sensors/${id}/display_actions/`,
    RENAME_SENSOR: (id) =>
      SCConfig.apiRoot + `/property_manager/sensors/${id}/`,
    REMOVE_SENSOR: (id) =>
      SCConfig.apiRoot + `/property_manager/sensors/${id}/`,
  },
  SHARED_SENSOR: {
    ACCESS: (id) =>
      SCConfig.apiRoot + `/property_manager/shared_sensors/${id}/access/`,
  },
  CONFIG: {
    DISPLAY_HISTORY: () =>
      SCConfig.apiRoot + '/property_manager/configs/display_history/',
  },
  AUTOMATE: {
    ACTION_ONE_TAP: (id) =>
      SCConfig.apiRoot + `/property_manager/automate/${id}/action_one_tap/`,
    SCRIPT: (id) =>
      SCConfig.apiRoot + `/property_manager/automate/${id}/script/`,
    ORDER_SCRIPT_ACTION: (id) =>
      SCConfig.apiRoot +
      `/property_manager/automate/${id}/order_script_action/`,
    DELETE_SCRIPT_ACTION: (automateId, actionId) =>
      SCConfig.apiRoot +
      `/property_manager/automate/${automateId}/script_action/${actionId}/`,
    ADD_SCRIPT_ACTION: (id) =>
      SCConfig.apiRoot + `/property_manager/automate/${id}/add_script_action/`,
    CREATE_AUTOMATE: () => SCConfig.apiRoot + '/property_manager/automate/',
    GET_AUTOMATES: () => SCConfig.apiRoot + '/accounts/automates/',
    GET_ALL_UNITS: () => SCConfig.apiRoot + '/property_manager/units/all_unit/',
    GET_SENSOR_CONFIG: (id) =>
      SCConfig.apiRoot + `/property_manager/sensors/${id}/display_configs/`,
    ACTIVITY_LOG: (id) =>
      SCConfig.apiRoot + `/property_manager/automate/${id}/logs/`,
  },
  GOOGLE_HOME: {
    CHECK_SEND_EMAIL: () =>
      SCConfig.apiRoot + '/connection_manager/googlehome/check_send_email/',
  },
  POWER_CONSUME: {
    DISPLAY_HISTORY: () =>
      SCConfig.apiRoot + '/property_manager/power_consume/display_history/',
  },
  SHARE: {
    UNITS: () => SCConfig.apiRoot + '/property_manager/sharing/units/',
    UNIT_PERMISSIONS: (id) =>
      SCConfig.apiRoot + `/property_manager/sharing/units/${id}/permissions/`,
    UNITS_MEMBERS: (id) =>
      SCConfig.apiRoot + `/property_manager/sharing/units/${id}/members/`,
    UNITS_MEMBER_DETAIL: (id, shareId) =>
      SCConfig.apiRoot +
      `/property_manager/sharing/units/${id}/members/${shareId}/`,
    SHARE: () => SCConfig.apiRoot + '/property_manager/sharing/share/',
  },
  EMERGENCY: {
    CONTACTS: () => SCConfig.apiRoot + '/emergency_button/contacts/',
  },
  EMERGENCY_BUTTON: {
    CREATE_CONTACT: () => SCConfig.apiRoot + '/emergency_button/contacts/',
    CONTACTS: () => SCConfig.apiRoot + '/emergency_button/contacts/',
    REMOVE_CONTACTS: (id) =>
      SCConfig.apiRoot + `/emergency_button/contacts/${id}/`,
    SEND_ALERT: () => SCConfig.apiRoot + '/emergency_button/events/',
    RESOLVE: (id) =>
      SCConfig.apiRoot + `/emergency_button/events/${id}/resolve/`,
  },
  IOT: {
    CHIP_MANAGER: {
      WATCH_CONFIGS: () => SCConfig.apiRoot + '/chip_manager/watch_configs/',
      PUSHER_AUTH: () => SCConfig.apiRoot + '/chip_manager/pusher/auth/',
    },
    LG: {
      AUTHORIZE: (client_id, redirect_uri) =>
        // eslint-disable-next-line max-len
        `${SCConfig.LG_URL}/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=1`,
      GET_TOKEN: (client_id, code, redirect_uri, backend_url) =>
        // eslint-disable-next-line max-len
        `${SCConfig.LG_URL}/token?client_id=${client_id}&code=${code}&redirect_uri=${redirect_uri}&backend_url=${backend_url}&grant_type=authorization_code`,
      SYNC_DEVICE: () =>
        SCConfig.apiRoot + '/connection_manager/lg_thinq/sync_device/',
      CONTROL_DEVICE: () =>
        SCConfig.apiRoot + '/connection_manager/lg_thinq/control_device/',
      DEVICE_STATUS: (sensorId) =>
        SCConfig.apiRoot +
        `/connection_manager/lg_thinq/device_status/${sensorId}/`,
    },
  },
  EXTERNAL: {
    GOOGLE_MAP: {
      AUTO_COMPLETE:
        'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      GET_LAT_LNG_BY_PLACE_ID:
        'https://maps.googleapis.com/maps/api/place/details/json',
    },
  },
};

export default API;
