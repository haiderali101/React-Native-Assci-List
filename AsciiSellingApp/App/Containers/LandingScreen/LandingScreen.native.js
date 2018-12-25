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
  Switch,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native'

import styles from './LandingScreen.style'
import _ from 'lodash'

class LandingScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      showLoader: false,
      dataSource: [],
      refreshing: false,
    }
    this.fetchAsciiListCheck = true
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.getAsciiList()
    }, 10)
  }

  componentWillReceiveProps(nextProps) {
    const { asciiListData } = nextProps
    const error = _.get(asciiListData, 'error', null)
    const isFetching = _.get(asciiListData, 'isFetching', false)
    const asciiList = _.get(asciiListData, 'asciiListData', [])

    if (this.fetchAsciiListCheck) {
      if (!isFetching && error == null && _.size(asciiList) > 0) {
        this.setState({ showLoader: false, dataSource: asciiList, refreshing: false })
        this.fetchAsciiListCheck = false
      }
    }
  }

  render() {
    console.log(this.props.asciiListData)
    return (
      <SafeAreaView style={styles.container}>
        {this.renderSearchContainer()}
        {this.renderSortingContainer()}
        {this.renderAsciiList()}
      </SafeAreaView>
    )
  }

  renderSortingContainer = () => {
    return (
      <View style={styles.sortingContainer}>
        <Text style={{ marginTop: 10 }}>Sort By</Text>
        <View style={styles.switchContainer}>
          <Text style={{ paddingHorizontal: 10 }}>ID</Text>
          <Switch />
          <Text style={{ paddingHorizontal: 10 }}>Size</Text>
          <Switch />
          <Text style={{ paddingHorizontal: 10 }}>Price</Text>
          <Switch />
        </View>
      </View>
    )
  }

  renderSearchContainer = () => {
    return (
      <TextInput
        style={styles.searchBarStyle}
        placeholder="Search..."
        placeholderTextColor="black"
        onChangeText={text => {
          console.log(text)
          this.setState({ searchText: text })
        }}
      />
    )
  }

  renderAsciiList = () => {
    const isFetching = _.get(this.props.asciiListData, 'isFetching', false)
    return (
      <FlatList
        removeClippedSubviews={false}
        style={styles.flatList}
        ContentContainerStyle={styles.contentStyle}
        data={this.state.dataSource}
        extraData={this.props}
        renderItem={this.renderRow}
        keyExtractor={(item, index) => item.id}
        onRefresh={() => {
          if (!isFetching) {
            this.fetchDataOnRefresh()
          }
        }}
        refreshing={this.state.refreshing}
      />
    )
  }

  renderRow = ({ item }) => {
    return (
      <View style={styles.flatListItem}>
        <Text style={{ fontSize: item.size, alignSelf: 'center' }}>{item.face}</Text>
      </View>
    )
  }

  fetchDataOnRefresh = () => {
    this.fetchAsciiListCheck = true
    this.setState({ refreshing: true }, () => {
      this.props.getAsciiList()
    })
  }
}

export default LandingScreen
