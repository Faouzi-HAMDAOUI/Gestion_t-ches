import React from 'react'
import ActionButton from 'react-native-action-button';
import { Icon  } from 'react-native-elements';

export default function ButtonAddTask({ onPressCallBack }) {


  return (
    <ActionButton 
     buttonColor="#000"
     Icon={<Icon color="#FFFFFF" name={'add'} />}
     onPress={onPressCallBack}
    />
  )
}
