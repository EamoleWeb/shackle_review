import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import groupInterests from '../utils/groupInterests';

const PROP_TYPES = {
  group: PropTypes.array.isRequired
};

const InterestsRow = ({group}) => {
  return (
    <View style={styles.interestsRow}>
      {
        group.map((item, key) => {
          return (
            <Text key={key} style={styles.interestsItem}>
              {item}
            </Text>
          );
        })
      }
    </View>
  );
};

const Interests = () => {
  const interests = [
    1, 2, 3, 4, 5, 6, 7, 8, 9
  ];

  const groupedInterests = groupInterests(interests);

  return (
    <View style={styles.interestsContainer}>
      {groupedInterests.map((group, index) => {
        return <InterestsRow key={index} group={group}/>;
      })}
    </View>
  );
};

InterestsRow.propTypes = PROP_TYPES;

export default Interests;

const styles = StyleSheet.create({
  interestsContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  interestsRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'powderblue',
    justifyContent: 'space-around'
  },
  interestsItem: {
    alignSelf: 'center'
  }
});
