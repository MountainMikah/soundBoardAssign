//import 'react-native-get-random-values';
import { Audio } from 'expo-av';
import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
//import { v4 as uuidv4 } from 'uuid';

const RecordingPart = ({ saveRecording }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recording, setRecording] = useState(null);
    const [permissionsResponse, requestPermission] = Audio.usePermissions();


    const startRecording = async () => {

        try {
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
            setIsRecording(true);
            setRecording(recording);
            console.log("...Recording started");
        } catch (error) {
            console.error("Failed startRecording(): ", error);
        }
    }

    const stopRecording = async () => {
        try {
            //need to actually stop the recoring
            await recording.stopAndUnloadAsync()
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            })

            //Need to save sound that was recorded.  Written as a file, can be stored using cache, which will last until app is reloaded
            const destinationURI = recording.getURI();

            
            saveRecording(destinationURI);
            mySoundCheck = null;
            mySoundCheck = recording.AVPlaybackStatus;
            console.log(mySoundCheck);
            setRecording(null);

            console.log("Recording stopped and stored at ", destinationURI);
            setIsRecording(false);

        } catch (error) {
            console.error("Failed to stopRecording(): ", error);
        }

    }


    useEffect(() => {
        return recording
            ? recording.stopAndUnloadAsync()
            : undefined
    }, []);

    return (

        <Button
            title={isRecording ? 'Stop Recording' : 'Start Recording'}
            onPress={isRecording ? stopRecording : startRecording}
        />
    );

}

export default RecordingPart;