import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { watchMultiConfigs } from '../../../iot/Monitor';
import { useConfigGlobalState } from '../../../iot/states';
import OnOffButtonTemplate from './OnOffButtonTemplate';
import OnOffSimpleTemplate from './OnOffSimpleTemplate';

const getComponent = (template) => {
  switch (template) {
    case 'on_off_button_action_template': // todo refactor later with backend
      return OnOffButtonTemplate;
    case 'OnOffSimpleActionTemplate':
      return OnOffSimpleTemplate;
    default:
      return () => <></>;
  }
};

const OnOffTemplate = memo(({ actionGroup, doAction, sensor }) => {
  const { configuration } = actionGroup;
  const [isOn, setIsOn] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [configValues, _] = useConfigGlobalState('configValues');

  const triggerAction = useCallback(() => {
    if (isOn) {
      doAction(configuration.action_off_data);
    } else {
      doAction(configuration.action_on_data);
    }
    if (sensor.is_managed_by_backend) {
      configuration.config && watchMultiConfigs([configuration.config]);
    }
  }, [configuration, doAction, isOn, sensor.is_managed_by_backend]);

  useEffect(() => {
    const { is_on_value, config } = configuration;
    const configValue = configValues[config];

    if (is_on_value && is_on_value.length > 0) {
      setIsOn(is_on_value.includes(configValue));
      return;
    }
    setIsOn(configValue);
  }, [
    configuration.config,
    configValues,
    configuration.is_on_value,
    configuration,
  ]);

  useEffect(() => {
    if (sensor.is_managed_by_backend) {
      watchMultiConfigs([configuration.config]);
    }
  }, [sensor.is_managed_by_backend, configuration.config]);

  const Component = useMemo(() => {
    return getComponent(actionGroup.template);
  }, [actionGroup]);

  return (
    <>
      <Component
        isOn={isOn}
        triggerAction={triggerAction}
        actionGroup={actionGroup}
      />
    </>
  );
});

export default OnOffTemplate;
