import React from 'react';
import { StyleSheet, View, ActivityIndicator, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { loadingSelector } from '../slices/loading';

const LoadingScreen = () => {

  const {
    loading
  } = useSelector(loadingSelector);

  return (

    <Modal
      visible={loading}
      animationType="slide"
    >
      <View style={styles.container}>
        <ActivityIndicator size="large"/>
      </View>

    </Modal>

  );

};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
});