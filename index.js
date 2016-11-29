const app = require('express')();
const srv = require('http').createServer(app);
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const jwtSecret = new Buffer('JYZ9jnblzB3z9anrViyFds0J_4B06gufNOBlvAeQOK8d9FyysKulQ9iCgHNjuFnQ', 'base64');

app.use(bodyParser());
app.use((req, res, next) => {
  jwt.verify(req.get('Authorization'), jwtSecret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({message: 'Incorrect token'});
    }

    req.decodedToken = decoded;
    next();
  });
});

const users = {};
const usersMessages = {};

app.get('/users', (req, res, next) => {
  res.status(200).json(users);
});

app.post('/users', (req, res, next) => {
  const targetId = req.decodedToken.sub;
  users[targetId] = {nickname: 'We don\'t know'}

  res.status(200).json(users);
});

app.get('/user/me/messages', (req, res, next) => {
  const targetId = req.decodedToken.sub;
  const messages =
    usersMessages[targetId] = usersMessages[targetId] || [];

  res.status(200).json(messages);
});

app.post('/user/:userId/messages', (req, res, next) => {
  const targetId = req.params.userId;
  const messages =
    usersMessages[targetId] = usersMessages[targetId] || [];

  messages.push({sender: req.decodedToken.sub, text: req.body.text});

  res.status(200).send();
});

srv.listen(3000, function () {
  console.log('Listening on 3000');
});
