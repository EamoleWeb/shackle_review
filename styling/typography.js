import { Platform, StyleSheet } from 'react-native';
import Colors from './colors';

const fontFamily = Platform.OS === 'android' ? 'CircularStdBook' : 'CircularStd-Book';

const TEXT_BASE = {
  fontFamily
};

const TEXT_BASE_BOLD = {
  fontFamily,
  fontWeight: 'bold'
};

const Typography = {
  base: TEXT_BASE,
  h0: {
    fontSize: 38,
    ...TEXT_BASE
  },
  h1: {
    fontSize: 34,
    ...TEXT_BASE
  },
  h2: {
    fontSize: 30,
    ...TEXT_BASE
  },
  h3: {
    fontSize: 26,
    ...TEXT_BASE
  },
  h4: {
    fontSize: 22,
    ...TEXT_BASE
  },
  h5: {
    fontSize: 18,
    ...TEXT_BASE
  },
  label: {
    fontSize: 11,
    color: Colors.turquoise,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.8,
    ...TEXT_BASE
  },
  coloredHeader: {
    fontSize: 13,
    color: Colors.turquoise,
    ...TEXT_BASE_BOLD
  },
  footnote: {
    fontSize: 12,
    color: Colors.gray,
    opacity: 0.60,
    ...TEXT_BASE
  },
  paragraph: {
    fontSize: 13,
    color: Colors.gray,
    ...TEXT_BASE
  }
};

export default StyleSheet.create(Typography);
