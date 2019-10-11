const express = require('express');
const router = express.Router();
const { generateServerSeed, sha512, combine, getResult } = require('../utils');
// _These are for illustration purposes only_, you shouldn't store values on a node instance as these
// values will be erased when the server is closed and also it doesn't allow for more that one user.

// Ideally the each user should have their own server-seed stored in their profile and the nonce will
// be the number of the results + 1

let results = [];
const user = {
  serverSeed: '',
};

router.get('/hashed-server-seed', function(req, res, next) {
  user.serverSeed = generateServerSeed();
  res.send(sha512(user.serverSeed));
});
router.get('/result', function(req, res, next) {
  // get current server seed specific to the current user
  const { serverSeed } = user;
  // get client seed from the request query parameters, the client seed is provided by the client's browser
  const { clientSeed } = req.query;
  // get nonce by incrementing the number of results
  const nonce = results.length + 1;
  // RESULT GENERATION
  // combine values -> append them to one another
  const combination = combine(serverSeed, clientSeed, nonce);
  // create a result object
  const newResult = {
    result: getResult(sha512(combination)),
    serverSeed,
    nonce,
  };
  // NEW SERVER SEED
  // generate a new server seed
  user.serverSeed = generateServerSeed();
  // RESULT RETURNING
  // insert into our "database" the new result
  results.push(newResult);
  // return values, the result and the plain server seed with nonce
  res.json(newResult);
});
router.get('/verify', function(req, res, next) {
  // get the data provided by the client
  const { clientSeed, serverSeed, nonce } = req.query;
  // create a combination from the provided data
  const combination = combine(serverSeed, clientSeed, nonce);
  // generate a result from the data
  const result = getResult(sha512(combination));
  // return to client
  res.send(String(result));
});
module.exports = router;
