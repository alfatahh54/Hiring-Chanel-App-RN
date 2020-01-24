import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
// import Form from '../components/Form';
import {StackActions, NavigationActions} from 'react-navigation';
import JWT from 'jwt-decode';
import {validationService} from '../public/validation/Service';
import {connect} from 'react-redux';
import {login} from '../public/redux/action/User';

class Login extends Component {
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
    this.getFormValidation();
    const {email, password} = this.state.inputs;
    const data = {
      email: email.value,
      password: password.value,
    };
    if (email.value && password.value) {
      try {
        await this.props.login(data);
        const token = this.props.token;
        const decode = JWT(token);
        const role = decode.role === 'Engineer' ? 'Engineer' : 'Company';
        Alert.alert(
          'Success',
          'Login Success!',
          [
            {
              text: 'Ok',
              onPress: () => {
                this.props.navigation.navigate('Home');
              },
            },
          ],
          {cencelable: false},
        );
      } catch (error) {
        const {messageError} = this.props.messageError;
        Alert.alert('Failed', messageError, [
          {
            text: 'Ok',
          },
        ]);
      }
    }
  }
  componentDidMount() {
    const {user, navigation} = this.props;
    // const role = user.role === 'Engineer' ? 'Company' : 'Engineer'
    if (user) {
      navigation.navigate('Home');
    }
  }
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
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Email"
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              keyboardType="email-address"
              onChangeText={value => {
                this.onInputChange({id: 'email', value});
              }}
              onSubmitEditing={() => this.password.focus()}
            />
            {this.renderError('email')}
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
            {this.renderError('password')}
          </View>
          <TouchableOpacity style={styles.button} onPress={this.submit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.registerText}>Dont have an account yet?</Text>
        <TouchableOpacity
          onPress={() => {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Register'})],
            });
            this.props.navigation.dispatch(resetAction);
          }}>
          <Text style={styles.registerButton}> Register </Text>
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
    justifyContent: 'space-around',
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
  token: state.user.items.token,
  isLoading: state.user.isLoading,
  isError: state.user.isError,
  messageError: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
