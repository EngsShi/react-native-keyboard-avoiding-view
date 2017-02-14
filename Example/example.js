/**
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import KeyboardAvoidingView from 'react-native-keyboard-avoiding-view';

export default class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <KeyboardAvoidingView 
          ref={'keyboardView'}
          style={styles.container} 
          contentContainerStyle={styles.content}
        >
          <View 
            style={styles.bigView}
            ref={'firstView'}
          >
            <Text style={styles.bigViewText}>This is big View, animate whole view</Text>
            <TextInput
              style={styles.textInput}
              onFocus={() => this.onFocus(this.refs.firstView)}
              placeholder="click this"
            />
          </View>
          <View style={styles.separator} />
          <TextInput
            ref={'secondView'}
            style={styles.textInput}
            onFocus={() => this.onFocus(this.refs.secondView)}
            placeholder="click this"
          />
          <View style={styles.separator} />
          <View 
            style={styles.bigView}
            ref={'thirdView'} 
          >
            <Text style={styles.bigViewText}>This is big View, animate whole view</Text>
            <TextInput
              style={styles.textInput}
              onFocus={() => this.onFocus(this.refs.thirdView)}
              placeholder="click this"
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  onFocus = (focusView) => {
    const keyboardView = this.refs.keyboardView;

    // 滚动scrollview，避免覆盖指定焦点view
    keyboardView.focusViewOnFocus(focusView);
  }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  header: {
    height: 64,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#959595',
    backgroundColor: 'white',
  },
  content: {
    width: window.width,
  },
  textInput: {
    width: window.width,
    height: 30,
    backgroundColor: 'white',
  },
  bigView: {
    height: 100,
    justifyContent: 'space-between',
    backgroundColor: 'yellow',
  },
  separator: {
    height: window.width * .75,
  },
});

module.exports = Example;