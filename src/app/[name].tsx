import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import exercises from "../../assets/data/exercises.json";
import { Stack } from "expo-router";
import { useState } from "react";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import graphQLClient from '../graphqlClient';

const exerciseQuery = gql`
  query exercises($name: String) {
    exercises(name: $name) {
      name
      muscle
      instructions
      equipment
    }
  }
`;

export default function ExerciseDetailsScreen() {
    const router = useRouter();
    const name = useLocalSearchParams().name;
    const { data, isLoading, error }: { data: any, isLoading: boolean, error: any } = useQuery({
        queryKey: ['exercises', name],
        queryFn: async () => {
            return graphQLClient.request(exerciseQuery, { name })
        }
    })
    const [showMore, setShowMore] = useState(false);
    const exercise = data?.exercises[0]
    if (!exercise && !isLoading) {
        return (
            <View>
                <Text>Exercise not found</Text>
            </View>
        );
    }
    if (isLoading) {
        return <ActivityIndicator />
    }
    if (error) {
        return <Text>{error.message}</Text>
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen
                options={{
                    title: exercise.name,
                    headerBackTitleVisible: false,
                }}
            />
            <View style={styles.panel}>
                <Text style={styles.ExerciseName}>{name}</Text>
                <Text style={styles.ExerciseSubtext}>
                    <Text style={styles.subValue}>{exercise.muscle}</Text> |{" "}
                    <Text style={styles.subValue}>{exercise.equipment}</Text>
                </Text>
            </View>
            <View style={styles.panel}>
                <Text style={styles.instructions} numberOfLines={showMore ? 0 : 3}>
                    {exercise.instructions}
                </Text>
                <Text onPress={() => setShowMore(!showMore)} style={styles.seeMore}>
                    {showMore ? "See Less..." : "See More..."}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        padding: 10,
    },
    panel: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    instructions: {
        fontSize: 16,
        lineHeight: 20,
    },
    ExerciseName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    ExerciseSubtext: {
        color: "dimgrey",
    },
    subValue: {
        color: "dimgrey",
        fontWeight: "normal",
    },
    seeMore: {
        alignSelf: "center",
        padding: 5,
        fontWeight: "600",
        color: "grey",
    },
});
