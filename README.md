# **Node-MongoDB-Boiling-Plate**

clone **locally**

```
git clone https://github.com/makstyle119/Node-MongoDB-Boiling-Plate.git
```

To **start** Working on this template first you have you run the **command** to install all the require packages

```
npm install
```

after thats you have you create a **.env** file.

```
touch .env
```

and Put this code inside of the file( replace the dummy lines with actual code).

```
PORT=5000
API_URL='/api/v1'
NODE_ENV='Development'
SECRET_KEY='Your Secret Key'
MONGO_URI='Your MongoDB URL'
```

To **start** the application

```
// for node
npm start
// for nodemon
npm run dev
```

**folder Structure**

```
└── config
    └── index.js
└── Constant
    └── index.js
└── Controllers
    └── User.js
└── Database
    └── MongoDB.js
└── log
    └── index.js
└── models
    └── user.js
└── routes
    └── index.js
└── app.js
└── .env (that you have to create)
```
