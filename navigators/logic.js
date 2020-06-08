import { useState, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { Hub, Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { setCurrentPosition } from '../slices/position';

export default () => {
  const [ user, setUser ] = useState(null);
  const [ , setCustomState ] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {

    Geolocation.watchPosition(position => {
      dispatch(setCurrentPosition(position));
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
  });

  useEffect(() => {
    Hub.listen('auth', ({payload: {event, data}}) => {
      switch (event) {
        case 'signIn':
          Auth.currentSession()
            .then(tokens => {
              const user = tokens.idToken.payload;

              setUser({user});
            })
            .catch(() => {
              console.log('Hub Not signed in');
            });

          // setUser(data);
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'customOAuthState':
          setCustomState(data);
      }
    });
  }, []);

  useEffect(() => {
    Auth.currentSession()
      .then(tokens => {
        const user = tokens.idToken.payload;

        setUser({user});
      })
      .catch(() => console.log('Hub Not signed in'));
  }, []);

  return {
    user
  };
};