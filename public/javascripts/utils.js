/**
 * Generate a random string with a specified length.
 * @param length - String length
 * @returns {string}
 */
const randomString = length => {
  const availableChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString +=
      availableChars[Math.floor(Math.random() * availableChars.length)];
  }
  return randomString;
};

const getClientSeed = () => {
  // try to get the client seed from local storage
  let clientSeed = localStorage.getItem('client-seed');
  // if there isn't a client seed set on the client
  if (!clientSeed) {
    // generate a new client seed
    clientSeed = randomString(20);
    // set the generated client seed to local storage so it will be stored opn reloading
    localStorage.setItem('client-seed', clientSeed);
  }
  return clientSeed;
};
const getHashedServerSeed = async () => await $.ajax('/api/hashed-server-seed');
