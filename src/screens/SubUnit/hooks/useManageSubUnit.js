import { useCallback, useState } from 'react';
import { axiosGet } from '../../../utils/Apis/axios';
import API from '../../../configs/API';

export default (unit) => {
  const [station, setStation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setRefresh] = useState(false);

  const fetchData = useCallback(async (unit) => {
    setIsLoading(true);
    const { success, data } = await axiosGet(
      API.UNIT.UNIT_DETAIL(unit?.id),
      {},
      true
    );
    if (success) {
      setStation(data?.stations);
    }
    setIsLoading(false);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    await fetchData(unit);
    setRefresh(false);
  }, [unit, fetchData]);

  return {
    station,
    isRefresh,
    onRefresh,
    isLoading,
  };
};
