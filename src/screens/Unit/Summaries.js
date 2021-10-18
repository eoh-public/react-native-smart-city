import React, { memo, useCallback, useEffect, useState } from 'react';
import { AppState, ScrollView } from 'react-native';
import SummaryItem from '../../commons/SummaryItem';
import Routes from '../../utils/Route';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { axiosGet } from '../../utils/Apis/axios';
import { API } from '../../configs';

const Summaries = memo(({ unit }) => {
  const [unitSummaries, setUnitSummaries] = useState([]);
  const [appState, setAppState] = useState(AppState.currentState);
  // eslint-disable-next-line no-unused-vars
  const [localState, _] = useState({});
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const fetchUnitSummary = useCallback(async () => {
    if (!unit.id) {
      return;
    }

    const { success, data } = await axiosGet(API.UNIT.UNIT_SUMMARY(unit.id));
    if (success && data.length) {
      setUnitSummaries(data);
    }
    return success && data.length;
  }, [setUnitSummaries, unit.id]);

  const goToSummary = useCallback(
    (summary) => {
      navigation.navigate(Routes.UnitSummary, {
        summary,
        unit,
      });
    },
    [navigation, unit]
  );

  const continuousFetchSummary = useCallback(async () => {
    if (localState.timeoutId) {
      clearTimeout(localState.timeoutId);
      localState.timeoutId = 0;
    }

    const success = await fetchUnitSummary();
    if (success) {
      localState.timeoutId = setTimeout(() => {
        continuousFetchSummary();
      }, 5000);
    }
  }, [localState, fetchUnitSummary]);

  const handleAppStateChange = useCallback(
    (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        fetchUnitSummary();
      }
      setAppState(nextAppState);
    },
    [appState, fetchUnitSummary]
  );

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    continuousFetchSummary();
    return () => {
      clearTimeout(localState.timeoutId);
      localState.timeoutId = 0;
    };
  }, [localState, continuousFetchSummary, isFocused]);

  return (
    <>
      {!unitSummaries || !unitSummaries.length ? null : (
        <ScrollView horizontal={true}>
          {unitSummaries.map((item, index) => (
            <SummaryItem key={index} item={item} goToSummary={goToSummary} />
          ))}
        </ScrollView>
      )}
    </>
  );
});

export default Summaries;
