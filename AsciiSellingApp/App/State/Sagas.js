// @flow

import AsciiListSagas from './GetAsciiChar/Sagas'

export default function* root() {
  yield [
    AsciiListSagas(),
  ]
}
