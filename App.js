/*
 * Using example as a baseline, but code can record a user sound
 Todo: 
 1. Store sound file
 2. Put sound file into database(?)
 */

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import PlaybackPart from './components/playbackPart';
import RecordingPart from './components/recordNew';
import * as FileSystem from 'expo-file-system';

export default function App() {
    const [recordingUri, setRecordingUri] = useState(null);
    const [recordings, setRecordings] = useState([]);
    const saveRecording = (filePath) => {
        setRecordings((prevRecordings) => [...prevRecordings, filePath]);
    };

  return (
      <View style={styles.container}>
          <RecordingPart saveRecording={saveRecording} />
          {recordings.map((audioPath, index) => (
              <PlaybackPart audioPath={audioPath} key={index} />
          ))}
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
 