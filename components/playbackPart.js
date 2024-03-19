import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { Audio } from 'expo-av';

const PlaybackPart = ( recordingURI ) => {
    const [playback, setPlayback] = useState(null);
    const [permissionsResponse, requestPermission] = Audio.usePermissions();

    useEffect(() => {
        console.log("Received recordingUri in playback:", recordingURI);
    }, [recordingURI]);

    const playRecording = async () => {
        try {

            if (permissionsResponse.status !== 'granted') {
                console.log("Requesting permissions");
                await requestPermission();
            } else {
                console.log("Permission is ", permissionsResponse.status);
            }

            if (!recordingURI) {
                console.error("Something is wrong with the audio file path");
                return;
            }
            const { sound } = await Audio.Sound.createAsync({
                uri: recordingURI
            })
            setPlayback( sound );
            await sound.replayAsync();
            console.log("Playing recoding from ", recordingURI);
        } catch (error) {
            console.error("error playing from component playbackPart.js ", error);
        }
    }
    
    return (
        <View>
            <Button
                title="Play the sound"
                onPress={playRecording}
            />
        </View>
    );
}
export default PlaybackPart;
