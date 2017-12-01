var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendfile('public/form.html');
});


app.get('/watson', function (req, res) {
  res.send('Hello watson!');
});

var context = null;

app.get('/message', function (req, res) {
  console.dir(req.query.mensagem);
  conversation.message({
    input: { text: req.query.mensagem},
    context: context,
    workspace_id: 'd4080d04-704a-443d-b4df-5b8aec336975'
   }, function(err, response) {
       if (err) {
         console.error(err);
       } else {
         console.dir(response);
         context = response.context
        //res.send(JSON.stringify(response, null, 2));
        res.send(response);
       }
  });
  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var conversation = new ConversationV1({
  username: 'cab89290-edc3-48c1-97ec-c34b475b4bce',
  password: '7EDawGBiUeEh',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});