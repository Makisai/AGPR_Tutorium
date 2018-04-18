const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.engine('.ejs', require('ejs').__express);
app.set('view engine','ejs');

const port = 3000;
app.listen(port, function(){
  console.log('listening on port' + port);
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.post('/calculate', function(request, response){
  const bitrate = request.body['bitrate'];
  const duration = request.body['duration'];

  if (isNaN(bitrate) || isNaN(duration) || bitrate < 0 || duration < 0){
    console.log('ERROR: Eingabe überpüfen');
    response.render('error',{
    'bitrate': bitrate,
    'duration': duration,
    'message': 'Please check your Entry :)'
  });
  }else{
    console.log('bitrate: '+ bitrate + ' duration: ' + duration);
    response.render('result',{
      'bitrate': bitrate,
      'duration': duration,
      'result': bitrate * duration
    })
  }
});
