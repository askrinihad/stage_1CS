import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class ChangerEtatPair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idPc: [],
      pairLibre: '',
      pairOccupe: '',
      sature: '',
      pc: '',
      id: '',
      visible: true,
      icon: '',
      color: '',
    };
  }
  ///////////////////////
  //////////les fonctions
  setPicker = (item, index) => {
    this.setState({pc: item});
  };
  ///////////////////////////////////////////////
  renderListPc = () => {
    this.setState({visible: true});
  };
  ////////////////////////////////////////////////////
  renderInfoPc = () => {
    this.setState({visible: false});
    fetch('http://172.20.10.11:5000/pc/nbPairLibre/mob/' + this.state.id)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({pairLibre: responseData.message});
      })
      .catch((error) => {
        console.log(error);
      });
    fetch('http://172.20.10.11:5000/pc/nbPairOccup/mob/' + this.state.id)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({pairOccupe: responseData.message});
      })
      .catch((error) => {
        console.log(error);
      });
    fetch('http://172.20.10.11:5000/pc/etatPc/' + this.state.id)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.message === 'PC non saturé') {
          this.setState({icon: 'check-circle', color: '#008000'});
        } else {
          this.setState({icon: 'window-close', color: '#E90F0F'});
        }
        this.setState({sature: responseData.message});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /////////////////////////////////////////////////
  componentDidMount() {
    fetch('http://172.20.10.11:5000/pc/getListPc')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          idPc: responseData,
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
  /////////////////////////////////
  render() {
    if (this.state.visible) {
      return (
        <View style={{backgroundColor: '#F8F8F8', height: '100%'}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() =>
                this.props.history.push(
                  '/ListDerang/' + this.props.match.params.compte,
                )
              }>
              <Icon name="chevron-left" color="white" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
            <Text style={{fontSize: 20, marginTop: '5%'}}>Etat d'un PC</Text>
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
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.renderInfoPc()}>
                <Text style={styles.txtBtn}>Selectionner</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{backgroundColor: '#F8F8F8', height: '100%'}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() =>
                this.props.history.push(
                  '/ListDerang/' + this.props.match.params.compte,
                )
              }>
              <Icon name="chevron-left" color="white" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.info}>
            <TouchableOpacity
              style={styles.close}
              onPress={() => this.renderListPc()}>
              <Icon name="times" size={24} />
            </TouchableOpacity>
            <Text
              style={{
                color: this.state.color,
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: '10%',
              }}>
              {this.state.sature}
            </Text>
            <Icon
              name={this.state.icon}
              color={this.state.color}
              size={30}
              style={{marginTop: '5%'}}
            />
            <View style={{height: '10%'}}></View>
            <Text style={styles.textStyle}>{this.state.pairLibre}</Text>
            <Text style={styles.textStyle}>{this.state.pairOccupe}</Text>
          </View>
        </View>
      );
    }
  }
}
////////////////////////////////////
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#27B8B8',
    elevation: 12,
    flexDirection: 'row',
    padding: '6%',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    marginTop: '10%',
    right: '40%',
  },
  box: {
    marginTop: '30%',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 300,
    borderRadius: 30,
    elevation: 70,
    padding: '10%',
    margin: 20,
  },
  close: {
    left: '50%',
    marginTop: '-20%',
  },
  pickerStyle: {
    marginTop: '10%',
    width: '50%',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    marginTop: '30%',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 300,
    borderRadius: 30,
    elevation: 70,
    padding: '10%',
    margin: 20,
    justifyContent: 'center',
  },
  btn: {
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#27B8B8',
    height: 35,
    width: 120,
    marginTop: '10%',
  },
  txtBtn: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  textStyle: {
    fontSize: 16,
    marginTop: '5%',
    fontWeight: 'bold',
  },
  ////////////////
});
