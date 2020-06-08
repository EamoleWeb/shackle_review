import React, { useEffect, useCallback } from 'react';

import Amplify, { Auth } from 'aws-amplify';
import { ThemeProvider } from 'react-native-elements';
import * as RNLocalize from 'react-native-localize';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import Navigator from './navigators';
import awsconfig from './aws-exports';
import rootReducer from './slices';
import { setI18nConfig } from './translations';
import colors from './styling/colors';

import { APP_URL, COGNITO_OAUTH_DOMAIN } from 'react-native-dotenv';

const oauth = {
  domain: COGNITO_OAUTH_DOMAIN,
  scope: [
    'phone',
    'email',
    'profile',
    'openid',
    'aws.cognito.signin.user.admin'
  ],
  redirectSignIn: APP_URL,
  redirectSignOut: APP_URL,
  responseType: 'code'
};

Amplify.configure(awsconfig);

Auth.configure({
  oauth
});

const store = configureStore({ reducer: rootReducer });

const theme = {
  colors: {
    primary: colors.turquoise
  },
  Button: {
    type: 'solid',
    buttonStyle: {
      backgroundColor: colors.turquoise,
      borderRadius: 12,
      height: 44
    },
    titleStyle: {
      fontWeight: 'bold',
      fontSize: 12,
      color: colors.white
    }
  }
};

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = () => {
  const handleLocalizationChange = useCallback(() => {
    setI18nConfig()
      .then(() => this.forceUpdate())
      .catch(error => {
        console.error(error);
      });
  });

  useEffect(() => {
    setI18nConfig();

    RNLocalize.addEventListener('change', handleLocalizationChange);

    return RNLocalize.removeEventListener('change', handleLocalizationChange);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
