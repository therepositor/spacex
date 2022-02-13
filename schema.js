const { GraphQLObjectType,
        GraphQLSchema,
        GraphQLList,
        GraphQLString,
        GraphQLID,
        GraphQLInt, 
        GraphQLNonNull} = require('graphql');
const axios = require('axios');

const LaunchesType = new GraphQLObjectType({
    name: 'launches',
    fields: () => ({
        mission_name: {type: new GraphQLNonNull(GraphQLString)},
        flight_number: {type: new GraphQLNonNull(GraphQLInt)},
        mission_date: {type: new GraphQLNonNull(GraphQLString)},
        rocket: {type: RocketType}
    })
})
// const RocketsType = new GraphQLObjectType({
//     name: 'rockets',
//     fields: () => ({
        
//     })
// })
const RocketType = new GraphQLObjectType({
    name: 'rocket',
    fields: () => ({
        rocket_name: {type: new GraphQLNonNull(GraphQLString)},
        rocket_id: {type: new GraphQLNonNull(GraphQLID)}
    })
})
const launchType = new GraphQLObjectType({
    name: 'launch',
    fields: () => ({
        mission_name: {type: new GraphQLNonNull(GraphQLString)},
        mission_number: {type: GraphQLInt}
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        launches: {
            type: new GraphQLList(LaunchesType),
            
            resolve: (parent,args) => {
                return axios.get('https://api.spacexdata.com/v3/launches')
                .then(resp => resp.data)
            }
        },
        rocket : {
            type: new GraphQLList(RocketType),
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                .then(resp => resp.data)
            }
        },
        launch : {
            type: launchType,
            args: {
                flight_number : {type: GraphQLInt}
            },
            resolve: (parent, args) => {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(resp => resp.data)
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            
            resolve: (parent,args) => {
                return axios.get('https://api.spacexdata.com/v3/rockets')
                .then(resp => resp.data)
            }
        },
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})