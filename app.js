import express from "express";
import {graphqlHTTP} from "express-graphql";
import graphQlSchema from "./graphql/schema/index.js";
import graphQlResolvers from "./graphql/resolver/index.js";
import connection from "./config/database.js";
// import grahqlsc from "./graphql/schema/schema.graphql";
// import {makeExecutableSchema} from "graphql-tools";

//Initialization
const app = express();
app.use(express.json());
connection.connect();

//Middlewares
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));


//Graphql Route
app.use('/api', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
}));

//Rest Route
app.get('/view', (req, res)=>{
    res.render('index')
})

app.get('/manual',(req,res)=> {
    console.log(req);
    return res.status(200).render('dummy');
})

// app.get('/callbackgoogle',passport.authenticate( 'google', {
//     successRedirect: '/manual',
//     failureRedirect: '/auth/google/failure'
// }))
// app.get('/auth/google',
//     passport.authenticate('google', { scope: [ 'email', 'profile' ] }
// ));
const PORT =  process.env.PORT || 5000;
app.listen(PORT);
console.log('Running a GraphQL API server at http://localhost:5000/api');
console.log('View Engine Running at http://localhost:5000/view');