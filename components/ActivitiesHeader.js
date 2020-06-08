import propTypes from 'prop-types';
import React, {useRef} from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { Colors } from '../styling';

import { H2 } from '../components/Headers';
import ColoredHeader from '../components/Headers/ColoredHeader';
import Subtitle from '../components/Headers/Subtitle';
import { translate } from '../translations';
import {useNavigation} from '@react-navigation/native';

const PROP_TYPES = {
  coloredHeader: propTypes.string.isRequired,
  subtitle: propTypes.string.isRequired,
  backgroundImage: propTypes.number.isRequired,
  search_placeholder: propTypes.string.isRequired
};

const ActivitiesHeader = (props) => {

  const {
    search_placeholder
  } = props;

  const navigation = useNavigation();

  const searchRef = useRef();

  const navigateToSearchResults = () => {
    if (searchRef.current.root._lastNativeText != null || '') {
      const search_term = searchRef.current.root._lastNativeText;
      navigation.navigate('SearchResults', { search_term});
    }
  };

  return (
    <ImageBackground
      source={props.backgroundImage}
      style={styles.headerBackground}
      imageStyle={styles.image_style}
    >
      <View style={styles.inner_container}>
        <ColoredHeader>{props.coloredHeader}</ColoredHeader>
        <H2 style={styles.header_text}>
          {translate('Let\'s start exploring')}
        </H2>
        <Subtitle style={styles.subtitle}>
          {props.subtitle}
        </Subtitle>

        <Searchbar
          ref={searchRef}
          placeholder = {search_placeholder}
          style={styles.search_input}
          inputStyle={styles.search_bar_container}
          //onEndEditing={() => navigateToSearchResults()}
          onSubmitEditing={() => navigateToSearchResults()}
        />
      </View>
      <View style={styles.header_overlay} />
    </ImageBackground>
  );
};

ActivitiesHeader.propTypes = PROP_TYPES;

export default ActivitiesHeader;

const styles = StyleSheet.create(
  {
    headerBackground: {
      width: '100%',
      height: '100%'
    },
    inner_container: {
      marginLeft: 32,
      marginTop: 43,
      marginRight: 52,
      zIndex: 2
    },
    header_text: {
      marginTop: 20,
      marginRight: 38,
      color: Colors.white
    },
    header_overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: Colors.darkBlue,
      opacity: 0.85,
      zIndex: 0,
      borderBottomRightRadius: 50
    },
    subtitle: {
      marginTop: 20
    },
    search_input: {
      borderRadius: 12,
      backgroundColor: Colors.white,
      marginBottom: 35,
      marginTop: 30
    },
    search_bar_container: {
      backgroundColor: 'transparent',
      paddingLeft: 0
    },
    image_style: {
      borderBottomRightRadius: 50
    }
  }
);