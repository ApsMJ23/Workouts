import { useMutation, useQueryClient } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import GraphQlClient from '../graphqlClient';


const mutationDocument = gql`
    mutation MyMutation($newSet:newSet!) {
  insertSet(
    collection: "sets"
    database: "workouts"
    dataSource: "Cluster0"
    document: $newSet
  ) {
    insertedId
  }
}
`


function NewSetInput({exerciseName}: {exerciseName: string|string[]}) {
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const queryClient = useQueryClient()
    const {mutate,isPending,error} = useMutation({
        mutationFn:(newSet:any)=>GraphQlClient.request(mutationDocument,{newSet}),
        onSuccess:()=>{
            setReps('')
            setWeight('')
            queryClient.invalidateQueries({
                queryKey:['sets',exerciseName]
            })
        }
    })
    const addSet = () => {
        const newSet = {
            reps: parseInt(reps),
            exercise: exerciseName,
            weight:0
        }
        if(Number.parseFloat(weight)){
            newSet.weight = Number.parseFloat(weight)
        }
        //save to db
        mutate(newSet)
    }
    console.log(error)
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