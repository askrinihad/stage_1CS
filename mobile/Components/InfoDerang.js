import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {Menu, Divider, Provider, DefaultTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

class InfoDeran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      titre: 'complaint1320',
      dateSigna: '2020-11-01T00:00:00.000Z',
      dateLimit: '2020-11-01T00:00:00.000Z',
      nomClient: 'Saidi alae',
      numClient: '0549000879',
      addressClient: 'Babez',
      constitutionTete: 'H05',
      constitutionGroupe: 6,
      constitutionAmorce: 7,
      nomMsan: 'MSN4',
      pair: 15,
      typeDerang: 'pas de tonalité',
      numFixClient: '02367564',
      lic: 45,
      referenceEqui: 46487909,
      nomTech: 'C7_BEZ',
      nbVisite: 0,
      compte: '',
      visible: false,
    };
  }
  //////////////////////les fonctions//////////////////////////////
  openMenu = () => this.setState({visible: true});
  closeMenu = () => this.setState({visible: false});
  ////////////////////////////
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
        this.props.history.push('/LocaliserPc', {
          titre: this.props.location.state.titre,
          tete: this.state.constitutionTete,
          groupe: this.state.constitutionGroupe,
          amorce: this.state.constitutionAmorce,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };
  ////////////////////////////////////////////////////////////////
  componentDidMount() {
    fetch(
      'http://172.20.10.11:5000/derangement/GetOneDer/mobile/' +
        this.props.location.state.titre,
    )
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState((prevState) => ({
          id: responseData[0]._id,
          titre: responseData[0].titre,
          dateSigna: responseData[0].dateSignal,
          dateLimit: responseData[0].dateLimit,
          nomClient: responseData[0].nomClient,
          numClient: responseData[0].numClient,
          addressClient: responseData[0].addressClient,
          constitutionTete: responseData[0].constitutionTete,
          constitutionGroupe: responseData[0].constitutionGroupe,
          constitutionAmorce: responseData[0].constitutionAmorce,
          nomMsan: responseData[0].nomMsan,
          pair: responseData[0].pair,
          typeDerang: responseData[0].typeDerang,
          numFixClient: responseData[0].numFixClient,
          lic: responseData[0].lic,
          referenceEqui: responseData[0].referenceEqui,
          nomTech: responseData[0].nomTech,
          nbVisite: responseData[0].nbVisite,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  ////////////////////////////////////////////////////////////////
  render() {
    return (
      <View style={{flex: 1}}>
        <Provider theme={DefaultTheme}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.ChevronIcon}
              onPress={() => {
                this.props.history.push('/ListDerang', {
                  compte: this.props.location.state.compte,
                });
              }}>
              <Icon name="chevron-left" color="white" size={24} />
            </TouchableOpacity>

            <Menu
              style={styles.menu}
              visible={this.state.visible}
              onDismiss={this.closeMenu}
              anchor={
                <TouchableOpacity style={styles.DotsIcon}>
                  <Icon
                    name="ellipsis-v"
                    color="white"
                    size={30}
                    onPress={this.openMenu}
                  />
                </TouchableOpacity>
              }>
              <Menu.Item
                onPress={() => {
                  this.props.history.push('/ChangerEtatPair', {
                    titre: this.props.location.state.titre,
                    etatPair: false,
                  });
                }}
                title="Changer l’état d’un pair"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  this.requestLocationPermission();
                  /*   this.props.history.push('/LocaliserPc', {
                    titre: this.props.location.state.titre,
                    tete: this.state.constitutionTete,
                    groupe: this.state.constitutionGroupe,
                    amorce: this.state.constitutionAmorce,
                  }); */
                }}
                title="Localiser le PC"
              />
              <Divider />
              <Menu.Item
                onPress={() =>
                  this.props.history.push('/ChangerEtatDer/', {
                    titre: this.props.location.state.titre,
                    compte: this.props.location.state.compte,
                    id: this.state.id,
                    nbVisite: this.state.nbVisite,
                  })
                }
                title="Changer l’état du derangement"
              />
            </Menu>
          </View>

          <ScrollView style={styles.info}>
            <Text></Text>
            <Text style={styles.titre}>Titre:</Text>
            <Text style={styles.champs}>{this.state.titre}</Text>
            <Text></Text>
            <Text style={styles.titre}>Type de dérangement:</Text>
            <Text style={styles.champs}>{this.state.typeDerang}</Text>
            <Text></Text>
            <Text style={styles.titre}>Date de signalisation:</Text>
            <Text style={styles.champs}>{this.state.dateSigna}</Text>
            <Text></Text>
            <Text style={styles.titre}>Date limite:</Text>
            <Text style={styles.champs}>{this.state.dateLimit}</Text>
            <Text></Text>
            <Text style={styles.titre}>Nom de client:</Text>
            <Text style={styles.champs}>{this.state.nomClient}</Text>
            <Text></Text>
            <Text style={styles.titre}>Numero de contact de client:</Text>
            <Text style={styles.champs}>{this.state.numClient}</Text>
            <Text></Text>
            <Text style={styles.titre}>Numero Fix:</Text>
            <Text style={styles.champs}>{this.state.numFixClient}</Text>
            <Text></Text>
            <Text style={styles.titre}>Constitution:</Text>
            <Text style={styles.champs}>
              {this.state.constitutionTete}-{this.state.constitutionGroupe}-P
              {this.state.pair}
            </Text>
            <Text></Text>
            <Text style={styles.titre}>Nom d'équipement:</Text>
            <Text style={styles.champs}>
              {this.state.nomMsan}-{this.state.referenceEqui}-{this.state.lic}
            </Text>
            <Text></Text>
            <Text style={styles.titre}>Nombre de visite de client:</Text>
            <Text style={styles.champs}>{this.state.nbVisite}</Text>
            <Text></Text>
          </ScrollView>
        </Provider>
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
  DotsIcon: {
    left: '90%',
  },
  menu: {
    top: '3%',
    left: '38%',
  },
  info: {
    left: '5%',
    height: '85%',
  },
  titre: {
    fontSize: 18,
    left: '5%',
  },
  champs: {
    left: '5%',
    color: '#A79E9E',
  },
  item: {
    backgroundColor: '#fff',
    color: '#000000',
  },
});
const theme = {
  dark: false,
};
export default InfoDeran;
