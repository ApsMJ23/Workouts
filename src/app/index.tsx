import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ExerciseListItem from '../components/ExerciseListItem';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import client from '../graphqlClient';

const exercisesquery = gql`
query exercises($muscle: String, $name: String){
  exercises(muscle: $muscle, name: $name){
      muscle
      name
      equipment
  }
}`;

export default function ExercisesScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      return client.request(exercisesquery)
    }
  })
  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>{error.message}</Text>
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        //@ts-ignore
        data={data.exercises}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
