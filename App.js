/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {StackNav} from './app/pages/index'
import './app/storage'
const AppNavigation =()=>(
    <StackNav/>
);
export default class App extends Component<{}> {
  render() {
    return (
      <AppNavigation/>
    );
  }
}


