import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  TextInput,
} from 'react-native';
//import img from '../assets/Image/login.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import ListDerang from './ListDerang';

//import Input from 'react-native-input-style'
//

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }
  submitt = () => {
    if (this.state.login === '' || this.state.password === '') {
      Alert.alert('Error', 'veuillez remplir tous les champs');
    } else {
      fetch('http://172.20.10.11:5000/compte/login/mobile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.login,
          password: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.compte === '') {
            Alert.alert(responseJson.message);
          } else {
            this.props.history.push('/ListDerang', {
              compte: responseJson.compte,
            });
          }
        });
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/Image/login.png')}
        style={styles.image}>
        <View style={styles.top}>
          <Text style={styles.text}>Login</Text>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Login"
              placeholderTextColor="#E2F7F3"
              onChangeText={(text) => this.setState({login: text})}
            />
            <Icon
              name="user"
              color="white"
              size={24}
              style={styles.Iconstyle}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="mot de passe"
              secureTextEntry={true}
              placeholderTextColor="#E2F7F3"
              onChangeText={(text) => this.setState({password: text})}
            />
            <Icon
              name="lock"
              color="white"
              size={24}
              style={styles.Iconstyle}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => this.submitt()}>
            <Text style={styles.txtBtn}>CONNECTER</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  top: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
    // position :'relative',
    //top:40,
  },
  input: {
    borderWidth: 3,
    borderColor: 'transparent',
    height: 40,
    borderRadius: 5,
    width: 250,
    borderBottomColor: 'white',
    color: 'white',
  },
  container: {
    flexDirection: 'row',
    margin: 19,
  },
  Iconstyle: {
    position: 'relative',
    left: -20,
  },
  btn: {
    position: 'relative',
    top: '10%',
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    height: 35,
    width: 150,
  },
  txtBtn: {
    // justifyContent:'center',
    color: '#27B8B8',
    position: 'relative',
    //  top:7
  },
});

export default Login;
