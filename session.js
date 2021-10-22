/** express session built using a sqlite db */
const session = require('express-session')
const SqliteStore = require('connect-sqlite3')(session);

const oneDay = 1000 * 60 * 60 *24;
const sessionName = 'SRMS';

const sessionOptions = {
  store: new SqliteStore(),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: oneDay
  },
  sessionName: sessionName,
  secret: process.env.SESSION_SECRET || 'whisper',
  saveUninitialized:false,
    resave: false,
}

module.export=sessionOptions;