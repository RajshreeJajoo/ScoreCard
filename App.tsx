import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Home from './screens/home'
import Quiz from './screens/quiz'
import Result from './screens/result'
import MyStack from './navigation'

import { NavigationContainer } from '@react-navigation/native'
const App = () => {
  return (
   
    <NavigationContainer>
      <MyStack/>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingTop:60,
    paddingHorizontal:30,
    paddingVertical:30
  }
})
export default App