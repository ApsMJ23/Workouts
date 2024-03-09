import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request'
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import client from '../graphqlClient'
import { SafeAreaView } from 'react-native-safe-area-context';

const setsQuery = gql`
  query sets {
    sets {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const SetsList = () => {

    const { data, isLoading }: { data: any, isLoading: boolean } = useQuery({
        queryKey: ['sets'],
        queryFn: async () => {
            return client.request(setsQuery)
        }
    })

    if (isLoading) {
        return <ActivityIndicator />
    }
    return (
        <FlatList
            data={data.sets.documents}
            renderItem={({ item }) => 
            <Text style={{backgroundColor:'white',marginVertical:5,padding:10,borderRadius:5,overflow:'hidden'}}>
                {item.reps}x{item.weight}
            </Text>}
            horizontal={false}
            keyExtractor={item => item._id} />
    )
}

export default SetsList