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
import { Video } from 'expo-av';


const VideoPlayer = async ()=>{debugger


    return (
   
        <Video
           source={{ uri: 'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_1280_10MG.mp4' }}
          shouldPlay
                 useNativeControls
style={{ width: "100%", height: "50%" }}
/>
     
    );

};

export default VideoPlayer;

