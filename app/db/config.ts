import firebase from 'firebase';

let app: firebase.app.App;

const apiKey = process.env.API_KEY;
const databaseURL = process.env.DATABASE_URL;

try {
    app = firebase.initializeApp({ apiKey, databaseURL });
} catch {
    app = firebase.app();
}

export default app;
