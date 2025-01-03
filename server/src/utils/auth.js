import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

const authenticateToken = (req) => {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if(req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    if(!token){
        return req;
    }

    try{
        const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2h' });
        req.user = data;
    } catch (err) {
        console.error('Invalid token');
    }
};

const signToken = (username, _id) => {
    const payload = { username, _id };
    return jwt.sign({ data: payload }, process.env.JWT_SECRET_KEY || '', { expiresIn: '2h' });
};

class AuthenticationError extends GraphQLError {
  constructor(message) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}

export { authenticateToken, signToken, AuthenticationError };