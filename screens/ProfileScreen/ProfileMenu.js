import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from 'react-native-paper';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import colors from '../../styling/colors';

const ProfileMenu = ({ items }) => {
  return (
    <Card style={styles.menuWrapper}>
      {
        items.map((item, i) => (
          <ListItem
            style={styles.menuItem}
            underlayColor='transparent'
            onPress={item.handler ? item.handler : noop}
            key={i}
            title={<Text style={styles.menuItemText}>{item.title}</Text>}
            leftIcon={{ name: item.icon }}
            bottomDivider={items.length - 1 !== i}
            chevron={{ color: colors.gray, size: 20 }}
          />
        ))
      }
    </Card>
  );
};
// #D7D9DA
const styles = StyleSheet.create({
  menuWrapper: {
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 12
  },
  menuItem: {
    height: 60,
    padding: 4
  },
  menuItemText: {
    fontSize: 16,
    color: colors.darkBlue
  }
});

ProfileMenu.propTypes = {
  items: PropTypes.array.isRequired
};

export default ProfileMenu;