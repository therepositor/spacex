const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server running and listening to port ${port}`)
})
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))
