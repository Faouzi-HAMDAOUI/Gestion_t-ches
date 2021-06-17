import React from 'react';
import { Text, View } from 'react-native';
import { style } from './style';

export default function Header({title}) {
  return (
    <View>
      <View style={style.subHeader} />

      <View style={style.header}>
        <Text style={style.text}>{title}</Text>
      </View>
        
    </View>
    
  )
}
