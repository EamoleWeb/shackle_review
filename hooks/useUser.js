import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

export default (defaultUser = {}) => {
  const [ user, setUser ] = useState(defaultUser);

  useEffect(() => {
    Auth.currentAuthenticatedUser({
      // Optional, By default is false. If set to true, this call will send
      // a request to Cognito to get the latest user data
      bypassCache: true
    }).then(data => {
      setUser(data.attributes);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return user;
};
