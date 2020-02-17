import { AppRegistry } from 'react-native'

import { App } from '@cosmos/common'

AppRegistry.registerComponent('cosmos', () => App)
AppRegistry.runApplication('cosmos', {
  rootTag: document.getElementById('root'),
})
