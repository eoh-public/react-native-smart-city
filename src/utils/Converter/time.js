import { useTranslations } from '../../hooks/Common/useTranslations';
import moment from 'moment';

export const transformDatetime = (data = {}, listFieldName = []) => {
  listFieldName.forEach((name) => {
    const value = data[name];
    const isArray = Array.isArray(value);

    if (!data.hasOwnProperty(name)) {
      return;
    }

    if (isArray) {
      data[name] = value.map((item) => (item ? moment(item) : item));
      return;
    }

    data[name] = value ? moment(value) : value;
  });
};

export const timeDifference = (current, previous, symbol = false) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations();
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = current - previous;

  if (elapsed < msPerMinute) {
    let second = Math.round(elapsed / 1000);
    if (second < 0) {
      second = 0;
    }
    return `${second} ${symbol ? t('secs_ago') : t('seconds_ago')}`;
  } else if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} ${
      symbol ? t('mins_ago') : t('minutes_ago')
    }`;
  } else if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} ${t('hours_ago')}`;
  } else if (elapsed < msPerMonth) {
    return `${Math.round(elapsed / msPerDay)} ${t('days_ago')}`;
  } else if (elapsed < msPerYear) {
    return `${Math.round(elapsed / msPerMonth)} ${t('months_ago')}`;
  } else {
    return `${Math.round(elapsed / msPerYear)} ${t('years_ago')}`;
  }
};

export const useGetTitleFromTime = (time, current) => {
  const t = useTranslations();
  time = moment(time).format('YYYY-MM-DD');
  current = moment(current).format('YYYY-MM-DD');

  const durationTime = moment.duration(moment(time).diff(moment(current)));
  const day = Math.floor(durationTime.asDays());

  if (day === 0) {
    return t('today');
  } else if (day === -1) {
    return t('yesterday');
  } else {
    return moment(time).format('DD/MM/YYYY');
  }
};

export const getDateData = (initialDate, max, min) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations();
  let dateData = [];
  let dateIndex = -1;
  const date = moment(min);
  const today = moment();

  while (date <= max) {
    const dateString = date.isSame(today, 'day')
      ? t('today')
      : date.format('ddd DD/MM');
    dateData.push({
      text: dateString,
      value: moment(date),
    });
    if (date.isSame(initialDate, 'day')) {
      dateIndex = dateData.length - 1;
    }
    date.add(1, 'days');
  }
  const indexInitialDate = dateIndex !== -1 ? dateIndex : 0;
  return [dateData, indexInitialDate];
};
