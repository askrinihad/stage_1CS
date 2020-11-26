import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ListDerang from './Components/ListDerang';
import Login from './Components/Login';
import EtatPc from './Components/EtatPc';
import AjouterPc from './Components/AjouterPc';
import ChangerEtatPair from './Components/ChangerEtatPair';
import InfoDerang from './Components/InfoDerang';
import DerangUrgent from './Components/DerangUrgent';
import ChangerEtatDer from './Components/ChangerEtatDer';
import {Route, Switch, NativeRouter} from 'react-router-native';

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Switch>
          {/*   <Route exact path="/" component={ChangerEtatDer} /> */}
          <Route exact path="/ChangerEtatDer" component={ChangerEtatDer} />
          <Route exact path="/" component={Login} />
          <Route exact path="/ListDerang/:compte" component={ListDerang} />
          <Route exact path="/EtatPc/:compte" component={EtatPc} />
          <Route exact path="/AjouterPc/:compte" component={AjouterPc} />
          <Route exact path="/ChangerEtatPair" component={ChangerEtatPair} />
          <Route exact path="/DerangUrgent" component={DerangUrgent} />
          <Route exact path="/InfoDerang" component={InfoDerang} />
        </Switch>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
});
