import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Colors } from '../styling';

const StatusBarCustom = () => {
  return (
    <View>
      <View style={styles.container} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: getStatusBarHeight(),
    backgroundColor: Colors.white,
    padding: 8
  }
});

export default StatusBarCustom;
