import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
// import * as firebase from './../../firebase'
import firebase from './../../firebase'

export default function Loading(props: React.ReactNode) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      props.navigation.navigate(user ? 'Home' : 'Login')
    })
  }, [])
  return (
    <View style={styles.container}>
      <View>
        <Text>Loading...</Text>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
