import { GraphQLClient } from "graphql-request";


const url = 'https://delrio.stepzen.net/exercise/list/__graphql';

const client = new GraphQLClient(url,{
    headers:{
        Authorization:
            `Apikey ${process.env.EXPO_PUBLIC_GRAPHQL_API_KEY}`
    }
});



export default client;