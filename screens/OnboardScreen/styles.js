import { StyleSheet } from 'react-native';
import colors from '../../styling/colors';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    flex: 3
  },
  paginationStyle: {
    padding: 0,
    marginBottom: -50,
    backgroundColor: 'white'
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    padding: 10
  },
  backButtonStyle: {
    backgroundColor: colors.backButtonGray
  },
  nextButtonStyle: {
    backgroundColor: colors.darkBlue
  },
  buttonStyle: {
    width: 150,
    height: 44,
    borderRadius: 8
  }
});