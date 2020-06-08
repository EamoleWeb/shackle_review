import _ from 'lodash';
import moment from 'moment';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Platform } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
//import TimeComponent from './TimeComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import services from '../../rezgo/service';
import { Colors } from '../../styling';
import ColoredHeader from '../Headers/ColoredHeader';
import H4 from '../Headers/H4';
import H5 from '../Headers/H5';
import CounterComponent from './CounterComponent';
import DateComponent from './DateComponent';

const fontFamily = Platform.OS === 'android' ? 'CircularStdBook' : 'CircularStd-Book';

const AvailabilityAccordion = (props) => {

  const {
    activity: {
      uid,
      com
    }

  } = props;

  //const [expanded, setExpanded] = useState(false);

  const [checkDate, setCheckDate ] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [total_adults, setAdults] = useState();
  const [total_childs, setChilds] = useState();
  const [total_seniors, setSeniors] = useState();
  const [total_price, setTotal ] = useState(0);

  const [minAdults, setMinAdults] = useState(null);
  const [minChildren, setMinChildren] = useState(null);
  const [minSeniors, setMinSeniors] = useState(null);

  const [available, setAvailable] = useState(false);
  const [maxAvailability, setMaxAvailability] = useState(10000);

  const checkAvailability = (data) => {
    if (!data.item) {
      setAvailable(false);
      setTotal(0);
    } else {
      const availability = (parseInt(data.item.date.availability) - (total_adults+total_childs+total_seniors));

      if (availability < 0) {
        setAvailable(false);
      } else {
        setAvailable(true);
      }

      setTotal(data.item.overall_total);
    }

  };

  const onPaymentConfirm = () => {

    if (total_adults<minAdults) {
      alert('!');
    } else if (total_childs<minChildren) {
      alert('!');
    } else if (total_seniors<minSeniors) {
      alert('Seniors');
    }
  };

  /* const _handlePress=() => {
    setExpanded(!expanded);
    if (expanded) {
      setIcon('chevron-down');
    } else {
      setIcon('chevron-up');
    }
  };*/

  const getDateToCheck = (date) => {

    setCheckDate(moment(date).format('YYYY-MM-DD'));

  };

  /*const getTimeToCheck = () => {
    // console.log('Time received from child ', start, ' ', end);
  };*/

  const getAdults = (adults) => {
    setAdults(adults);
  };

  const getChildren = (children) => {
    setChilds(children);
  };

  const getSeniors = (seniors) => {
    setSeniors(seniors);
  };

  useEffect(() => {

    services.getAvaiabilityByUIDandDate(uid, checkDate, total_adults, total_childs, total_seniors)
      .then(results => {

        checkAvailability(results.data);
      })
      .catch(error => {
        console.log(error);
      });

  }, [total_adults, total_childs, total_seniors]);

  const [countersLoading, setCountersLoading] =useState(false);

  const [options, setOptions] = useState(null);

  useEffect(() => {

    setSelectedOption(null);

    services.getByCom(com, checkDate)
      .then(results => {

        setOptions(results.data);

      })
      .catch(error => console.log(error));

  }, [checkDate]);

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {

    setCountersLoading(true);
    setAvailable(false);

    if (selectedOption) {

      setMinAdults(parseInt(selectedOption.adult_required));
      setMinChildren(parseInt(selectedOption.child_required));
      setMinSeniors(parseInt(selectedOption.senior_required));

      setAdults(parseInt(selectedOption.adult_required));
      setChilds(parseInt(selectedOption.child_required));
      setSeniors(parseInt(selectedOption.senior_required));

      services.getAvaiabilityByUIDandDate(selectedOption.uid, checkDate, selectedOption.adult_required, selectedOption.child_required, selectedOption.senior_required)
        .then(results => {
          checkAvailability(results.data);
          setCountersLoading(false);
        })
        .catch(error => {
          console.log(error);
        });

    }

  }, [selectedOption]);

  return (
    <View style={styles.container}>

      <View style={styles.header_container}>
        <View style={styles.title} >
          <ColoredHeader >CHECK AVAILABILITY</ColoredHeader>
        </View>
        {/*<View style={styles.chevron} >
            <Icon name={iconName} color={Colors.darkBlue} size={16}/>
        </View>*/}

      </View>

      <View style={styles.dates_container}>
        <View style={styles.datepicker_container}>
          <View>
            <DateComponent dateCallback ={getDateToCheck}/>
          </View>
          <View>
            {available?<Icon name={'calendar'} color={Colors.turquoise} size={15}/>:<Icon name={'check-circle'} color={Colors.turquoise} size={15}/> }
          </View>
        </View>

        {/*<View style={styles.timepicker_container}>
          <TimeComponent timeCallback = {getTimeToCheck}/>
        </View>*/}
      </View>
      {options && options.length>0 &&
      <View style={styles.dropdown_container}>
        <Dropdown
          selectedItemColor= {Colors.turquoise}
          itemTextStyle ={styles.item_text}
          baseColor={Colors.lightgray}
          textColor={Colors.turquoise}
          itemColor ={Colors.lightgray}
          renderAccessory={() => <Icon name={'chevron-down'} color={Colors.lightgray}/>}
          label ='Select an option'
          data = {options}
          valueExtractor ={({option}) => {
            return option;
          }}
          onChangeText ={(value, index, data) => {
            setSelectedOption(data[index]);
          }}
        />
      </View>
      }
      {selectedOption && countersLoading &&
      <ActivityIndicator color={Colors.turquoise} size='large'/>
      }
      {
        selectedOption && !countersLoading && (
          <View style={styles.counters_container}>
            {!_.isEmpty(selectedOption.adult_label) &&
           <><Divider style={styles.divider}/>
             <CounterComponent
               // key={parseInt(minAdults)}
               callback ={getAdults}
               title={selectedOption.adult_label}
               min={minAdults}
               max={maxAvailability}
             /></>}

            {!_.isEmpty(selectedOption.child_label) &&
            <><Divider style={styles.divider}/>
              <CounterComponent
                //  key={parseInt(minChildren)}
                callback ={getChildren}
                title={selectedOption.child_label}
                min={minChildren}
                max={maxAvailability}
              /></>}
            {!_.isEmpty(selectedOption.senior_label) &&
            <><Divider style={styles.divider}/>
              <CounterComponent
              // key={parseInt(minSeniors)}
                callback={getSeniors}
                title={selectedOption.senior_label}
                min={minSeniors}
                max={maxAvailability}
              /></>}

            <Divider style={styles.divider}/>
            <View style={styles.sum}>
              <View>
                <H5>Total</H5>
              </View>
              <View>
                <H4>£{total_price}</H4>
              </View>
            </View>
            <Button
              disabled={!available}
              title='CONFIRM BOOKING'
              onPress={() => onPaymentConfirm()}
            />
          </View>)
      }
    </View>
  );
};

export default AvailabilityAccordion;

AvailabilityAccordion.propTypes = {
  activity: propTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: 'white',
    zIndex: 5,
    alignContent: 'center',
    borderColor: 'black',
    shadowColor: '#0000000D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 3

  },
  header_container: {
    height: 77,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 32
  },
  title: {
    flex: 0.93,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  item_text: {
    fontFamily: fontFamily
  },
  dates_container: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
    height: 78
  },
  datepicker_container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: Colors.lightgray
  },
  /*timepicker_container: {
    flex: 1,
    alignContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: Colors.lightgray
  },*/
  counters_container: {
    marginHorizontal: 32,
    flex: 1,
    marginBottom: 20
  },
  dropdown_container: {
    marginHorizontal: 32
  },
  divider: {
    height: 2,
    backgroundColor: Colors.lightgray
  },
  sum: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 25,
    alignItems: 'center'
  }
});