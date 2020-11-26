import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';
import {StyleSheet, TouchableOpacity} from 'react-native';
export default class ChangerEtatPair extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
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
});
