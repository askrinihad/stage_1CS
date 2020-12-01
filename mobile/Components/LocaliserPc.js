import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const GOOGLE_MAPS_APIKEY = 'AIzaSyDOtPgM1PPsS3ZNZEV9KYdBu0ktA77GaTE';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation'; //to use geolocalisation
export default class LocaliserPc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitudeCurrent: this.props.location.state.latitude,
      longitudeCurrent: this.props.location.state.longitude,
      LatitudeDes: 0,
      LongitudeDes: 0,
    };
  }
  ///////////////////////////
  /*-----------les fonctions-------------*/
  showIdPc = () => {
    Alert.alert(
      'Welcom to San Francisco',
      'The food is amazing',
      //our buttons which are an array
      [
        {
          text: 'Ok',
        },
      ],
    );
  };
  //////////////////////////////:
  /////////////////////////////////////////////
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
        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 1.09,
          longitudeDelta: 1.035,
        };
        this.setState({
          latitudeCurrent: position.coords.latitude,
          longitudeCurrent: position.coords.longitude,
        });
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };
  /*----------compountDidMount--------------------- */
  componentDidMount = () => {
    // this.requestLocationPermission();
    fetch(
      'http://172.20.10.11:5000/pc/localiserPc/mob/' +
        this.props.location.state.tete +
        '/' +
        this.props.location.state.groupe +
        '/' +
        this.props.location.state.amorce,
    )
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          latitudeDes: responseData.latitude,
          longitudeDes: responseData.longitude,
        });
        console.log('coords:');
        console.log(this.state.latitudeDes);
        console.log(this.state.longitudeDes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ////////////////////////

  render() {
    console.log(
      'coords: ' + this.state.latitudeDes + '---' + this.state.longitudeDes,
    );
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.history.push('/InfoDerang', {
                titre: this.props.location.state.titre,
              });
            }}>
            <Icon name="chevron-left" color="white" size={24} />
          </TouchableOpacity>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          ref={(map) => (this._map = map)}
          initialRegion={{
            /*   latitude: this.state.latitudeCurrent,
          longitude: this.state.longitudeCurrent, */
            latitude: 36.7163409,
            longitude: 3.1630631,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
          }}
          /* showsUserLocation={true} */
        >
          <MapView.Marker
            coordinate={{
              latitude: 36.7163409,
              longitude: 3.1630631,
              /*  latitude: this.props.location.state.latitude,
            longitude: this.props.location.state.longitude, */
            }}
          />

          <MapView.Marker
            coordinate={{
              latitude: this.state.latitudeDes,
              longitude: this.state.longitudeDes,
            }}
          />
          <MapViewDirections
            origin={{
              /*   latitude: this.state.latitudeCurrent,
            longitude: this.state.longitudeCurrent, */
              latitude: 36.7163409,
              longitude: 3.1630631,
            }}
            destination={{
              latitude: this.state.latitudeDes,
              longitude: this.state.longitudeDes,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            mode="DRIVING"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
  header: {
    backgroundColor: '#27B8B8',
    elevation: 12,
    flexDirection: 'row',
    padding: '6%',

    justifyContent: 'space-between',
  },
});
