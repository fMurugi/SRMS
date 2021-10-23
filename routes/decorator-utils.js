// ensures user is logged in before continuing
const isLoggedIn = (req, res) => {
  // check if we have an active session, otherwise redirect to login
  if(req.session.regNo){
    res.redirect('/login')
  }
}

module.exports = {isLoggedIn}