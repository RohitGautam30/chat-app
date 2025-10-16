import React from 'react'
import { Stack } from 'expo-router'

const MainStack = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='index'/>
      <Stack.Screen name='coin-balance'/>
      <Stack.Screen name='chat_screen'/>
      <Stack.Screen name='call'/>
    </Stack>
  )
}

export default MainStack