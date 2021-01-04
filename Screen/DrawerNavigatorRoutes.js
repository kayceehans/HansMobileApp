// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import MyGeolocation from './DrawerScreens/MyGeolocation';
import MyPhoneContacts from './DrawerScreens/MyPhoneContacts';
import MyCodeScanner from './DrawerScreens/CodeScanner';
import BarCodeScanner from './DrawerScreens/BarCodeScanner';
import MyToDos from './DrawerScreens/MyToDos';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const MyToDosStack = ({navigation})=>{
  return (
  <Stack.Navigator initialRouteName="MyToDos">
  <Stack.Screen 
         name="MyToDos" 
         component={MyToDos} 
         options={{title:'My Task Notes',
         headerLeft: () => (
              <NavigationDrawerHeader navigationProps={navigation} />
            ),
            headerStyle: {
              backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },}}>
  
         </Stack.Screen>
  </Stack.Navigator>
  )}



const BarCodeScannerStack = ({navigation})=>{
  return (
  <Stack.Navigator initialRouteName="BarCodeScanner">
  <Stack.Screen 
         name="BarCodeScanner" 
         component={BarCodeScanner} 
         options={{title:'Bar Code Scanner',
         headerLeft: () => (
              <NavigationDrawerHeader navigationProps={navigation} />
            ),
            headerStyle: {
              backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },}}>
  
         </Stack.Screen>
  </Stack.Navigator>
  )}
  

const CodeScannerStack = ({navigation})=>{
return (
<Stack.Navigator initialRouteName="MyCodeScanner">
<Stack.Screen 
       name="MyCodeScanner" 
       component={MyCodeScanner} 
       options={{title:'QR Code Scanner',
       headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },}}>

       </Stack.Screen>
</Stack.Navigator>
)}

const MyPhoneContactStack = ({navigation})=>{
  return (
       <Stack.Navigator initialRouteNameRoute="MyPhoneContacts">
       <Stack.Screen 
       name="MyPhoneContacts" 
       component={MyPhoneContacts} 
       options={{title:'Contacts',
       headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },}}>

       </Stack.Screen>

       </Stack.Navigator>
  );


}

const MyGeolocationStack = ({navigation})=>{
  return (
<Stack.Navigator initialRouteName="MyGeolocation">
    <Stack.Screen 
    name ="Geolocation" 
    component={MyGeolocation} 
    options={{
      title:'Geolocation',
      headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },}}>

    </Stack.Screen>
  </Stack.Navigator>
  )  
}

const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home' , //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const settingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: 'Home'}}
        component={homeScreenStack}
      />  
      <Drawer.Screen
      name="MyToDosStack" 
      options={{drawerLabel: 'TO DO!'}}
        component={MyToDosStack}>

        </Drawer.Screen>    
      <Drawer.Screen
      name="MyGeolocationStack" 
      options={{drawerLabel: 'Geolocation'}}
        component={MyGeolocationStack}>

        </Drawer.Screen>
        <Drawer.Screen
      name="MyPhoneContactStack" 
      options={{drawerLabel: 'Contacts'}}
        component={MyPhoneContactStack}>

        </Drawer.Screen>
        <Drawer.Screen
      name="BarCodeScannerStack" 
      options={{drawerLabel: 'BarCodeScanner'}}
        component={BarCodeScannerStack}>
        </Drawer.Screen>
        <Drawer.Screen
      name="CodeScannerStack" 
      options={{drawerLabel: 'QRCodeScanner'}}
        component={CodeScannerStack}>
        </Drawer.Screen>
        <Drawer.Screen
        name="settingScreenStack"
        options={{drawerLabel: 'Setting'}}
        component={settingScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;