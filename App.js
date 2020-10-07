import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

const PUSH_REGISTRATION_ENDPOINT = 'http://e7be3ad3862d.ngrok.io/token';
const MESSAGE_ENPOINT = 'http://e7be3ad3862d.ngrok.io/message';

export default function App() {

  const [state, setState] = useState({
    notification: null,
    messageText: ''
  });

  const registerForPushNotificationsAsync = async () => {
    console.log('111');
    const { status } = await Premissions.askAsync(Permissions.NOTIFICATIONS);

    console.log('222');
    if (status !== 'granted') {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();

    return axios.post(PUSH_REGISTRATION_ENDPOINT, {
      token: {
        value: token
      },
      user: {
        username: 'sunny',
        name: 'pushapp'
      }
    })

    const notificationSubscription = Notifications.addListener(handleNotification);
  }

  const handleNotification = (notification) => {
    setState({ notification });
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleChangeText = (text) => {
    setState({ messageText: text });
  }

  const sendMessage = async () => {
    axios.post(MESSAGE_ENPOINT, {
      message: state.messageText
    });

    setState({ messageText: '' });
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={state.messageText}
        onChangeText={handleNotification}
        style={styles.textInput}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={sendMessage}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      
      {/* {state.notification ? renderNotification() : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 300,
    height: 50,
    backgroundColor: 'silver'
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  buttonText: {
    color: 'gray'
  }
});