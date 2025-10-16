import React from 'react'
import { View, Text } from 'react-native'
import { Stack } from 'expo-router'

const AUthStack = () => {
  return (
    <Stack screenOptions={{headerShown : false}}>
      <Stack.Screen name='index'/>
      <Stack.Screen name='terms_agree'/>
      <Stack.Screen name='login'/>
      <Stack.Screen name='signup'/>
      <Stack.Screen name='verify_otp'/>
    </Stack>
  )
}

export default AUthStack