
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Header from './components/header';
import List from './components/task-list'
import ButtonAddTask from './components/button-add-task';
import { ModalPortal } from 'react-native-modals';
import MenuTask from './components/menu-task';
import lodash from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage } from 'react-native';
const storageKey='listTask';

export default function App() {
 
  // pour afficher ou cacher le modale
  const [isMenuTaskVisible, setIsMenuTaskVisible] = useState(false);
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
  const [content, setContent] = useState("");
  const [isUpdateTaskVisible, setIsUpdateTaskVisible] = useState(false);
  const [contentUpdate, setContentUpdate] = useState("");
  const [id, setId] = useState(0);
  // la tâche currente
  const [currentTask, setCurrentTask] = useState({});
  // la liste des taches
  const [listTask, setListTask] = useState([  
  ]);

  
useEffect( () => {
  AsyncStorage.getItem(storageKey)
      .then(storedTaskList => setListTask(JSON.parse(storedTaskList)))
}, [])
 // pour afficher le modal
  handleMenutaskVisiblity = (task) => {
    let currentTask = task;
    if(isMenuTaskVisible){
      currentTask = {}
    }
    setIsMenuTaskVisible(!isMenuTaskVisible);
    setCurrentTask(currentTask);
  };

  // button supprimer une tâche
  handleDeleteTask = () => {
   const index = lodash.findIndex(listTask, {id: currentTask.id});
   const myList = listTask;
   myList.splice(index, 1);
   setListTask(myList);
   setCurrentTask({});
   handleMenutaskVisiblity();
    setIsUpdateTaskVisible(false);
    saveTaskList();
  };

  // changer le status d'une tâche
  handleChangeStatusTask = () => {
   const updatedTask = currentTask;
   updatedTask.status = currentTask.status === "Terminer" ? "En cours" : "Terminer";
   const index = lodash.findIndex(listTask, {id: currentTask.id});
   const myList = listTask;
   myList[index] = updatedTask;
   setListTask(myList);
   setCurrentTask({});
   handleMenutaskVisiblity();
   setIsUpdateTaskVisible(false);
   saveTaskList();
  };

  // stocker la liste dans le storage
saveTaskList = () =>
{
  AsyncStorage.setItem(storageKey, JSON.stringify(listTask));
}
  //ajouter une tache
  onAddTask = () =>
  {
     const task = {
       id: listTask.length + 1,
       content: content,
       status: "En cours"
     }
     setListTask([ ...listTask, task ]);
     setIsAddTaskVisible(false);
     setContent("");
     saveTaskList();
  };
  
 
  // modifier une tache
  handleOnLonPress = (task) => {
    setId(task.id);
    setIsAddTaskVisible(false);
     setIsUpdateTaskVisible(true);
     setContentUpdate(task.content)
  }
  onUpdateTask = () => {
    const index = lodash.findIndex(listTask, {id: id});
   const myList = listTask;
   myList[index].content = contentUpdate;
   setListTask(myList);

  setIsUpdateTaskVisible(false);
  saveTaskList();
  }

  renderTaskList = () => {
    if(listTask.length > 0) {
      return (
<List taskList={listTask} onPressCallBack={handleMenutaskVisiblity} onLongPressCallBack={handleOnLonPress} />
      );
    }
    return (
      <View style={ style.noTask}>
        <Text style={style.textNoTask}>Vous avez oucune tâche pour l'instant Cliquer sur le bouton ajouter pour créer une tâche</Text>
      </View>
    );
     
  }

  return (
    <View style={{ flex: 1 }}>
      <View><Header title="Liste de tâches"></Header></View>
      {/* ajouter une tâche */}
      {
     isAddTaskVisible && 
      <View style={ style.viewprincipal }>
      <View>
      <Input name="content" placeholder="nom de votre tâche" type="text"
       onChangeText={content => setContent(content)} value={content} />
      </View>

      
      <View style={style.btnAdd}>
      <Button
        icon={<Icon name="heartbeat" size={20} marginLeft={6} color="red" />} iconRight
        title="Ajouter" type="outline"
        onPress={onAddTask} />
      </View>
    </View>
      }

      {/* Modifier une tâche */}
      {
     isUpdateTaskVisible && 
      <View style={ style.viewprincipal }>
      <View>
      <Input name="contentUpdate" placeholder="nom de votre tâche" type="text"
       onChangeText={contentUpdate => setContentUpdate(contentUpdate)} value={contentUpdate} />
      
      </View>
      <View style={style.btnAdd}>
      <Button
        icon={<Icon name="heartbeat" size={20} marginLeft={6} color="#000" />} iconRight
        title="Modifier" type="outline"
        onPress={onUpdateTask} />
      </View>
    </View>
      }
      <ScrollView> 
       {renderTaskList()}
     </ScrollView>

     <ModalPortal />
     <MenuTask isVisible={isMenuTaskVisible} onDisapearCallBack={handleMenutaskVisiblity}
     onDeleteTask={handleDeleteTask} onChangeStatusTask={handleChangeStatusTask}
     />
      {
        !isUpdateTaskVisible &&
      <ButtonAddTask onPressCallBack={() => { setIsAddTaskVisible(!isAddTaskVisible) }} />
      }
     </View>
    
  );
}

const style = StyleSheet.create({
  viewprincipal: {
    flexDirection: "column"
  },
  btnAdd:{
   marginLeft: 6,
   marginEnd: 6,
   marginBottom: 5,
  },
  noTask:{
    marginTop: 30,
    marginLeft: 20,
    alignItems: 'center',
    
  },
  textNoTask: {
    fontSize: 30,
    color: 'red'
  }
});