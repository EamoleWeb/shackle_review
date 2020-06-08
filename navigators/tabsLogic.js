import React, { useCallback, useState } from 'react';
import sum from 'lodash/sum';
import get from 'lodash/get';

import TabIndicator from '../components/Navigator/TabIndicator';

const logic = (currentRoute, initRoute = null) => {
  let routeIndex = 0;

  if (initRoute && initRoute.initRouteName) {
    const routeName = get(currentRoute, 'params.initialRoute');
    if (routeName === initRoute.initRouteName) {
      routeIndex = initRoute.initIndex;
    }
  }
  const [index, setIndex] = useState(routeIndex);

  const renderIndicator = useCallback(
    ({getTabWidth}) => {
      const tabWidth = sum([...Array(index).keys()].map(i => getTabWidth(i)));

      return (
        <TabIndicator
          width={getTabWidth(index)}
          tabWidth={tabWidth}
          index={index}
        />
      );
    },
    [index]
  );

  return {
    index,
    setIndex,
    renderIndicator
  };
};

export default logic;