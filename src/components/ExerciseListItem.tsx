import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

type ExerciseListItemProps = {
    exercise: {
        difficulty: string,
        equipment: string,
        instructions: string,
        muscle: string,
        name: string,
        type: string,
    }
}


export default function ExerciseListItem(props: ExerciseListItemProps) {
    const { difficulty, equipment, instructions, muscle, name, type } = props.exercise
    return (
        <Link href={`/${name}`} asChild={true}>
            <Pressable style={styles.exerciseContainer}>
            <Text style={styles.ExerciseName}>{name}</Text>
            <Text style={styles.ExerciseSubtext}>
                <Text style={styles.subValue}>{muscle}</Text> |{' '}
                <Text style={styles.subValue}>{equipment}</Text>
            </Text>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    exerciseContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16 ,
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
