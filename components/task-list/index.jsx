import React from 'react';
import { View } from 'react-native';
import { ListItem, Icon  } from 'react-native-elements';
import { style } from './style';
export default function List({ taskList, onPressCallBack, onLongPressCallBack }) {
  return (
   <View>
     {
    taskList.map((task,  i) => (
      <ListItem containerStyle={task && task.status === "Terminer" ? style.itemlist1 : style.itemlist2 }  key={i} bottomDivider
      onPress={() => onPressCallBack(task)} 
       onLongPress={() => onLongPressCallBack(task)}
      >
        <Icon name={task.icon}  />
        <ListItem.Content >
          <ListItem.Title>{task.content}</ListItem.Title>
          <ListItem.Subtitle>{task.status}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  } 
 
   </View>
  );
}
