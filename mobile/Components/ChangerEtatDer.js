import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
/////////////////////////////////////////////////
export default class ChangerEtatDer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [
        {label: 'Traité', value: 'Traité'},
        {label: 'Non traité', value: 'Non traité'},
        {label: 'Client non trouvé', value: 'Client non trouvé'},
      ],
      visible: true,
      etat: 'Traité',
      action: '',
      diagnostic: '',
    };
  }
  ////////////////////////////////
  /*les fonction */
  getValue = (value) => {
    if (value === 'Traité') {
      this.setState({etat: 'Traité'});
    } else {
      if (value === 'Non traité') {
        this.setState({etat: 'Non traité'});
      } else {
        if (value === 'Client non trouvé') {
          this.setState({etat: 'Client non trouvé'});
        }
      }
    }
  };
  //////////////////////////////////:
  sauvegarderEtat = () => {
    if (this.state.etat === 'Traité') {
      if (this.state.action === '') {
        Alert.alert('Error', 'veuillez remplir tous les champs');
      } else {
        console.log(this.state.action);
        fetch('http://172.20.10.11:5000/derangement/EtatTrait/mobile', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            titre: this.props.location.state.titre,
            action: this.state.action,
          }),
        })
          .then((response) => response.json())
          .then((responseData) => {
            Alert.alert('Confirmation', responseData.message, [
              {
                text: 'OK',
                onPress: () => {
                  this.props.history.push('/ListDerang', {
                    compte: this.props.location.state.compte,
                  });
                },
              },
            ]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      if (this.state.etat === 'Non traité') {
        if (this.state.action === '' || this.state.diagnostic === '') {
          Alert.alert('Error', 'veuillez remplir tous les champs');
        } else {
          fetch('http://172.20.10.11:5000/derangement/Etatpblm/mobile', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              titre: this.props.location.state.titre,
              action: this.state.action,
              diagnostic: this.state.diagnostic,
            }),
          })
            .then((response) => response.json())
            .then((responseData) => {
              console.log(responseData.message);
              Alert.alert('Confirmation', responseData.message, [
                {
                  text: 'OK',
                  onPress: () => {
                    this.props.history.push('/ListDerang', {
                      compte: this.props.location.state.compte,
                    });
                  },
                },
              ]);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        if (this.state.etat === 'Client non trouvé') {
          fetch(
            'http://172.20.10.11:5000/derangement/incrementerVisit/mob/' +
              this.props.location.state.id +
              '/' +
              this.props.location.state.nbVisite,
            {
              method: 'PATCH',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            },
          )
            .then((response) => response.json())
            .then((responseData) => {
              /* console.log(responseData.message);
              Alert.alert(responseData.message); */
            })
            .catch((error) => {
              console.log(error);
            });

          this.props.history.push('/ListDerang', {
            compte: this.props.match.params.compte,
          });
        }
      }
    }
  };

  ///render//////////////////
  render() {
    if (this.state.etat === 'Traité') {
      return (
        <View style={{backgroundColor: '#F8F8F8', height: '100%'}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() =>
                this.props.history.push('/ListDerang', {
                  compte: this.props.location.state.compte,
                })
              }>
              <Icon name="chevron-left" color="white" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.boxT}>
            <Text style={{fontWeight: 'bold'}}>Changer état dérangement</Text>
            <View>
              <RadioForm
                style={styles.radioStyle}
                radio_props={this.state.types}
                initial={0}
                selectedButtonColor={'#27B8B8'}
                radioStyle={{paddingRight: 8}}
                formHorizontal={false}
                circleSize={10}
                labelHorizontal={true}
                buttonColor={'#27B8B8'}
                animation={true}
                onPress={(value) => {
                  this.getValue(value);
                }}
              />
            </View>
            <View style={styles.action}>
              <TextInput
                style={styles.input}
                placeholder="Action..."
                onChangeText={(text) => this.setState({action: text})}
              />
            </View>
            <TouchableOpacity
              style={styles.btnT}
              onPress={() => this.sauvegarderEtat()}>
              <Text style={styles.txtBtn}>Sauvegarder</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      if (this.state.etat === 'Non traité') {
        return (
          <View style={{backgroundColor: '#F8F8F8', height: '100%'}}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() =>
                  this.props.history.push('/ListDerang', {
                    compte: this.props.location.state.compte,
                  })
                }>
                <Icon name="chevron-left" color="white" size={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <Text style={{fontWeight: 'bold'}}>Changer état dérangement</Text>
              <View>
                <RadioForm
                  style={styles.radioStyle}
                  radio_props={this.state.types}
                  initial={0}
                  selectedButtonColor={'#27B8B8'}
                  radioStyle={{paddingRight: 8}}
                  formHorizontal={false}
                  circleSize={10}
                  labelHorizontal={true}
                  buttonColor={'#27B8B8'}
                  animation={true}
                  onPress={(value) => {
                    this.getValue(value);
                  }}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  style={styles.input}
                  placeholder="Action..."
                  onChangeText={(text) => this.setState({action: text})}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  style={styles.input}
                  placeholder="Diagnostic..."
                  onChangeText={(text) => this.setState({diagnostic: text})}
                />
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.sauvegarderEtat()}>
                <Text style={styles.txtBtn}>Sauvegarder</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        return (
          <View style={{backgroundColor: '#F8F8F8', height: '100%'}}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() =>
                  this.props.history.push('/ListDerang', {
                    compte: this.props.location.state.compte,
                  })
                }>
                <Icon name="chevron-left" color="white" size={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.boxC}>
              <Text style={{fontWeight: 'bold'}}>Changer état dérangement</Text>
              <View>
                <RadioForm
                  style={styles.radioStyle}
                  radio_props={this.state.types}
                  initial={0}
                  selectedButtonColor={'#27B8B8'}
                  radioStyle={{paddingRight: 8}}
                  formHorizontal={false}
                  circleSize={10}
                  labelHorizontal={true}
                  buttonColor={'#27B8B8'}
                  animation={true}
                  onPress={(value) => {
                    this.getValue(value);
                  }}
                />
              </View>
              <TouchableOpacity
                style={styles.btnC}
                onPress={() => this.sauvegarderEtat()}>
                <Text style={styles.txtBtn}>Sauvegarder</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
  }
}

/////////////////////:
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#27B8B8',
    elevation: 12,
    flexDirection: 'row',
    padding: '6%',
    justifyContent: 'space-between',
  },
  boxT: {
    marginTop: '10%',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '60%',
    borderRadius: 30,
    elevation: 70,
    padding: '10%',
    margin: 20,
  },
  boxC: {
    marginTop: '10%',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '50%',
    borderRadius: 30,
    elevation: 70,
    padding: '10%',
    margin: 20,
  },
  box: {
    marginTop: '10%',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '70%',
    borderRadius: 30,
    elevation: 70,
    padding: '10%',
    margin: 20,
  },
  radioStyle: {
    marginTop: '10%',
    marginLeft: '10%',
  },
  btnC: {
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#27B8B8',
    height: '15%',
    width: 120,
    marginTop: '15%',
  },
  btnT: {
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#27B8B8',
    height: '15%',
    width: 120,
    marginTop: '15%',
  },
  btn: {
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#27B8B8',
    height: '10%',
    width: 120,
    marginTop: '15%',
  },
  txtBtn: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  traite: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1.5,
    borderColor: 'transparent',
    height: 40,
    width: 250,
    borderRadius: 3,
    marginTop: '7%',
    marginLeft: '10%',
    borderBottomColor: '#F8F8F8',
  },
  action: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '5%',
  },
});
