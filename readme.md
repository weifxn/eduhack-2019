# Setup

1. Create `firebase.js` with your Firebase Credentials in the project root folder.

```js
 
import * as firebase from "firebase";

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

export default firebase.initializeApp(config)

```

2. Run following command to install `node_modules`

```
$ yarn 

// or if you use npm

$ npm install
```

3. Start!

```
$ yarn start

// or if you use npm

$ npm start
```

