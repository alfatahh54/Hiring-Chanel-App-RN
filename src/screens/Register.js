import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Picker,
} from 'react-native';
// import Form from '../components/Form';
import {StackActions, NavigationActions} from 'react-navigation';
import {validationService} from '../public/validation/Service';
import {connect} from 'react-redux';
import {register} from '../public/redux/action/User';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      inputs: {
        email: {
          type: 'email',
          value: '',
        },
        password: {
          type: 'password',
          value: '',
        },
        role: {
          type: 'role',
          value: '',
        },
      },

      emailError: '',
      passwordError: '',
      loading: false,
      error: false,
    };
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.submit = this.submit.bind(this);
  }
  async submit() {
    this.setState({
      loading: true,
    });
    this.getFormValidation();
    const {email, password, role} = this.state.inputs;
    const data = {
      email: email.value,
      password: password.value,
      role: role.value,
    };
    if (email.value && password.value.length >= 5 && role.value) {
      try {
        await this.props.register(data);
        Alert.alert(
          'Success',
          'Register Success!',
          [
            {
              text: 'Ok',
              onPress: () => {
                this.props.navigation.navigate('Login');
              },
            },
          ],
          {cencelable: false},
        );
      } catch (error) {
        const {messageError} = this.props;
        Alert.alert('Failed', messageError, [
          {
            text: 'Ok',
            onPress: () => {
              this.email.focus();
            },
          },
        ]);
      }
    }
  }
  login = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Login'})],
    });
    this.props.navigation.dispatch(resetAction);
  };
  renderError(id) {
    const {inputs} = this.state;

    if (inputs[id].errorLabel) {
      return <Text>{inputs[id].errorLabel}</Text>;
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerForm}>
          <View>
            <TextInput
              style={styles.inputBox}
              ref={input => (this.email = input)}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Email"
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              returnKeyType="next"
              onChangeText={value => {
                this.onInputChange({id: 'email', value});
              }}
              onSubmitEditing={() => this.password.focus()}
            />
            <Text>{this.renderError('email')}</Text>
          </View>
          <View>
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Password"
              returnKeyType="go"
              secureTextEntry={true}
              placeholderTextColor="#ffffff"
              ref={input => (this.password = input)}
              onChangeText={value => {
                this.onInputChange({id: 'password', value});
              }}
              onSubmitEditing={this.submit}
            />
            <Text>{this.renderError('password')}</Text>
          </View>
          <View>
            <Picker
              mode="dropdown"
              style={styles.inputBox}
              ref={value => {
                this.role = value;
              }}
              selectedValue={this.state.inputs.role.value}
              onValueChange={(value, index) => {
                this.onInputChange({id: 'role', value});
              }}>
              <Picker.Item label="Choose role" />
              <Picker.Item label="Engineer" value="Engineer" />
              <Picker.Item label="Company" value="Company" />
            </Picker>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.submit}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.registerText}>have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Login'})],
            });
            this.props.navigation.dispatch(resetAction);
          }}>
          <Text style={styles.registerButton}> Login </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },

  registerButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  containerForm: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },

  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  isError: state.user.isError,
  messageError: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(register(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
