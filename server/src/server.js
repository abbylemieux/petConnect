import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import { expressMiddleware } from '@apollo/server/express4'
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pet-adoption').then((
    console.log('Connected to the database')
))
.catch(err => console.error(err));


const server = new ApolloServer({
    typeDefs,
    resolvers,
    /*context: ({ req }) => {
        const context = { user: req.user };
        return context;
    },*/
});

/*const { url } = startStandaloneServer(server{
    listen: {port: 5173},
});
console.log(`Server ready at ${url}`);*/

const startApolloServer = async () => {
    await server.start();
    await db();

    const PORT = process.env.PORT || 5173;
    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server,
        /*{
            context: authenticateToken
        }*/
    ));

    /*if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));

        app.get('*', (req, res) =>{
            res.sendFile(path.join(__dirname, '../client/dist/index.html'))
        });
    }*/

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
};

startApolloServer();