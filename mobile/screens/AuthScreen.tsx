import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmitHandler = () => {};

  const changeFormHandler = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const getMessage = () => {
    const status = isError ? 'Error: ' : 'Success: ';
    return status + message;
  };

  return (
    <ImageBackground
      source={require('../assets/images/background-image.jpg')}
      style={styles.image}
    >
      <View style={styles.card}>
        <Text style={styles.heading}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              placeholder='Email'
              autoCapitalize='none'
              onChangeText={setEmail}
            />
            {!isLogin && (
              <TextInput
                style={styles.input}
                placeholder='Name'
                onChangeText={setName}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={setPassword}
            />
            <Text
              style={[styles.message, { color: isError ? 'red' : 'green' }]}
            >
              {message ? getMessage() : null}
            </Text>
            <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonAlt}
              onPress={changeFormHandler}
            >
              <Text style={styles.buttonAltText}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  card: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    width: '80%',
    marginTop: '40%',
    borderRadius: 20,
    maxHeight: 380,
    paddingBottom: '30%',
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: '10%',
    marginTop: '5%',
    marginBottom: '30%',
    color: 'black',
  },

  form: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: '5%',
  },

  inputs: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
  },

  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingTop: 10,
    fontSize: 16,
    minHeight: 40,
  },

  message: {
    fontSize: 16,
    marginVertical: '5%',
  },

  button: {
    width: '80%',
    backgroundColor: 'black',
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },

  buttonAlt: {
    width: '80%',
    borderWidth: 1,
    height: 40,
    borderRadius: 50,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },

  buttonAltText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
});
