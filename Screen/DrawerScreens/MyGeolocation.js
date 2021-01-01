import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';



const MyGeolocation =  ()=>{debugger
const [location,setLocation] = useState(null);
const [geocode,setGeocode] = useState(null);
const [errorMessage,setErrorMessage] = useState("");

const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    const { latitude , longitude } = location.coords
    this.getGeocodeAsync({latitude, longitude})
    this.setState({ location: {latitude, longitude}});

  };

  const getGeocodeAsync= async (location) => {debugger
    let geocode = await Location.reverseGeocodeAsync(location)
    this.setState({ geocode})
  };
  
return (
   
      <View style={styles.overlay}>        
        <Text style={styles.heading1}>{geocode  ? `${geocode[0].city}, ${geocode[0].isoCountryCode}` :""}</Text>
        <Text style={styles.heading2}>{geocode ? geocode[0].street :""}</Text>
        <Text style={styles.heading3}>{location ? `${location.latitude}, ${location.longitude}` :""}</Text>
        <Text style={styles.heading2}>{errorMessage}</Text>
      </View>
   
  );

};

export default MyGeolocation;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    overlay:{
      backgroundColor:"#00000070",
      height:"100%",
      width:"100%",
      justifyContent:"center",
      alignItems:"center"
    },
    heading1:{
      color:"#fff",
      fontWeight:"bold",
      fontSize:30,
      margin:20
    },
    heading2:{
      color:"#fff",
      margin:5,
      fontWeight:"bold",
      fontSize:15
    },
    heading3:{
      color:"#fff",
      margin:5
    }
  });