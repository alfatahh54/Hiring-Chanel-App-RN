import React, {Component} from 'react';
import {
  Alert,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Form, Item, Label, Input} from 'native-base';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchEngineer} from '../public/redux/action/Engineer';
import SeriesCard from '../components/SeriesCard';

class Engineer extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      result: [],
      loading: false,
      error: false,
    };

    // trigger real search after 1k miliseconds/1 seconds
    this.search = _.debounce(this.search, 1000);
  }
  getAll = () => {
    const keyword = '?page=1';
    this.props.fetch(keyword);
    this.setState({
      result: this.props.engineer.engineer,
      loading: false,
      error: false,
    });
  };
  componentDidMount() {
    this.getAll();
  }

  onSearch = searchKey => {
    if (searchKey) {
      this.setState({loading: true, search: searchKey});
      this.search(searchKey);
    }
    this.setState({result: []});
  };

  search = async searchKey => {
    if (searchKey) {
      try {
        const keyword = '?page=1&search=' + searchKey;
        await this.props.fetch(keyword);
        this.setState({
          result: this.props.engineer.engineer,
          loading: false,
          error: false,
        });
      } catch (err) {
        this.setState({loading: false, error: true});
        return Alert.alert(
          'Error',
          'Error connecting to the server, please try again later',
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
      }
    }
  };

  render() {
    const {loading, error, search, result} = this.state;

    return (
      <View>
        <Form>
          <Item floatingLabel>
            <Label>Search here..</Label>
            <Input
              onChangeText={text => {
                this.onSearch(text);
              }}
            />
          </Item>
        </Form>
        <View style={styles.seriesContainer}>
          {loading ? (
            <ActivityIndicator color="rgba(255, 255,255,0.2)" size="large" />
          ) : error ? (
            <Text style={styles.text}>Error, please try again</Text>
          ) : result.length < 1 ? (
            <Text style={styles.text}>
              No series found with keyword "{search}", please try another
              keyword
            </Text>
          ) : (
            <FlatList
              data={result}
              renderItem={({item}) => <SeriesCard item={item} />}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  seriesContainer: {
    marginTop: 20,
  },
  text: {
    fontSize: 20,
  },
});
const mapStateToProps = state => ({
  engineer: state.engineer,
});

const mapDispatchToProps = dispatch => ({
  fetch: keyword => dispatch(fetchEngineer(keyword)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Engineer);
