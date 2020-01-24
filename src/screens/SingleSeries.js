import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

const SingleSeries = props => {
  const {navigation} = props;
  // we get the props from navigation and set default value 0
  // const seriesID = navigation.getParam('seriesID', 0);
  const image = navigation.getParam(
    'image',
    'https://via.placeholder.com/210x295.png?text=No+Image',
  );
  const title = navigation.getParam('title', '-');
  const summary = navigation.getParam('summary', '-');
  const series = navigation.getParam('allProps', {});
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let d = new Date(series.date_of_birth),
    month = '' + months[d.getMonth()],
    day = '' + d.getDate(),
    year = d.getFullYear();
  const date = [day, month, year].join(' ');

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: image}} />
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.posterContainer}>
            <Image style={styles.poster} source={{uri: image}} />
          </View>
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
          </View>
        </View>
        <Text style={styles.subHeader}>Skill:</Text>
        <Text style={styles.summary}>{summary}</Text>
        <Text style={styles.subHeader}>Description:</Text>
        <Text style={styles.summary}>{series.description}</Text>
        <Text style={styles.subHeader}>Birthday:</Text>
        <Text style={styles.summary}>{date}</Text>
        <Text style={styles.subHeader}>Expected Salary:</Text>
        <Text style={styles.summary}>{series.salary}</Text>
      </View>
    </ScrollView>
  );
};

export default SingleSeries;

const styles = StyleSheet.create({
  image: {
    height: 350,
    resizeMode: 'cover',
  },

  header: {
    marginHorizontal: 20,
    top: -50,
  },
  row: {flexDirection: 'row'},
  poster: {
    width: 126,
    height: 177,
    top: -40,
    borderRadius: 10,
  },
  posterContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  info: {
    marginLeft: 20,
    marginTop: 50,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textType: {
    fontWeight: '400',
    color: '#B4B9C5',
    marginBottom: 5,
  },
  subHeader: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#B4B9C5',
    marginTop: 20,
    marginBottom: 5,
  },
  summary: {lineHeight: 25},
  genresContainer: {
    marginRight: 5,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
  },
  genreText: {paddingHorizontal: 5, color: '#FFF'},
});
