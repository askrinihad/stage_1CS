import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation'; //to use geolocalisation
export default class AjouterPc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tete: '',
      pair1: [],
      pair2: [],
      groupe: 0,
      amorce: 0,
      latitude: 0,
      longitude: 0,
      nbrPairMax: 0,
      nbrPairOccupe: 0,
    };
  }
  /////////////////////////////////////::
  ajouter = () => {
    if (
      this.state.tete === '' ||
      this.state.groupe === 0 ||
      this.state.amorce === 0 ||
      this.state.nbrPairMax === 0
    ) {
      Alert.alert('Error', 'veuillez remplir tous les champs');
    } else {
      if (this.state.nbrPairMax != 7 && this.state.nbrPairMax != 14) {
        Alert.alert('Error', 'le nombre maximum de pair doit être 07 ou 14');
      } else {
        Alert.alert(
          'Confirmation',
          "Est que vous êtes à l'emplacement exact du PC ?",
          [
            {
              text: 'Oui',
              onPress: () => {
                for (var i = 0; i < 7; i++) {
                  this.setState({pair1: [...this.state.pair1, 0]});
                }

                if (this.state.nbrPairMax == 14) {
                  for (var i = 0; i < 7; i++) {
                    this.setState({pair2: [...this.state.pair2, 0]});
                  }
                }
                this.requestLocationPermission();
              },
            },
            {
              text: 'Non',
              onPress: () =>
                Alert.alert(
                  '',
                  "veuillez vous déplacer à l'emplacement exact du PC",
                ),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      }
    }
  };
  ///////////////////////////////////////////
  requestLocationPermission = async () => {
    if (Platform.OS === '') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone:' + response);
      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
    //android mobile
    else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android:' + response);
      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  };
  ///////////////////////////////////////
  //function to get current location
  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        //stringify: is how to vue an object as a string
        console.log(JSON.stringify(position));
        this.props.history.push('/ajoutPair', {
          tete: this.state.tete,
          groupe: this.state.groupe,
          amorce: this.state.amorce,
          nbrPairMax: this.state.nbrPairMax,
          pair1: this.state.pair1,
          pair2: this.state.pair2,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          compte: this.props.location.state.compte,
        });
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };
  ////////////////////////

  render() {
    return (
      <View style={{backgroundColor: '#F8F8F8', height: '100%'}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              console.log(this.props.location.state.compte);
              this.props.history.push('/ListDerang', {
                compte: this.props.location.state.compte,
              });
            }}>
            <Icon name="chevron-left" color="white" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.formBox}>
          <Text style={styles.titre}>Ajouter un PC</Text>
          <TextInput
            style={styles.input}
            placeholder="La tete"
            onChangeText={(text) => this.setState({tete: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="L'amorce"
            keyboardType="numeric"
            onChangeText={(text) => this.setState({groupe: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Le groupe"
            keyboardType="numeric"
            onChangeText={(text) => this.setState({amorce: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Le nombre max de pair (07 ou 14)"
            keyboardType="numeric"
            onChangeText={(text) => this.setState({nbrPairMax: text})}
          />

          <TouchableOpacity style={styles.btn} onPress={() => this.ajouter()}>
            <Text style={styles.txtBtn}>AJOUTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#27B8B8',
    elevation: 12,
    flexDirection: 'row',
    padding: '6%',
    justifyContent: 'space-between',
  },
  formBox: {
    backgroundColor: '#fff',
    elevation: 50,
    height: '70%',
    width: '80%',
    top: '5%',
    left: '10%',
    borderRadius: 30,
    alignItems: 'center',
  },
  titre: {
    fontSize: 20,
    top: '7%',
  },
  input: {
    top: '10%',
    borderWidth: 1.5,
    borderColor: 'transparent',
    height: 40,
    width: 250,
    borderRadius: 3,
    marginTop: '7%',
    borderBottomColor: '#F8F8F8',
  },

  btn: {
    position: 'relative',
    top: '20%',
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#27B8B8',
    height: 35,
    width: 110,
    marginLeft: '3%',
  },
  txtBtn: {
    color: 'white',
    position: 'relative',
  },
});
