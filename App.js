/*
 * Using example as a baseline, but code can record a user sound
 Todo: 
 1. Store sound file
 2. Put sound file into database(?)
 3. Allow multiple DIFFERENT sounds (Duplicate already existing? Create 'import' with ID to have additional sounds?)
 */

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function App() {
    const [recording, setRecording] = useState(null);
    const [recordingUri, setRecordingUri] = useState(null);
    const [playback, setPlayback] = useState(null);
    const [permissionsResponse, requestPermission] = Audio.usePermissions();

    const startRecording = async () => {


        if (permissionsResponse.status !== 'granted') {
            console.log("Requesting permissions");
            await requestPermission();
        }
        console.log("Permission is ", permissionsResponse.status);

        //set device specific values: you can enable sound to play even in silent mode, but this is poor form
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        })

        //begin recording
        console.log("Starting recording...");
        const { recording } = await Audio.Recording.createAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        console.log("...Recording started");
    
        console.error("Failed startRecording(): ", error);
    
}

const stopRecording = async () => {
    
        //need to actually stop the recoring
        await recording.stopAndUnloadAsync()
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        })
        //Need to save sound that was recorded.  Written as a file, can be stored using cache, which will last until app is reloaded
        const uri = recording.getURI();
        setRecordingUri(uri);

        setRecording(undefined);

        console.log("Recording stopped and stored at ", uri);

     
        console.error("Failed to stopRecording(): ", error);
    
}

const playRecording = async () => {
    const { sound } = await Audio.Sound.createAsync({
        uri: recordingUri
    })
    setPlayback(sound);
    await sound.replayAsync();
    console.log("Playing recoding from ", recordingUri);
}

useEffect(() => {
    return recording
        ? recording.stopAndUnloadAsync()
        : undefined;
}, []);

  return (
    <View style={styles.container}>
          <Button
              title={recording ? 'Stop Recording' : 'Start Recording'}
              onPress={recording ? stopRecording : startRecording}
          />

          {recordingUri &&
              <Button
                  title="Play the last sound"
                  onPress={playRecording}
              />
          }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
