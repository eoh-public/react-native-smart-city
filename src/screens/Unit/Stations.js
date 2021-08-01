import { View } from 'react-native';
import React, { memo } from 'react';

import { TESTID } from '../../configs/Constants';
import ShortDetailSubUnit from '../../commons/SubUnit/ShortDetail';

const Stations = memo(({ unit, isGGHomeConnected }) => {
  return (
    <>
      {!!unit.stations && unit.stations.length > 0 && (
        <View testID={TESTID.UNIT_DETAIL_STATION_LIST}>
          {unit.stations.map((station) => (
            <ShortDetailSubUnit
              unit={unit}
              station={station}
              key={`station-${station.id}`}
              isGGHomeConnected={isGGHomeConnected}
            />
          ))}
        </View>
      )}
    </>
  );
});
export default Stations;
