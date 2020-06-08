import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../styling';
import { Subtitle } from '../Headers';
import H5 from '../Headers/H5';
const CategoryList = ({ data }) => {

  const navigation = useNavigation();

  const searchByCategory = (tag) => {
    navigation.navigate('SearchResults', { tag });
  };

  const renderItem =(item) => {

    let style= {
      marginBottom: 10,
      borderRadius: 12,
      height: 110,
      justifyContent: 'flex-end'
      // opacity: 0.4
    };

    switch (data.indexOf(item)%4) {
      case 0:
      //  style.backgroundColor ='lightgreen';
        style.flexGrow =0.7;
        break;

      case 1:
      //  style.backgroundColor ='powderblue';
        style.flexGrow=0.3;
        style.marginLeft=10;
        break;

      case 2:
        //style.backgroundColor ='lightgreen';
        style.flexGrow =0.3;
        break;

      case 3:
        // style.backgroundColor ='powderblue';
        style.flexGrow=0.7;
        style.marginLeft=10;
        break;

      default:
      // style={margin: 2.5, borderRadius: 12, backgroundColor: 'magenda', flexGrow: 1, height: 110};
        break;

    }

    if (data.indexOf(item) === data.length-1) {
      // style.backgroundColor='lightyellow';
      style.flexGrow=1;
    }

    return (

      <TouchableOpacity
        style={style}
        onPress={() => searchByCategory(item.interest_name) }
      >
        <ImageBackground
          source={{uri: item.image}}
          style={styles.image_background}
          imageStyle={styles.image}
        >
          <Subtitle style={styles.text}>{item.interest_name}</Subtitle>
          <View style={styles.image_overlay}/>
        </ImageBackground>
      </TouchableOpacity>

    );
  };

  return (
    <>
      <FlatList
        ListHeaderComponent= {() => <View style={styles.title}>
          <H5>Explore By Category</H5>
        </View>}
        numColumns={2}
        data={data}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => item.id}
      />
    </>
  );
};

CategoryList.propTypes = {
  data: PropTypes.array.isRequired
};

export default CategoryList;

const styles= StyleSheet.create({
  text: {
    marginBottom: 15,
    marginLeft: 15,
    opacity: 1,
    zIndex: 1
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    justifyContent: 'flex-end',
    opacity: 0.4,
    zIndex: 0
  },
  image_background: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    justifyContent: 'flex-end'
  },
  image_overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.darkBlue,
    opacity: 0.60,
    zIndex: 0,
    borderRadius: 12
  },
  title: {
    marginBottom: 30
  }
});