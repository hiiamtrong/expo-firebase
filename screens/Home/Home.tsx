import React from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import firebase from './../../firebase'
// import firebase from 'firebase'
// import { Button } from '@ant-design/react-native'
export default function Home() {
  const [user, setUser] = React.useState(null)
  const [name, setName] = React.useState('')
  React.useEffect(() => {
    async function getCurrentUser() {
      const currentUser = await firebase.auth().currentUser
      //@ts-ignore
      setUser(currentUser)
    }
    getCurrentUser()
  }, [])
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      {user && //@ts-ignore
        user.displayName && <Text>Hello {user.displayName}</Text>}
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={(name) => {
            setName(name)
          }}
          value={name}
        ></TextInput>
        <Button
          title="Hello world"
          onPress={() => {
            const currentUser = firebase.auth().currentUser
            currentUser?.updateProfile({
              displayName: name,
            })
            //@ts-ignore
            setUser(currentUser)
          }}
        ></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#DEE',
    height: 40,
    width: 100,
  },
})
