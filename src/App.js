import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import firebase from 'firebase';

import {Header, Button, Spinner} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  constructor(props) {
    super();
    firebase.initializeApp({
      apiKey: 'AIzaSyByoF9WC_4r6jM-oz23_7TDdB0FXcVYnhk',
      authDomain: 'auth-3cd61.firebaseapp.com',
      databaseURL: 'https://auth-3cd61.firebaseio.com',
      projectId: 'auth-3cd61',
      storageBucket: 'auth-3cd61.appspot.com',
      messagingSenderId: '30121305754',
      appId: '1:30121305754:web:d55ccc999fbee31ea56123',
    });
    this.state = {loggdIn: null};
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('User => ', user);
      user ? this.setState({loggdIn: true}) : this.setState({loggdIn: false});
    });
  }

  renderContent() {
    switch (this.state.loggdIn) {
      case true:
        return (
          <View style={styles.logoutButtonStyle}>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </View>
        );
      case false:
        return <LoginForm />;

      default:
        return (
          <View style={styles.spinnerContainer}>
            <Spinner />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    height: 50,
    marginVertical: 15,
  },
  logoutButtonStyle: {
    height: 50,
    marginTop: 5,
  },
});
export default App;
