// Server config
const PORT = process.env.PORT || 8080;
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const app = express();

// Server set up
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1'],
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Separate routes for each resources: user routes for authentication and api routes for inventory
// auth routes
const db = require('./db/index.js');
const apiRouter = express.Router();
const userRoutes = require('./routes/user');
userRoutes(userRouter, db);
app.use('/user', userRoutes);

// api routes for inventory
const apiRouter = express.Router();
apiRoutes(apiROuter, db);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log('server is listening on port:', port);
});
