import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
export default class ChangerEtatPair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPc: [],
      idPc: [],
    };
  }
  /////////////////////////////////////////////////
  componentDidMount() {
    fetch('http://172.20.10.11:5000/pc/getListPc')
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData[0].tete);

        this.setState(() => ({
          listPc: responseData,
          //idPc:responseData.tete
        }));
        /* console.log(
          responseData.tete +
            '-' +
            responseData.groupe +
            '-' +
            responseData.amorce,
        ); */
      })
      .catch((error) => {
        console.log(error);
      });
  }
  /////////////////////////////////
  render() {
    return (
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
    );
    /*  <DropdownMenu
        style={{flex: 0.5}}
        bgColor={'grey'}
        tintColor={'#000000'}
        activityTintColor={'red'}
        /*  handler={(selection, row) =>
          this.setState({text: data[selection][row]})
        } */
    //data={this.state}></DropdownMenu> */
    //
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
});
