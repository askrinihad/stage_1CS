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
import {CheckBox} from 'react-native-elements';
export default class checkbx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pair1: this.props.location.state.pair1,
      pair2: this.props.location.state.pair2,
      checked1: [false, false, false, false, false, false, false],
      checked2: [false, false, false, false, false, false, false],
      tete: this.props.location.state.tete,
      groupe: this.props.location.state.groupe,
      amorce: this.props.location.state.amorce,
      latitude: this.props.location.state.latitude,
      longitude: this.props.location.state.longitude,
      nbrPairMax: this.props.location.state.nbrPairMax,
      nbrPairOccupe: 0,
      pair: [],
    };
  }
  /////////////////////////////////////::
  enregistrer = () => {
    //concatener les tableau de pair dans a
    let a = this.state.pair1.concat(this.state.pair2);
    console.log(a);
    // this.setState({pair: [...a]});
    //get current position
    //appeler le fetch
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
        pair: [...a],
        nbrPairMax: this.state.nbrPairMax,
        nbrPairOccupe: this.state.nbrPairOccupe,
        compte: this.props.location.state.compte,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        Alert.alert(responseData.message);
        this.props.history.push('/ListDerang', {
          compte: this.props.location.state.compte,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ///////////////////////////////////////////

  render() {
    if (this.state.nbrPairMax === 7) {
      return (
        <View style={{backgroundColor: '#F8F8F8', height: '100%'}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                console.log(this.props.location.state.compte);
                this.props.history.push('/AjouterPc', {
                  compte: this.props.location.state.compte,
                });
              }}>
              <Icon name="chevron-left" color="white" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.enregistrer()}>
              <Text style={styles.txtBtn}>FINIR</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formBox}>
            <Text style={styles.titre}>Choisir les pairs occupés</Text>
            {this.state.pair1.map((item, key) => (
              <CheckBox
                containerStyle={{
                  top: '10%',
                  backgroundColor: '#fff',
                  borderColor: 'transparent',
                }}
                checked={this.state.checked1[key]}
                checkedColor="#27B8B8"
                key={key}
                title={(key + 1).toString()}
                onPress={() => {
                  let a = [...this.state.checked1];
                  a[key] = !this.state.checked1[key];
                  if (this.state.checked1[key]) {
                    this.setState({
                      nbrPairOccupe:
                        parseFloat(this.state.nbrPairOccupe) - parseFloat(1),
                    });
                  } else {
                    this.setState({
                      nbrPairOccupe:
                        parseFloat(this.state.nbrPairOccupe) + parseFloat(1),
                    });
                  }
                  this.setState({checked1: [...a]});
                  let b = [...this.state.pair1];
                  b[key] = 1;
                  this.setState({pair1: [...b]});
                }}
              />
            ))}
          </View>
        </View>
      );
    } else {
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
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.enregistrer()}>
              <Text style={styles.txtBtn}>FINIR</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formBox}>
            <Text style={styles.titre}>Choisir les pairs occupés</Text>
            {this.state.pair1.map((item, key) => (
              <CheckBox
                containerStyle={{
                  top: '10%',
                  backgroundColor: '#fff',
                  borderColor: 'transparent',
                  left: '-15%',
                }}
                checked={this.state.checked1[key]}
                checkedColor="#27B8B8"
                key={key}
                color="#27B8B8"
                title={(key + 1).toString()}
                onPress={() => {
                  let a = [...this.state.checked1];
                  a[key] = !this.state.checked1[key];
                  if (this.state.checked1[key]) {
                    this.setState({
                      nbrPairOccupe:
                        parseFloat(this.state.nbrPairOccupe) - parseFloat(1),
                    });
                  } else {
                    this.setState({
                      nbrPairOccupe:
                        parseFloat(this.state.nbrPairOccupe) + parseFloat(1),
                    });
                  }
                  this.setState({checked1: a});
                  let b = [...this.state.pair1];
                  b[key] = 1;
                  this.setState({pair1: [...b]});
                }}
              />
            ))}

            {this.state.pair2.map((item, key) => (
              <CheckBox
                containerStyle={{
                  top: '-60%',
                  backgroundColor: '#fff',
                  borderColor: 'transparent',
                  left: '15%',
                }}
                checked={this.state.checked2[key]}
                checkedColor="#27B8B8"
                key={key}
                color="#27B8B8"
                title={(key + 8).toString()}
                onPress={() => {
                  let c = [...this.state.checked2];
                  c[key] = !this.state.checked2[key];
                  if (this.state.checked2[key]) {
                    this.setState({
                      nbrPairOccupe:
                        parseFloat(this.state.nbrPairOccupe) - parseFloat(1),
                    });
                  } else {
                    this.setState({
                      nbrPairOccupe:
                        parseFloat(this.state.nbrPairOccupe) + parseFloat(1),
                    });
                  }
                  this.setState({checked2: c});
                  let d = [...this.state.pair2];
                  d[key] = 1;
                  this.setState({pair2: [...d]});
                }}
              />
            ))}
          </View>
        </View>
      );
    }
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
    height: '85%',
    width: '95%',
    top: '1%',
    left: '2.5%',
    borderRadius: 30,
    alignItems: 'center',
  },
  titre: {
    fontSize: 20,
    top: '7%',
  },

  btn: {
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#27B8B8',
    height: 15,
    width: 90,
    left: '53%',
  },
  txtBtn: {
    color: 'white',
    position: 'relative',
    fontSize: 18,
  },
});
