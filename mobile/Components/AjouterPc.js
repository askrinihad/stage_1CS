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
export default class AjouterPc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tete: '',
      pair: [],
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
      Alert.alert(
        'Confirmation',
        "Est que vous êtes à l'emplacement exact du PC ?",
        [
          {
            text: 'Oui',
            onPress: () => {
              fetch('http://172.20.10.11:5000/pc/entrerCoordonnee/mob', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  tete: this.state.tete,
                  groupe: this.state.groupe,
                  amorce: this.state.amorce,
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  pair: this.state.pair,
                  nbrPairMax: this.state.nbrPairMax,
                  nbrPairOccupe: this.state.nbrPairOccupe,
                  compte: this.props.match.params.compte,
                }),
              })
                .then((response) => response.json())
                .then((responseData) => {
                  Alert.alert(responseData.message);
                })
                .catch((error) => {
                  console.log(error);
                });
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
  };
  ///////////////////////////////////////////

  render() {
    return (
      <View style={{backgroundColor: '#F8F8F8', height: '100%'}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              console.log(this.props.location.state.compte);
              this.props.history.push(
                '/ListDerang/' + this.props.match.params.compte,
              );
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
            placeholder="Le nombre max de pair"
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
