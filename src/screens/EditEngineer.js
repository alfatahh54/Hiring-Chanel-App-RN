import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Text,
  Image,
  Alert,
} from 'native-base';
import {editEngineer, fetchEngineer} from '../public/redux/action/Engineer';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

class EditEngineer extends Component {
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
      srcImg: '',
    };
  }
  componentDidMount = () => {
    const id = this.props.userID;
    const keyword = `?search=${id}`;
    this.props.fetch(keyword);
    if (this.props.engineer.engineer.length) {
      let d = new Date(this.props.engineer.engineer[0].date_of_birth),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
      const date = [year, month, day].join('-');
      this.setState({
        name: this.props.engineer.engineer[0].name,
        location: this.props.engineer.engineer[0].location,
        skill: this.props.engineer.engineer[0].skill,
        description: this.props.engineer.engineer[0].description,
        date_of_birth: date,
        showcase: this.props.engineer.engineer[0].showcase,
        salary: this.props.engineer.engineer[0].salary,
        email: this.props.engineer.engineer[0].email,
      });
    }
  };
  handleChoosePhoto = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert.alert(response.customButton);
      } else {
        let source = response;
        this.setState({
          srcImg: source.uri,
          showcase: source,
        });
      }
    });
  };
  formSubmit = () => {
    const id = this.props.userID;
    let d = new Date(this.state.date_of_birth),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    const date = [year, month, day].join('-');
    this.setState({date_of_birth: date});
    let data = new FormData();
    data.append('name', this.state.name);
    data.append('location', this.state.location);
    data.append('skill', this.state.skill);
    data.append('description', this.state.description);
    data.append('date_of_birth', date);
    data.append('salary', this.state.salary);
    data.append('showcase', {
      uri: this.state.srcImg,
      type: this.state.showcase.fileType,
      name: this.state.showcase.fileName,
    });
    this.props.editEngineer(id, data);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Content>
        <Form style={styles.formOuter}>
          <Item floatingLabel style={styles.formInput}>
            <Label>Name</Label>
            <Input
              onChangeText={name => this.setState({name})}
              value={this.state.name}
            />
          </Item>
          <Item floatingLabel style={styles.formInput}>
            <Label>Description</Label>
            <Input
              onChangeText={description => this.setState({description})}
              value={this.state.description}
            />
          </Item>
          <Item floatingLabel style={styles.formInput}>
            <Label>Skill</Label>
            <Input
              onChangeText={skill => this.setState({skill})}
              value={this.state.skill}
            />
          </Item>
          <Item floatingLabel style={styles.formInput}>
            <Label>Location</Label>
            <Input
              onChangeText={location => this.setState({location})}
              value={this.state.location}
            />
          </Item>
          <Item floatingLabel style={styles.formInput}>
            <Label>Salary</Label>
            <Input
              onChangeText={salary => this.setState({salary})}
              value={this.state.salary}
            />
          </Item>
          <Item floatingLabel style={styles.formInput}>
            <Label>Birthday</Label>
            <Input
              onChangeText={date_of_birth => this.setState({date_of_birth})}
              value={this.state.date_of_birth}
            />
          </Item>
          <Button onPress={this.handleChoosePhoto()}>
            <Text>Pilih Foto</Text>
          </Button>
          {/* <Image source={{uri: this.state.srcImg}} /> */}
          <Button
            block
            primary
            iconLeft
            style={styles.submitBtn}
            onPress={() => {
              this.formSubmit();
            }}>
            <Icon name="checkmark-circle" />
            <Text>Update</Text>
          </Button>
        </Form>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  formOuter: {
    flex: 1,
    padding: 8,
  },
  formInput: {
    marginLeft: 0,
  },
  submitBtn: {
    marginTop: 20,
  },
});
const mapStateToProps = state => ({
  userID: state.user.items.data.id,
  engineer: state.engineer,
});

const mapDispatchToProps = dispatch => ({
  fetch: keyword => dispatch(fetchEngineer(keyword)),
  editEngineer: (id, data) => dispatch(editEngineer(id, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEngineer);
