import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Thumbnail, Left, Body, ListItem} from 'native-base';
import {withNavigation} from 'react-navigation';

const Series = props => {
  const {item, navigation} = props;
  return (
    <ListItem
      thumbnail
      onPress={() => {
        // here we navigate and pass props the components got it
        navigation.navigate('SingleSeries', {
          seriesID: item.id,
          image: item.showcase
            ? item.showcase.replace('localhost', '54.165.175.40')
            : undefined,
          title: item.name,
          summary: item.skill,
          allProps: item,
        });
      }}>
      <Left>
        <Thumbnail
          square
          source={{
            uri: item.showcase
              ? item.showcase.replace('localhost', '54.165.175.40')
              : 'https://via.placeholder.com/210x295.png?text=No+Image',
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Text style={styles.title}>{item.name}</Text>
        <Text note numberOfLines={1}>
          {item.skill ? item.skill : ''}
        </Text>
      </Body>
    </ListItem>
  );
};

export default withNavigation(Series);

const styles = StyleSheet.create({
  body: {marginRight: 20},
  title: {fontWeight: '600', fontSize: 17, marginBottom: 5},
});
