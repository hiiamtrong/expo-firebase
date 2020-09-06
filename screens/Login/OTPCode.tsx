import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'

import Button from '@ant-design/react-native/lib/button'
import { NoticeBar } from '@ant-design/react-native'
// @ts-ignore
// import firebase from './../../firebase.js'
import styles from './style'
import firebase from 'firebase'
// @ts-ignore
export default function OTPCode({ navigation, route }) {
  // @ts-ignore
  const verificationCodeTextInput = React.useRef(null)
  const { vetificationId } = route.params
  const [confirmError, setConfirmError] = React.useState<Error>()
  const [vetifyCode, setVetifyCode] = useState(null)
  React.useEffect(() => {
    //@ts-ignore
    verificationCodeTextInput.current?.focus()
  })
  const handleSendOPTCode = async () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      vetificationId,

      //@ts-ignore
      vetifyCode
    )
    const authResult = await firebase.auth().signInWithCredential(credential)
    navigation.navigate('Home')
    try {
    } catch (error) {
      setConfirmError(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="center"
          source={require('./../../assets/abby.png')}
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.form}>
        <Text></Text>
        <Text style={styles.text}>Enter OPT Code</Text>
        <TextInput
          autoCompleteType="tel"
          keyboardType="phone-pad"
          placeholder="123456"
          style={styles.textInput}
          onChangeText={(code: string) => {
            //@ts-ignore
            setVetifyCode(code)
          }}
        ></TextInput>
        <Button
          type="warning"
          disabled={!vetifyCode}
          onPress={() => handleSendOPTCode()}
        >
          Send
        </Button>
      </View>
      <View style={styles.error}>
        {confirmError && (
          <Text style={styles.errorMessage}>{confirmError}</Text>
        )}
      </View>
    </View>
  )
}
