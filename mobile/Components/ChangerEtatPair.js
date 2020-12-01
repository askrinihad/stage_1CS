import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  TextInput,
} from 'react-native';
export default class ChangerEtatPair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [
        {label: 'Libre', value: 0},
        {label: 'Occupée', value: 1},
      ],
      idPc: [],
      tabPair: [],
      pc: '',
      id: '',
      pair: -1,
      etat: 0,
      nb: 0,
      nbOccupe: 0,
      nbMax: 0,
    };
  }
  ////////////////////
  /*--------------les fonctions--------------------*/
  setPicker = (item, index) => {
    this.setState({
      pc: item,
      id: item._id,
      tabPair: [...item.pair],
      nbOccupe: item.nbrPairOccupe,
      nb: item.nbrPairOccupe,
    });
  };
  /////////////////////////
  sauvegarderEtat = () => {
    if (this.state.pair === -1) {
      Alert.alert('Error', 'veuillez remplir tous les champs');
    } else {
      if (0 < this.state.pair <= this.state.nbMax) {
        if (
          this.state.tabPair[parseFloat(this.state.pair)] !==
          parseFloat(this.state.etat)
        ) {
          if (parseFloat(this.state.etat) === parseFloat(0)) {
            this.setState(
              {
                nbOccupe: parseFloat(this.state.nbOccupe) - parseFloat(1),
                nb: 5,
              },
              () => {
                fetch(
                  'http://172.20.10.11:5000/pc/changerEtatPair/mob/' +
                    this.state.id,
                  {
                    method: 'PATCH',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      etat: this.state.etat,
                      pair: this.state.pair,
                      nbrPairOccupe: this.state.nbOccupe,
                    }),
                  },
                )
                  .then((response) => response.json())
                  .then((responseData) => {
                    Alert.alert('Confirmation', responseData.message, [
                      {
                        text: 'OK',
                        onPress: () => {
                          if (this.props.location.state.etatPair) {
                            this.props.history.push('/ListDerang', {
                              compte: this.props.location.state.compte,
                            });
                          } else {
                            this.props.history.push('/InfoDerang', {
                              titre: this.props.location.state.compte,
                            });
                          }
                        },
                      },
                    ]);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              },
            );
          } else {
            this.setState(
              {
                nbOccupe: parseFloat(this.state.nb) + parseFloat(1),
                nb: 5,
              },
              () => {
                fetch(
                  'http://172.20.10.11:5000/pc/changerEtatPair/mob/' +
                    this.state.id,
                  {
                    method: 'PATCH',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      etat: this.state.etat,
                      pair: this.state.pair,
                      nbrPairOccupe: this.state.nbOccupe,
                    }),
                  },
                )
                  .then((response) => response.json())
                  .then((responseData) => {
                    Alert.alert('Confirmation', responseData.message, [
                      {
                        text: 'OK',
                        onPress: () => {
                          if (this.props.location.state.etatPair) {
                            this.props.history.push('/ListDerang', {
                              compte: this.props.location.state.compte,
                            });
                          } else {
                            this.props.history.push('/InfoDerang', {
                              titre: this.props.location.state.compte,
                            });
                          }
                        },
                      },
                    ]);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              },
            );
          }
        } else {
          Alert.alert('Confirmation', "l'état de la paire est la même", [
            {
              text: 'Oui',
              onPress: () => {
                if (this.props.location.state.etatPair) {
                  this.props.history.push('/ListDerang', {
                    compte: this.props.location.state.compte,
                  });
                } else {
                  this.props.history.push('/InfoDerang', {
                    titre: this.props.location.state.compte,
                  });
                }
              },
            },
          ]);
        }
      } else {
        Alert.alert('Error', "le numéro de la paire n'est pas validé");
      }
    }
  };
  /////////////////////////////////
  ////////////////////////////////
  componentDidMount() {
    fetch('http://172.20.10.11:5000/pc/getListPc')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          idPc: responseData,
          nbMax: responseData[0].nbrPairMax,
          nbOccupe: responseData[0].nbrPairOccupe,
          nb: responseData[0].nbrPairOccupe,
          tabPair: responseData[0].pair,
          id: responseData[0]._id,
          pc:
            responseData[0].tete +
            '-' +
            responseData[0].groupe +
            '-' +
            responseData[0].amorce,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  ////////////////////////////////////////
  /*---------------Render---------------------- */
  render() {
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (this.props.location.state.etatPair) {
                this.props.history.push('/ListDerang', {
                  compte: this.props.location.state.compte,
                });
              } else {
                this.props.history.push('/InfoDerang', {
                  titre: this.props.location.state.titre,
                });
              }
            }}>
            <Icon name="chevron-left" color="white" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <Text style={{fontSize: 20, marginTop: '5%'}}>
            Changer état paire
          </Text>
          <Picker
            style={styles.pickerStyle}
            selectedValue={this.state.pc}
            mode="dropdown"
            onValueChange={this.setPicker}>
            {this.state.idPc.map((item, key) => (
              <Picker.Item
                label={'' + item.tete + '-' + item.groupe + '-' + item.amorce}
                value={item}
                key={key}
              />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Numéro de la paire..."
            keyboardType="numeric"
            onChangeText={(text) =>
              this.setState({pair: parseFloat(text) - parseFloat(1)})
            }
          />
          <RadioForm
            style={styles.radioStyle}
            radio_props={this.state.types}
            initial={0}
            selectedButtonColor={'#27B8B8'}
            radioStyle={{paddingRight: 90}}
            formHorizontal={true}
            circleSize={10}
            labelHorizontal={true}
            buttonColor={'#27B8B8'}
            animation={true}
            onPress={(value) => {
              this.setState({etat: value});
            }}
          />

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.sauvegarderEtat()}>
              <Text style={styles.txtBtn}>Selectionner</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
//////////////////////////////////::::::

///style
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#27B8B8',
    elevation: 12,
    flexDirection: 'row',
    padding: '6%',

    justifyContent: 'space-between',
  },
  box: {
    marginTop: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 380,
    borderRadius: 30,
    elevation: 70,
    padding: '10%',
    margin: 20,
  },
  pickerStyle: {
    marginTop: '15%',
    width: '50%',
    borderWidth: 5,
    right: '20%',
  },
  btn: {
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#27B8B8',
    height: 35,
    width: 120,
    marginTop: '15%',
  },
  radioStyle: {
    marginTop: '10%',
    marginLeft: '10%',
  },
  txtBtn: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  input: {
    // top: '5%',
    borderWidth: 1.5,
    borderColor: 'transparent',
    height: 40,
    width: 250,
    borderRadius: 3,
    marginTop: '7%',
    borderBottomColor: '#F8F8F8',
  },
});
