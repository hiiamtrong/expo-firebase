import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
// @ts-ignore
import Button from '@ant-design/react-native/lib/button'
import { NoticeBar } from '@ant-design/react-native'

// import firebase from './../../firebase.js'
import firebase from 'firebase'
import styles from './style'
//@ts-ignore
export default function Login({ navigation }) {
  const captcha = useRef(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [verifyError, setVerifyError] = React.useState<Error>()
  const [vetifyId, setVetifyId] = useState('')
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined

  const handleSendPhoneNumber = async () => {
    setVetifyId('')
    const phoneProvider = new firebase.auth.PhoneAuthProvider()
    //@ts-ignore
    const vetificationId = await phoneProvider.verifyPhoneNumber(
      // @ts-ignore
      phoneNumber,
      captcha.current
    )
    console.log(vetificationId)
    //@ts-ignore
    setVetifyId(vetificationId)
    navigation.navigate('OPTCode', {
      vetificationId,
    })

    try {
    } catch (error) {
      setVerifyError(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={captcha}
        // @ts-ignore
        firebaseConfig={firebaseConfig}
      />
      <View style={styles.header}>
        <Image
          resizeMode="center"
          source={require('./../../assets/abby.png')}
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.form}>
        <Text></Text>
        <Text style={styles.text}>Enter your phone number</Text>
        <TextInput
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          placeholder="+84 999 999 999"
          style={styles.textInput}
          onChangeText={(number: string) => {
            // @ts-ignore
            setPhoneNumber(number)
          }}
        ></TextInput>
        <Button
          type="warning"
          disabled={!phoneNumber}
          onPress={() => handleSendPhoneNumber()}
        >
          Send
        </Button>
      </View>
      <View style={styles.error}>
        {verifyError && <Text style={styles.errorMessage}>{verifyError}</Text>}
      </View>
    </View>
  )
}
