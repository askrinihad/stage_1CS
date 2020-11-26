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
    };
  }
  ////////////////////////////////
  /*les fonction */
  getValue = (value) => {
    console.log(value);
    /* return (
      <View style={{alignItems: 'center'}}>
        <Text>Action</Text>
        <TextInput />
      </View>
    ); */
  };
  ///render//////////////////
  render() {
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
            <View style={styles.action}>
              <TextInput style={styles.input} placeholder="Action..." />
            </View>
            <View style={styles.action}>
              <TextInput style={styles.input} placeholder="Diagnostic..." />
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.txtBtn}>Changer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
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

  btn: {
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#27B8B8',
    height: '10%',
    width: 120,
    left: '30%',
    marginTop: '10%',
  },
  txtBtn: {
    fontSize: 16,
    color: '#FFFFFF',
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
