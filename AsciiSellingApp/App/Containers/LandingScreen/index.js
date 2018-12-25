// @flow

import LandingScreen from './LandingScreen'
import { connect } from 'react-redux'

import { getAsciiList } from '../../State/GetAsciiChar/Actions'

const mapStateToProps = state => ({
  asciiListData: state.asciiList,
})

const mapDispatchToProps = dispatch => ({
  getAsciiList: () => {
    dispatch(getAsciiList())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingScreen)
