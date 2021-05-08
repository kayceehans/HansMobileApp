// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/Loader';
import api from '../api/userProfile';

const RegisterScreen = (props) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirm, setuserPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess ] = useState(false);
  
  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const PasswordInputRef = createRef();
  const PasswordConfirmInputRef = createRef();

  const userDetails = { };
  //function to add registration details to json server
  /*
  {statusText: "Created"
    "id": "kazeem.hassan",
    "name": "Kazeem Hassan",
    "Email": "kazeem.hassan@outlook.com",
    "Password": "test12345"
  }
  */
  const registerProfile = async (userDetails) => {
    const request = {
      id: uuid(),
      userDetails
    }
  const response = await api.post("/userProfile",request);
  debugger
   return response;
  }


  // Function to get uuid 
function uuid() {debugger
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


  const handleSubmitButton = async () => {debugger
    setErrortext('');
    if (!userName || !userEmail) {
      alert('Please fill Name/Email');
      return;
    }
   
    if (!userPassword || userPassword != userPasswordConfirm) {
      alert('Password and Confrim Password cannot be enpty and mut be same');
      return;
    }
    if (!userPasswordConfirm) {
      alert('Please fill Connfirm Password');
      return;
    }
    var check = localStorage.getItem("name");
        if(check!=null){ debugger
        // props.navigation.replace('DrawerNavigationRoutes');
        setLoading(false);
        setErrortext('Already Registered');
        alert("already Registered...Please Login")
         props.navigation.replace('LoginScreen');
         return;
      }

      
    //Show Loader
    setLoading(true);
   
    //Check if Profile Exist
    userDetails.name= userName;
    userDetails.Password= userPassword;
    userDetails.Email = userEmail;
     var user =registerProfile(userDetails);
    debugger
     alert(JSON.stringify(user)); 
  
    //If it does not exist, save it. assemble it as an object
    
   localStorage.setItem('name',JSON.stringify(userName));
   localStorage.setItem('email',JSON.stringify(userEmail));
   localStorage.setItem('password',JSON.stringify(userPassword)); 
   setIsRegistraionSuccess(true);
   setLoading(false);      

  };
  if (isRegistraionSuccess) {
    const name = localStorage.getItem('name');
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/success.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful for {name}
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#483d8b'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../Image/hanz.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current &&
                emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (UserEmail) => setUserEmail(UserEmail)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                PasswordInputRef.current &&
                PasswordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (userPassword) => setUserPassword(userPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={PasswordConfirmInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                addressInputRef.current &&
                addressInputRef.current.focus()
              }
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (userPasswordConfirm) => setuserPasswordConfirm(userPasswordConfirm)
              }
              underlineColorAndroid="#f000"
              placeholder="Confirm Password"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={PasswordConfirmInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
           </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>
              REGISTER
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});