import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import db from './config/connection.js';
import { authenticateToken } from './utils/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173;

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, MONGODB_URI } = process.env;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use authenticateToken middleware
app.use(authenticateToken);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Pass the user information to the context
        return { user: req.user };
    }
});

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    await db();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Click here to view this app: http://${MONGODB_URI}:${PORT}`);
        //console.log(`Google OAuth2 callback URL: http://localhost:${PORT}/oauth2callback`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
    });
};

// Endpoint to handle OAuth2 callback and exchange authorization code for tokens
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Refresh Token:', tokens.refresh_token);
    res.send('Authorization successful! You can close this tab.');
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    res.status(500).send('Error retrieving tokens');
  }
});

startApolloServer().catch(err => {
    console.error('Server start error:', err);
});

// Endpoint to handle OAuth2 callback and exchange authorization code for tokens
/*app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Refresh Token:', tokens.refresh_token);
    res.send('Authorization successful! You can close this tab.');
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    res.status(500).send('Error retrieving tokens');
  }
});*/