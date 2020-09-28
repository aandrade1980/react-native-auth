import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import firebase from 'firebase';

import {Button, Card, CardSection, Input, Spinner} from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: null,
    isLoading: false,
  };

  onButtonPress() {
    const {email, password} = this.state;

    this.setState({error: null, isLoading: true});

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch((error) => this.onLoginFail(error.message));
      });
  }

  onLoginSuccess() {
    this.setState({error: null, isLoading: false, email: '', password: ''});
  }

  onLoginFail(errorMessage) {
    this.setState({error: errorMessage, isLoading: false});
  }

  onEmailChangeText(email) {
    this.setState({email, error: null});
  }

  renderButton() {
    if (this.state.isLoading) {
      return <Spinner />;
    }

    return <Button onPress={this.onButtonPress.bind(this)}>Log In</Button>;
  }

  render() {
    return (
      <>
        <Card>
          <CardSection>
            <Input
              label="Email:"
              value={this.state.email}
              onChangeText={(email) => this.onEmailChangeText(email)}
              placeholder="user@gmail.com"
            />
          </CardSection>
          <CardSection>
            <Input
              placeholder="password"
              label="Password:"
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
              secureTextEntry
            />
          </CardSection>

          <CardSection>{this.renderButton()}</CardSection>
        </Card>
        {this.state.error ? (
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    color: 'red',
    fontSize: 18,
    alignSelf: 'center',
    paddingTop: 5,
    paddingLeft: 5,
  },
});
export default LoginForm;
