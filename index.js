const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const authenticator = require('./authenticator')


app.use(bodyParser.json());
app.post('/',authenticator.getAccessToken)
app.get('/', authenticator.checkAccessToken)
app.get('/resources', authenticator.checkResourceAccessToken)

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


