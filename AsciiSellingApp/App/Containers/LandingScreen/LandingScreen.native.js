// @flow
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native'

import styles from './LandingScreen.style'
import _ from 'lodash'

class LandingScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.getAsciiList()
    }, 10)
  }

  render() {
    console.log(this.props.asciiListData)
    return (
      <SafeAreaView style={styles.container}>
        <Text>Hello World</Text>
      </SafeAreaView>
    )
  }
}

export default LandingScreen
