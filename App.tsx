import React,{useState} from 'react';
import { View, Text, StyleSheet,TextInput,Button, Pressable,FlatList} from 'react-native';
import {Svg,Path} from 'react-native-svg'


export default function App() {
const [task,setTask]=useState("")
const [ToDoList,setToDoList]=useState([]);

const addTask =()=>{
  if (task.trim().length ===0) return;

  const newTask={
    id:Date.now().toString(), //unique ID
    text:task,
    completed:false,
  };

  setToDoList([...ToDoList,newTask]);
  setTask(""); //clearing task 
}

const deleteTask=(id)=>{
  setToDoList(ToDoList.filter((currentValue)=>currentValue.id !==id));
}

const renderItem =({item})=>(
  <View style={[
    styles.renderContainer,
    item.completed ? { borderColor: '#00FF00' } : { borderColor: '#FF0000' }
  ]}>
    <Text>{item.text}</Text>
 <Pressable onPress={()=>toggleComplete(item.id)} style={styles.completeButton}>
  <Text>O</Text>
</Pressable>
    <Pressable onPress={()=>deleteTask(item.id)} style={styles.deleteButton}>
  <Text>X</Text>
</Pressable>
  </View>
)

const toggleComplete =(id)=>{
  const updatedList =ToDoList.map((task)=>{
    if(task.id===id){
    return {...task,completed:!task.completed};}
    else
      return task;
    
  });

  setToDoList(updatedList);

}

  return (
    <View style={styles.container}>
      <View style={styles.navbar}><Text style={styles.navText}>To Do List</Text></View>
   
        <View style={styles.textInput_cont}>
<Svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" >
<Path d="M19 3H5C3.89543 3 3 3.89543 3 5V6.17157C3 6.70201 3.21071 7.21071 3.58579 7.58579L9.41421 13.4142C9.78929 13.7893 10 14.298 10 14.8284V20V20.2857C10 20.9183 10.7649 21.2351 11.2122 20.7878L12 20L13.4142 18.5858C13.7893 18.2107 14 17.702 14 17.1716V14.8284C14 14.298 14.2107 13.7893 14.5858 13.4142L20.4142 7.58579C20.7893 7.21071 21 6.70201 21 6.17157V5C21 3.89543 20.1046 3 19 3Z" stroke="#007AFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>
        <TextInput placeholder='Type here' style={styles.textInput} placeholderTextColor='#007AFB' onChangeText={setTask} value={task} />
  <Pressable onPress={addTask} style={styles.addTask}>
  <Text style={styles.addButton}>Add</Text>
</Pressable>

      </View>
      

      <FlatList
      data={ToDoList}
      keyExtractor={(item)=>item.id}
      renderItem={renderItem} style={styles.flatlistContainer}
      />

    </View>
  );
}

const styles = StyleSheet.create({

addButton:{
  color:'white',fontSize:16, fontWeight:'bold'
}
  ,container: {
    flex: 1,
    backgroundColor:'#C1DFFF' ,
  },
  navbar:{
justifyContent:'center',
alignItems:'center',
backgroundColor:'#007AFB',
paddingTop:50,
  },
  navText:{
    fontSize:40,
    fontWeight:'bold',
  color:'white',
paddingBottom:10},

textInput:{
  borderRadius:30,
  backgroundColor:'white',
  width:300,
  height:40,
 color:'#007AFB',fontWeight:'bold',fontSize:16,
 textAlign:'center',
  shadowColor: '#000',
    shadowOpacity: 0.9,
    // ✅ Shadow for Android
    elevation: 10,
  
},
textInput_cont:{
  marginTop:15,
 alignItems:'center',
 justifyContent:'center',
 flexDirection:'row',gap:10,marginLeft:15,
paddingBottom:15

},
addTask:{
 backgroundColor: '#007AFB',
 padding:8,
 borderRadius:10,
   shadowColor: '#000',
    shadowOpacity: 0.9,
    // ✅ Shadow for Android
    elevation: 10,
},
renderContainer:{
  flexDirection:'row',
  justifyContent:'center',
  backgroundColor:'white',
  marginTop:20,
  marginLeft:30,
  marginRight:30,
  paddingTop:15,
  paddingBottom:15,
  borderRadius:10,
  shadowColor: '#000',
    shadowOpacity: 0.9,
    // ✅ Shadow for Android
    elevation: 10,
    gap:50,
     borderWidth: 3,

},
deleteButton:{
  backgroundColor:'#FFC2A6',
  borderTopRightRadius:7, borderBottomRightRadius:7,
  paddingLeft:15,paddingRight:15,
  padding:15,
  position:'absolute',
  right:0,
  justifyContent:'center',
  alignItems:'center'
},
completeButton:{
  backgroundColor:'#C8FFB3',
  borderTopLeftRadius:7, borderBottomLeftRadius:7,
  paddingLeft:15,paddingRight:15,
  padding:15,
  position:'absolute',
  right:38,
  justifyContent:'center',
  alignItems:'center',
  

}
,
flatlistContainer:{
  marginBottom:30
}

});