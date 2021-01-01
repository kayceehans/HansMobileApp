import React, { useEffect, useState} from 'react';
import * as Contacts from 'expo-contacts';
import { StyleSheet, View, Text, FlatList } from 'react-native'

export default function App() {
  const [contacts, setContacts ] = useState([])
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data)
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList 
        data={contacts}
        renderItem={({item}) => {
          return (
            <Text style = {styles.text}>{`${item.name} (${item.phoneNumbers ? item.phoneNumbers[0].number : ''})`}</Text>
          )
        }}
      />
    </View>
  );
}

// const styles = StyleSheet.create ({
//     item: {
//        flexDirection: 'row',
//        justifyContent: 'space-between',
//        alignItems: 'center',
//        padding: 30,
//        margin: 2,
//        textAlign: 'center',
//        borderColor: '#2a4944',
//        borderWidth: 1,
//        backgroundColor: '#d2f7f1'
//     },
//   text: {
//     color:'red', padding:1,margin:1,textAlign:'center',fontWeight: 'bold'
//   }
//  })
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    textAlign: 'center',
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1'
 },
  text: {
    color:'red', padding:1,margin:1,textAlign:'center',fontWeight: 'bold'
  }
});