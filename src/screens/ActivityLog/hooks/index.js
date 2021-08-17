/* eslint-disable no-shadow */
import { useCallback, useState } from 'react';
import moment from 'moment';
import { groupBy } from 'lodash';
import { axiosGet } from '../../../utils/Apis/axios';
import API from '../../../configs/API';

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

let dataTemp = [];

export default (sensor) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [isCanLoadMore, setIsCanLoadMore] = useState(true);

  const getDataForList = useCallback((data) => {
    const data1 = data.map((i) => ({
      ...i,
      date: moment(i.created_at).format('DD/MM/YYYY'),
    }));
    const data2 = groupBy(data1, 'date');
    const result = Object.keys(data2).map((key) => ({
      date: key,
      data: data2[key],
    }));
    return result;
  }, []);

  const fetchData = async (page) => {
    setPage(page);
    if (page === 1) {
      setIsRefreshing(true);
    } else {
      if (!isCanLoadMore) {
        return;
      }
      setIsLoading(true);
    }
    const { success, data } = await axiosGet(API.SENSOR.ACTIVITY_LOG, {
      params: { id: sensor.id, page },
    });
    if (success && data) {
      const { results = [] } = data;
      if (page === 1) {
        dataTemp = results;
        setData(getDataForList(results));
      } else {
        dataTemp = dataTemp.concat(results);
        setData(getDataForList(dataTemp));
        setIsCanLoadMore(page < Math.ceil(data.count / 20));
      }
    }
    page === 1 ? setIsRefreshing(false) : setIsLoading(false);
  };

  const onRefresh = () => fetchData(1);

  const onLoadMore = () => fetchData(page + 1);

  return {
    data,
    isLoading,
    isRefreshing,
    onRefresh,
    onLoadMore,
  };
};
