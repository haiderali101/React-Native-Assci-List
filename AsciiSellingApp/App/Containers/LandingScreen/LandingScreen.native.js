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

const KEY_ID = 'ID'
const KEY_SIZE = 'SIZE'
const KEY_PRICE = 'PRICE'

class LandingScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      showLoader: false,
      dataSource: [],
      refreshing: false,
      searchCategory: '',
      filteredData: [],
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
        this.setState({
          showLoader: false,
          dataSource: asciiList,
          filteredData: asciiList,
          refreshing: false,
        })
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
          <Text style={styles.switchText}>ID</Text>
          <Switch
            value={this.state.searchCategory === KEY_ID ? true : false}
            onValueChange={check => {
              this.searchFilterFunction(this.state.searchText)
              this.setState({ searchCategory: check ? KEY_ID : '' })
            }}
          />
          <Text style={styles.switchText}>Size</Text>
          <Switch
            value={this.state.searchCategory === KEY_SIZE ? true : false}
            onValueChange={check => {
              this.searchFilterFunction(this.state.searchText)
              this.setState({ searchCategory: check ? KEY_SIZE : '' })
            }}
          />
          <Text style={styles.switchText}>Price</Text>
          <Switch
            value={this.state.searchCategory === KEY_PRICE ? true : false}
            onValueChange={check => {
              this.searchFilterFunction(this.state.searchText)
              this.setState({ searchCategory: check ? KEY_PRICE : '' })
            }}
          />
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
          this.searchFilterFunction(text)
        }}
      />
    )
  }

  searchFilterFunction = text => {
    const newData = this.state.dataSource.filter(item => {
      const itemData =
        this.state.searchCategory === KEY_ID
          ? `${item.id}`
          : this.state.searchCategory === KEY_SIZE
            ? `${item.size}`
            : this.state.searchCategory === KEY_PRICE
              ? `${item.price / 100}`
              : `${item.price / 100}${item.id} ${item.size}`
      const textData = text

      return itemData.indexOf(textData) > -1
    })
    this.setState({ filteredData: newData })
  }

  renderAsciiList = () => {
    const isFetching = _.get(this.props.asciiListData, 'isFetching', false)
    if (isFetching && !this.state.refreshing) {
      return <ActivityIndicator style={styles.loaderContainer} size={'large'} animating={true} />
    }

    return (
      <FlatList
        removeClippedSubviews={false}
        style={styles.flatList}
        ContentContainerStyle={styles.contentStyle}
        data={_.size(this.state.filteredData) > 0 ? this.state.filteredData : this.state.dataSource}
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
        <Text style={[styles.facesStyle, { fontSize: item.size }]}>{item.face}</Text>
        <Text style={styles.priceStyle}>${item.price / 100}</Text>
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
