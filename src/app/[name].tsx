import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import exercises from '../../assets/data/exercises.json'
import { Stack } from 'expo-router'




export default function ExerciseDetailsScreen() {
    const router = useRouter();
    const name = useLocalSearchParams().name;
    const exercise = exercises.find((exercise) => exercise.name === name);
    if (!exercise) {
        return (
            <View>
                <Text>Exercise not found</Text>
            </View>
        )
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{
                title: exercise.name,
                headerBackTitleVisible: false,
            }} />
            <View style={styles.panel}>
            <Text style={styles.ExerciseName}>{name}</Text>
            <Text style={styles.ExerciseSubtext}>
                <Text style={styles.subValue}>{exercise.muscle}</Text> |{' '}
                <Text style={styles.subValue}>{exercise.equipment}</Text>
            </Text>
            </View>
            <View style={styles.panel}>
            <Text style={styles.instructions}>{exercise.instructions}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        gap:20,
        padding:10
    },
    panel: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    instructions: {
        fontSize: 16,
        lineHeight: 20,
    },
    ExerciseName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    ExerciseSubtext: {
        color: 'dimgrey',
    },
    subValue: {
        color: 'dimgrey',
        fontWeight: 'normal',
    }
})