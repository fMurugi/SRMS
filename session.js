/** express session built using a sqlite db */
const session = require('express-session')
const SqliteStore = require('connect-sqlite3')(session);

const oneDay = 1000 * 60 * 60 *24;
const sessionName = 'SRMS';

const sessionOptions = {
  sessionName: sessionName,
  secret: process.env.SESSION_SECRET || 'whisper',
  saveUninitialized:true,
  resave: false,
  store: new SqliteStore({db:'sessions.sqlite'}), //TODO make configurable
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: oneDay
  }
}

module.exports={sessionOptions,sessionName};