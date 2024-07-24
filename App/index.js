// Filename: index.js
// Combined code from all files

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant. Please provide answers for given requests."
            },
            {
              role: "user",
              content: "Can you list various types of workouts with short descriptions?"
            }
          ],
          model: "gpt-4o"
        });
        
        const { data } = response;
        const resultString = data.response;
        const workoutList = resultString.split('\n').map((workout, index) => ({ id: index.toString(), name: workout }));
        
        setWorkouts(workoutList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);
  
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.scrollView}>
      {workouts.map(workout => (
        <View key={workout.id} style={styles.workoutContainer}>
          <Text style={styles.workoutText}>{workout.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
  workoutContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  workoutText: {
    fontSize: 16,
  },
});

const App = () => {
  return (
    <SafeAreaView style={stylesApp.container}>
      <Text style={stylesApp.title}>Workout Tracker</Text>
      <WorkoutList />
    </SafeAreaView>
  );
}

const stylesApp = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;