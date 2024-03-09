import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'

function NewSetInput() {
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const addSet = () => {
        console.warn('add set', reps, weight)

        //save to db

        //clear inputs
        setReps('')
        setWeight('')
    }
    return (
        <View style={styles.container}>
            <TextInput
                value={weight}
                onChangeText={setWeight}
                placeholder="Weight"
                style={styles.input}
                keyboardType='numeric'
            />
            <TextInput
                placeholder="Reps" 
                style={styles.input} 
                value={reps} 
                onChangeText={setReps}
                keyboardType='numeric'
            />
            <Button onPress={addSet} title='Add' />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gainsboro',
        padding: 10,
        flex: 1,
        borderRadius: 5
    }
})

export default NewSetInput