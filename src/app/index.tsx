import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import exercises from '../../assets/data/exercises.json';
import ExerciseListItem from '../components/ExerciseListItem';

export default function App() {
  const exercise = exercises[0]
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={exercises}
        renderItem={({ item }) => <ExerciseListItem exercise={item} />}
        keyExtractor={(item) => item.name}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
