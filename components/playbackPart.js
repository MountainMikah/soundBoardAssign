import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { Audio } from 'expo-av';

const PlaybackPart = (recordingUri) => {
    const [playback, setPlayback] = useState(null);
    const [permissionsResponse, requestPermission] = Audio.usePermissions();

    const playRecording = async () => {
        try {


            //sound isn't play, is it a permissions thing?
            if (permissionsResponse.status !== 'granted') {
                console.log("Requesting permissions");
                await requestPermission();
            }
            console.log("Permission is ", permissionsResponse.status);

            if (!recordingUri) {
                console.error("Something is wrong with the audio file path");
                return;
            }
            const { sound } = await Audio.Sound.createAsync({
                uri: recordingUri
            })
            setPlayback(sound);
            await sound.replayAsync();
            console.log("Playing recoding from ", recordingUri);
        } catch (error) {
            console.error("error playing from component playbackPart.js ", error);
            console.log("This is where the sound is coming from ", recordingUri);

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
