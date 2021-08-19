import { SCConfig } from './SCConfig';

const API = {
  AUTH: {
    LOGIN_PHONE: SCConfig.apiRoot + '/accounts/login/',
    LOGIN_FACEBOOK: SCConfig.apiRoot + '/accounts/login/facebook/',
    REGISTER_PHONE: SCConfig.apiRoot + '/accounts/register/phone/',
    RESEND_OTP: SCConfig.apiRoot + '/accounts/register/resend_otp/',
    VERIFY_OTP: SCConfig.apiRoot + '/accounts/register/verify_otp/',
    LOGIN_SOCIAL_FB: SCConfig.apiRoot + '/accounts/login/facebook/',
    LOGIN_SOCIAL_GG: SCConfig.apiRoot + '/accounts/login/google/',
    LOGIN_SOCIAL_AP: SCConfig.apiRoot + '/accounts/login/apple/',
    FORGOT_PASSWORD: SCConfig.apiRoot + '/accounts/forgot_password/',
    FORGOT_PASSWORD_VERIFY_OTP:
      SCConfig.apiRoot + '/accounts/forgot_password/verify_otp/',
    RESET_PASSWORD:
      SCConfig.apiRoot + '/accounts/forgot_password/set_password/',
  },
  ACCOUNTS: {
    FEATURES: SCConfig.apiRoot + '/accounts/features/',
    ADD_CARD: SCConfig.apiRoot + '/billing/payments/stripe/add_card/',
    REMOVE_CARD: (id) =>
      SCConfig.apiRoot + `/billing/payments/stripe/remove_cards/${id}/`,
    CHANGE_DEFAULT_CARD:
      SCConfig.apiRoot + '/billing/payments/stripe/set_default/',
    LIST_PAYMENT_METHODS: SCConfig.apiRoot + '/billing/list_payment_methods/',
    CREATE_CARD_TOKEN: 'https://api.stripe.com/v1/tokens',
  },
  UNIT: {
    ADD_USER:
      SCConfig.apiRoot + '/property_manager/shared_units/add_by_phone_number/',
    MY_UNITS: SCConfig.apiRoot + '/property_manager/units/mine/',
    SHARED_UNITS: SCConfig.apiRoot + '/property_manager/shared_units/',
    UNIT_DETAIL: (id) => SCConfig.apiRoot + `/property_manager/units/${id}/`,
    UNIT_NEAR_ME: (lat, lon, page) =>
      SCConfig.apiRoot +
      `/property_manager/units/near-me/${lat},${lon}/?page=${page}`,
    UNITS_PUBLIC: SCConfig.apiRoot + '/property_manager/units/public/',
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
    CHECK_FINALIZED:
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
    ACTIVITY_LOG: SCConfig.apiRoot + '/chip_manager/action_log',
  },
  CONFIG: {
    DISPLAY_HISTORY:
      SCConfig.apiRoot + '/property_manager/configs/display_history/',
  },
  POWER_CONSUME: {
    DISPLAY_HISTORY:
      SCConfig.apiRoot + '/property_manager/power_consume/display_history/',
  },
  SHARE: {
    UNITS: SCConfig.apiRoot + '/property_manager/sharing/units/',
    UNIT_PERMISSIONS: (id) =>
      SCConfig.apiRoot + `/property_manager/sharing/units/${id}/permissions/`,
    UNITS_MEMBERS: (id) =>
      SCConfig.apiRoot + `/property_manager/sharing/units/${id}/members/`,
    UNITS_MEMBER_DETAIL: (id, shareId) =>
      SCConfig.apiRoot +
      `/property_manager/sharing/units/${id}/members/${shareId}/`,
    SHARE: SCConfig.apiRoot + '/property_manager/sharing/share/',
  },
  EXTERNAL: {
    WEATHER: (location, weatherMapId) =>
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}` +
      `&appid=${weatherMapId}`,
    UV_INDEX: (location, weatherMapId) =>
      `https://api.openweathermap.org/data/2.5/uvi?appid=${weatherMapId}&lat=${location.lat}&lon=${location.lon}`,
    AQI: (location, weatherMapToken) =>
      `https://api.waqi.info/feed/geo:${location.lat};${location.lon}/?token=${weatherMapToken}`,
    GOOGLE_MAP: {
      AUTO_COMPLETE:
        'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      GET_LAT_LNG_BY_PLACE_ID:
        'https://maps.googleapis.com/maps/api/place/details/json',
    },
  },
  PARKING: {
    NEARBY: SCConfig.apiRoot + '/smart_parking/parking_areas/near_me/',
    NEAREST:
      SCConfig.apiRoot +
      '/smart_parking/parking_areas/nearest_available_parking/',
    SAVED_LIST: SCConfig.apiRoot + '/smart_parking/parking_areas/saved_list/',
    SAVE: (id) => SCConfig.apiRoot + `/smart_parking/parking_areas/${id}/save/`,
    UNSAVE: (id) =>
      SCConfig.apiRoot + `/smart_parking/parking_areas/${id}/unsave/`,
    DETAIL: (id) => SCConfig.apiRoot + `/smart_parking/parking_areas/${id}/`,
    GET_BOOKING_PRICE: (id) =>
      SCConfig.apiRoot + `/smart_parking/parking_areas/${id}/get_price/`,
    AVAILABLE_TIME_SLOTS: (id) =>
      SCConfig.apiRoot + `/smart_parking/parkings/${id}/available-time-slots/`,
    PAYMENT_SUCCESS: (id) =>
      SCConfig.apiRoot + `/smart_parking/payment_success/${id}/`,
    CHECK_CAR_PARKED:
      SCConfig.apiRoot + '/smart_parking/spots/check_car_parked/',
    PARKING_INFO: SCConfig.apiRoot + '/smart_parking/spots/parking_info/',
  },
  CAR: {
    MY_CARS: SCConfig.apiRoot + '/smart_parking/cars/',
    CHECK_CARS_INFO:
      SCConfig.apiRoot + '/smart_parking/cars/check_information/',
    REMOVE_CAR: (id) => SCConfig.apiRoot + `/smart_parking/cars/${id}/`,
    UPDATE: (id) => SCConfig.apiRoot + `/smart_parking/cars/${id}/`,
    UPDATE_DEFAULT: (id) =>
      SCConfig.apiRoot + `/smart_parking/cars/${id}/update_default/`,
  },
  BOOKING: {
    CREATE: SCConfig.apiRoot + '/smart_parking/bookings/',
    DETAIL: (id) => SCConfig.apiRoot + `/smart_parking/bookings/${id}/`,
    ACTIVE_SESSION:
      SCConfig.apiRoot + '/smart_parking/bookings/active_session/',
    HISTORY: (page) =>
      SCConfig.apiRoot + `/smart_parking/bookings/history/?page=${page}`,
    SCAN_TO_BOOK: SCConfig.apiRoot + '/smart_parking/bookings/scan_to_book/',
    SCAN_TO_CONFIRM:
      SCConfig.apiRoot + '/smart_parking/bookings/scan_to_confirm/',
    EXTEND_INFO: (id) =>
      SCConfig.apiRoot + `/smart_parking/bookings/${id}/extend_info/`,
    EXTEND: (id) => SCConfig.apiRoot + `/smart_parking/bookings/${id}/extend/`,
    CANCEL: (id) => SCConfig.apiRoot + `/smart_parking/bookings/${id}/cancel/`,
    STOP: (id) => SCConfig.apiRoot + `/smart_parking/bookings/${id}/stop/`,
  },
  EMERGENCY: {
    CONTACTS: SCConfig.apiRoot + '/emergency_button/contacts/',
  },
  BILLING: {
    LIST_PAYMENT_METHODS_BY_COUNTRY: (code) =>
      SCConfig.apiRoot + `/billing/list-methods/${code}/`,
    PAYMENT: {
      STRIPE: {
        PROCESS: (id) =>
          SCConfig.apiRoot + `/billing/payments/stripe/process/${id}/`,
        ADD_CARD: SCConfig.apiRoot + '/billing/payments/stripe/add_card/',
        CREATE_PAYMENT_INTENT: (id) =>
          SCConfig.apiRoot +
          `/billing/payments/stripe/sca/create-payment/${id}/`,
        PAYMENT_INTENT_SUCCESS: (intent_id) =>
          SCConfig.apiRoot +
          `/billing/payments/stripe/sca/payment_success/${intent_id}/`,
      },
    },
    DEFAULT_PAYMENT_METHODS:
      SCConfig.apiRoot + '/billing/default_payment_method/',
  },
  NOTIFICATION: {
    REGISTER_SIGNAL_ID: SCConfig.apiRoot + '/accounts/register-signal-id/',
    LIST_ALL_NOTIFICATIONS: (page, type) =>
      SCConfig.apiRoot +
      `/notifications/notifications/?page=${page}&type=${type}`,
    SET_READ: (id) =>
      SCConfig.apiRoot + `/notifications/notifications/${id}/set_read/`,
    SET_LAST_SEEN: (id) =>
      SCConfig.apiRoot + '/notifications/notifications/set_last_seen/',
    NUMBER: SCConfig.apiRoot + '/notifications/notifications/number/',
  },
  EMERGENCY_BUTTON: {
    CREATE_CONTACT: SCConfig.apiRoot + '/emergency_button/contacts/',
    CONTACTS: SCConfig.apiRoot + '/emergency_button/contacts/',
    REMOVE_CONTACTS: (id) =>
      SCConfig.apiRoot + `/emergency_button/contacts/${id}/`,
    SEND_ALERT: SCConfig.apiRoot + '/emergency_button/events/',
    RESOLVE: (id) =>
      SCConfig.apiRoot + `/emergency_button/events/${id}/resolve/`,
  },
  IOT: {
    CHIP_MANAGER: {
      WATCH_CONFIGS: SCConfig.apiRoot + '/chip_manager/watch_configs/',
      PUSHER_AUTH: SCConfig.apiRoot + '/chip_manager/pusher/auth/',
    },
    LG: {
      AUTHORIZE: (client_id, redirect_uri) =>
        // eslint-disable-next-line max-len
        `${SCConfig.LG_URL}/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=1`,
      GET_TOKEN: (client_id, code, redirect_uri, backend_url) =>
        // eslint-disable-next-line max-len
        `${SCConfig.LG_URL}/token?client_id=${client_id}&code=${code}&redirect_uri=${redirect_uri}&backend_url=${backend_url}&grant_type=authorization_code`,
      SYNC_DEVICE:
        SCConfig.apiRoot + '/connection_manager/lg_thinq/sync_device/',
      CONTROL_DEVICE:
        SCConfig.apiRoot + '/connection_manager/lg_thinq/control_device/',
      DEVICE_STATUS: (sensorId) =>
        SCConfig.apiRoot +
        `/connection_manager/lg_thinq/device_status/${sensorId}/`,
    },
  },
};

export default API;
