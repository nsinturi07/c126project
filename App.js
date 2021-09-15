import React, { Component } from 'react'
import { Text, View } from 'react-native'
import PickImage from './screens/camera'
export class App extends Component {
  render() {
    return (
      <View>
        <PickImage/>
      </View>
    )
  }
}

export default App

