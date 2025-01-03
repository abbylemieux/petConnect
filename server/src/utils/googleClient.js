import { google } from 'googleapis';
//const { google } = pkg;
import dotenv from 'dotenv';

//dotenv.config();
dotenv.config({ path: 'server\\.env' });


//const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

const scopes = [
    'https://www.googleapis.com/auth/calendar'
];
  
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
});

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

console.log('Authorize this app by visiting this url:', authUrl);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export { oauth2Client };
export default calendar;

/*import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: 'server\\.env' });

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

if (REFRESH_TOKEN) {
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
}

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export default calendar;*/