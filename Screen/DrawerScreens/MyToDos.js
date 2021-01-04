import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

function Items({ done: doneHeading, onPressItem }) {
  const [items, setItems] = React.useState(null);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [doneHeading ? 1 : 0],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  const heading = doneHeading ? 'Completed' : 'Pending Task';

  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {items.map(({ id, done, value }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? '#1c9963' : '#fff',
            borderColor: '#000',
            borderWidth: 1,
            padding: 8
          }}
        >
          <Text style={{ color: done ? '#fff' : '#000' }}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function MyToDos() {
  const [text, setText] = React.useState(null)
  const [forceUpdate, forceUpdateId] = useForceUpdate()

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, done int, value text);'
      );
    });
  }, []);

  const add = (text) => {
    // is text empty?
    if (text === null || text === '') {
      return false;
    }

    db.transaction(
      tx => {
        tx.executeSql('insert into items (done, value) values (0, ?)', [text]);
        tx.executeSql('select * from items', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>WRITE YOUR TASK</Text>
      <View style={styles.flexRow}>
        <TextInput
          onChangeText={text => setText(text)}
          onSubmitEditing={() => {
            add(text);
            setText(null);
          }}
          placeholder="what do you need to do?"
          style={styles.input}
          value={text}
        />
      </View>
      <ScrollView style={styles.listArea}>
        <Items
          key={`forceupdate-todo-${forceUpdateId}`}
          done={false}
          onPressItem={id =>
            db.transaction(
              tx => {
                tx.executeSql(`update items set done = 1 where id = ?;`, [
                  id
                ]);
              },
              null,
              forceUpdate
            )
          }
        />
        <Items
          done
          key={`forceupdate-done-${forceUpdateId}`}
          onPressItem={id =>
            db.transaction(
              tx => {
                tx.executeSql(`delete from items where id = ?;`, [id]);
              },
              null,
              forceUpdate
            )
          }
        />
      </ScrollView>
    </View>
  );

}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green'
    
  },
  flexRow: {
    flexDirection: 'row'
  },
  input: {
    borderColor: '#4630eb',
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8
  },
  listArea: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    paddingTop: 16
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
    color: 'red'
  }
});
































// import React, { useEffect, useState} from 'react';
// import * as Contacts from 'expo-contacts';
// import { StyleSheet, View, Text, FlatList } from 'react-native';

//     export default function ToDos(){
       
//        const [taks,setTask] = useState([]); 
//        const handleSubmit = task => {
//             this.setState({tasks: [...this.state.tasks, task]});
//           }
          
//          const handleDelete = (index) => {
//             const newArr = [...this.state.tasks];
//             newArr.splice(index, 1);
//             this.setState({tasks: newArr});
//           }      
          
//             return(
//               <div className='wrapper'>
//                 <div className='card frame'>
//                   <Header numTodos={this.state.tasks.length} />
//                   <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
//                   <SubmitForm onFormSubmit={this.handleSubmit} />
//                 </div>
//               </div>
//             );
//           } 
        
        
        
//         class SubmitForm extends React.Component {
//           state = { term: '' };
        
//           handleSubmit = (e) => {
//             e.preventDefault();
//             if(this.state.term === '') return;
//             this.props.onFormSubmit(this.state.term);
//             this.setState({ term: '' });
//           }
        
//           render() {
//             return(
//               <form onSubmit={this.handleSubmit}>
//                 <input 
//                   type='text'
//                   className='input'
//                   placeholder='Enter Item'
//                   value={this.state.term}
//                   onChange={(e) => this.setState({term: e.target.value})}
//                 />
//                 <button className='button'>Submit</button>
//               </form>
//             );
//           }
//         }
        
        
//         const Header = (props) => {
//           return(
//             <div className='card-header'>
//               <h1 className='card-header-title header'>
//                 You have {props.numTodos} Todos
//               </h1>
//             </div>
//           )
//         }
        
        
//         const TodoList = (props) => {
//           const todos = props.tasks.map((todo, index) => {
//             return <Todo content={todo} key={index} id={index} onDelete={props.onDelete} />
//           })
//           return( 
//             <div className='list-wrapper'>
//               {todos}
//             </div>
//           );
//         }
        
//         const Todo = (props) => {
//           return(
//             <div className='list-item'>
//               {props.content}
//               <button class="delete is-pulled-right" onClick={() => {props.onDelete(props.id)}}></button>
//             </div>
//           );
//         }

//     }
    
  
  