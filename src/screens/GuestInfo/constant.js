import moment from 'moment';
import { Colors } from '../../configs';

export const ACCESS_SCHEDULE = {
  ALWAYS: 'always',
  RECURRING: 'recurring',
  TEMPORARY: 'temporary',
};

export const ACCESS_SCHEDULE_PROPERTIES = {
  [ACCESS_SCHEDULE.ALWAYS]: ['access_schedule'],
  [ACCESS_SCHEDULE.RECURRING]: [
    'access_schedule',
    'recurring_time_start',
    'recurring_time_end',
    'recurring_time_repeat',
  ],
  [ACCESS_SCHEDULE.TEMPORARY]: [
    'access_schedule',
    'temporary_time_start',
    'temporary_time_end',
  ],
};

export const typeMaps = {
  recurring_time_start: 'time',
  recurring_time_end: 'time',
  recurring_time_repeat: 'array',
  temporary_time_start: 'datetime',
  temporary_time_end: 'datetime',
};

export const formatterMaps = {
  time: (value) => moment(`2020-01-01T${value}`),
  datetime: (value) => moment(value),
  array: (value) => value,
};

export const formatterForUpdateMaps = {
  time: (value) => moment(value).format('HH:mm:ss'),
  datetime: (value) => moment(value).utc().format('YYYY-MM-DD HH:mm:ss'),
  array: (value) => value,
};

export const getDefaultValueMaps = {
  time: () => moment().hour(0).minute(0).second(0),
  datetime: () => moment().hour(0).minute(0).second(0),
  array: () => [],
};

export const REPEAT_ITEMS = [
  { value: '6', text: 'S', color: Colors.Red6 },
  { value: '0', text: 'M', color: Colors.Gray8 },
  { value: '1', text: 'T', color: Colors.Gray8 },
  { value: '2', text: 'W', color: Colors.Gray8 },
  { value: '3', text: 'T', color: Colors.Gray8 },
  { value: '4', text: 'F', color: Colors.Gray8 },
  { value: '5', text: 'S', color: Colors.Gray8 },
];
