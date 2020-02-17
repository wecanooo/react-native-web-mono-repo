import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const App = () => {
  return (
    <View>
      <Text>Hello, World</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
})
