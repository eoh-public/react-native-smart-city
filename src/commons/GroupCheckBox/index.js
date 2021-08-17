import React, { memo, useCallback, useState } from 'react';
import { TESTID } from '../../configs/Constants';
import CheckBox from './CheckBox';

const GroupCheckBox = memo(({ data, onSelect, multiple }) => {
  const [selectIndexes, setSelectIndexes] = useState([]);
  const _onSelect = useCallback(
    (index) => {
      const foundIndex = selectIndexes.indexOf(index);
      let newValue;
      if (foundIndex === -1) {
        if (multiple) {
          newValue = [...selectIndexes, index];
          setSelectIndexes(newValue);
        } else {
          newValue = [index];
          setSelectIndexes([index]);
        }
      } else {
        selectIndexes.splice(foundIndex, 1);
        newValue = [...selectIndexes];
      }
      if (multiple) {
        onSelect && onSelect(newValue.map((i) => data[i]));
      } else {
        onSelect && onSelect(data[index]);
      }

      setSelectIndexes(newValue);
    },
    [onSelect, data, multiple, selectIndexes]
  );
  return (
    <React.Fragment>
      {data.map((item, index) => {
        const select = selectIndexes.indexOf(index) !== -1;
        return (
          <CheckBox
            key={index.toString()}
            title={item.title}
            index={index}
            onSelect={_onSelect}
            select={select}
            source={item.source}
            description={item.description}
            testID={TESTID.GROUP_CHECKBOX_ITEM}
          />
        );
      })}
    </React.Fragment>
  );
});

export default GroupCheckBox;
