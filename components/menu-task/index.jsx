import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Button , Icon} from 'react-native-elements';
import { Modal } from 'react-native-modals';
import { style } from './style';
export default function MenuTask({isVisible, onDisapearCallBack, onDeleteTask, onChangeStatusTask}) {
  return (
    <TouchableOpacity activeOpacity={1.0} onPress={() => onDisapearCallBack()} >
    <View>
   <Modal visible={ isVisible}
   animationIn="zoomInDown"
   animationOut="zoomOutUp"
   animationOutTiming={2000}
   animationInTiming={2000}
   backdropTransitionInTiming={2000}
   backdropTransitionOutTiming={2000}
   >
     <TouchableWithoutFeedback >
   <View style={ style.modal }>
   <View style={ style.textView }>
     <Text>Que souhaitez vous faire sur la tâche</Text>
   </View>
   <View style={ style.buttonView }>
   
     <Button title="Supprimer" onPress={() => onDeleteTask()}
     buttonStyle={ style.buttonDelete }
     />
     <Button title="Changer status" onPress={() => onChangeStatusTask()}
     buttonStyle={ style.buttonChangeStatus }
     />
   </View>
   <View>
   <Button title="Fermer" onPress={() => onDisapearCallBack()}
     buttonStyle={ style.buttonClose }
     />
   </View>
   </View>
   </TouchableWithoutFeedback>
   </Modal>
   </View>
   </TouchableOpacity> 
  )
}
