import { useState } from "react";

import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  FlatList
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import Task from "./src/Task";

export default function App() {
  const [inputTask, setInputTask] = useState('');
  const [tasksList, setTasksList]= useState([
    {
      key: '1',
      item: 'Estudar Frontend'
    },
    {
      key: '2',
      item: 'Estudar Backend'
    },
    {
      key: '3',
      item: 'Estudar React Native'
    }
  ]);

  function handleAddTask(){
    if (inputTask === '') {
      return;
    }

    setTasksList((prevValue) => {
      setTasksList([...prevValue, {
        key: Date.now(),
        item: inputTask
      }]);
    });
    setInputTask("");
  }

  function handleDeleteTask(taskKey) {
    const newList = tasksList.filter((task) => {
      return (taskKey !== task.key)
    });

    setTasksList(newList);
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>
      
      <View style={styles.containerInput}>
        <TextInput 
          placeholder="Digite sua tarefa"
          style={styles.input}
          value={inputTask}
          onChangeText={ text => setInputTask(text) }
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAddTask}>
          <FontAwesome name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasksList}
        keyExtractor={ (item) => item.key }
        renderItem={ 
          ({ item }) => <Task data={item} deleteTask={ ()=> handleDeleteTask(item.key) }/> 
        }
        style={styles.list}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#22272e',
    paddingTop: 28
  },
  title:{
    fontWeight: 'bold',
    fontSize: 24,
    color:'#fff',
    marginTop: '5%',
    paddingLeft: '5%',
    marginBottom: 12
  },
  containerInput:{
    flexDirection: 'row',
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22
  },
  input:{
    width: '75%',
    backgroundColor: '#fbfbfb',
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  buttonAdd:{
    width: '15%',
    height: 44,
    backgroundColor: '#73f7ff',
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  list:{
    flex:1,
    backgroundColor: '#fff',
    paddingStart: '4%',
    paddingEnd: '4%'
  }
})

