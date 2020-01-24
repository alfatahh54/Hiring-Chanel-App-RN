import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchEngineer} from '../public/redux/action/Engineer';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      location: '',
      skill: '',
      description: '',
      date_of_birth: '',
      showcase: null,
      salary: '',
      email: '',
    };
  }
  componentDidMount = () => {
    const id = this.props.userID;
    const keyword = `?search=${id}`;
    try {
      this.props.fetch(keyword);
      for (let i = 0; i < this.props.engineer.engineer.length; i++) {
        if (this.props.engineer.engineer[i].id === id) {
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
          let d = new Date(this.props.engineer.engineer[i].date_of_birth),
            month = '' + months[d.getMonth()],
            day = '' + d.getDate(),
            year = d.getFullYear();
          const date = [day, month, year].join(' ');
          this.setState({
            name: this.props.engineer.engineer[i].name,
            location: this.props.engineer.engineer[i].location,
            skill: this.props.engineer.engineer[i].skill,
            description: this.props.engineer.engineer[i].description,
            date_of_birth: date,
            showcase: this.props.engineer.engineer[i].showcase,
            salary: this.props.engineer.engineer[i].salary,
            email: this.props.engineer.engineer[i].email,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <ScrollView>
        <Image
          style={styles.image}
          source={{
            uri: this.state.showcase
              ? this.state.showcase.replace('localhost', '54.165.175.40')
              : 'https://bootdey.com/img/Content/avatar/avatar6.png',
          }}
        />
        <View style={styles.header}>
          <View style={styles.row}>
            <View style={styles.posterContainer}>
              <Image
                style={styles.poster}
                source={{
                  uri: this.state.showcase
                    ? this.state.showcase.replace('localhost', '54.165.175.40')
                    : 'https://bootdey.com/img/Content/avatar/avatar6.png',
                }}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {this.state.name}
              </Text>
            </View>
          </View>
          <Text style={styles.subHeader}>Skill:</Text>
          <Text style={styles.summary}>{this.state.skill}</Text>
          <Text style={styles.subHeader}>Description:</Text>
          <Text style={styles.summary}>{this.state.description}</Text>
          <Text style={styles.subHeader}>Birthday:</Text>
          <Text style={styles.summary}>{this.state.date_of_birth}</Text>
          <Text style={styles.subHeader}>Expected Salary:</Text>
          <Text style={styles.summary}>{this.state.salary}</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.props.navigation.navigate('EditEngineer', {
                id: this.props.userID,
                showcase: this.state.showcase
                  ? this.state.showcase.replace('localhost', '54.165.175.40')
                  : undefined,
                name: this.state.name,
                skill: this.state.skill,
                date_of_birth: this.state.date_of_birth,
                description: this.state.description,
                location: this.state.location,
                salary: this.state.salary,
              });
            }}>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

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
    backgroundColor: '#FFBB27',
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  genreText: {paddingHorizontal: 5, color: '#FFF'},
});

const mapStateToProps = state => ({
  userID: state.user.items.data.id,
  engineer: state.engineer,
});
const mapDispatchToProps = dispatch => ({
  fetch: keyword => dispatch(fetchEngineer(keyword)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
