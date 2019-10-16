$(document).ready(async () => {
  // get hashed server seed when the page is loading for the first time
  const hashedServerSeed = await getHashedServerSeed();
  // get client seed for further usages
  let clientSeed = getClientSeed();

  // seleting general page elements
  const $hashedServerSeedBox = $('#hashed-server-seed');
  const $clientSeedInput = $('#client-seed-input');
  const $verifyClientSeedInput = $('#verify-client-seed-input');
  const $verifyNonceInput = $('#verify-nonce-input');
  const $verifyServerSeedInput = $('#verify-server-seed-input');
  const $rollResultsContainer = $('#roll-results-container');
  const $rollResult = $('#roll-result');
  const $serverSeed = $('#server-seed');
  const $nonce = $('#nonce');
  const $verifyRollResultsContainer = $('#verify-roll-results-container');
  const $verifyRollResult = $('#verify-roll-result');
  // set hashed server seed so that the client can see this before rolling
  $hashedServerSeedBox.text(hashedServerSeed);
  // set client seed content
  $clientSeedInput.val(clientSeed);
  $verifyClientSeedInput.val(clientSeed);
  // add on click event to the roll button
  $('#roll-buton').on('click', async () => {
    const { result, serverSeed, nonce } = await $.ajax({
      url: '/api/result',
      data: {
        clientSeed,
      },
    });
    $rollResultsContainer.show();
    $rollResult.text(result);
    $serverSeed.text(serverSeed);
    $nonce.text(nonce);
    // get and update the server seed box, you can also include this data in the resutl api call so an additional request can be saved
    $hashedServerSeedBox.text(await getHashedServerSeed());
  });
  // add on submit event for the verify roll foerm
  $('#verify-bet-form').on('submit', async e => {
    e.preventDefault();
    // get values from inputs
    const clientSeed = $verifyClientSeedInput.val();
    const nonce = $verifyNonceInput.val();
    const serverSeed = $verifyServerSeedInput.val();
    // create an ajax request to the server to compute the values provided into a result
    const result = await $.ajax({
      url: '/api/verify',
      data: {
        clientSeed,
        nonce,
        serverSeed,
      },
    });
    // update html elements to displat the returned result
    $verifyRollResultsContainer.show();
    $verifyRollResult.text(result);
  });
  // add event handler for the client seed input
  $clientSeedInput.on('change', e => {
    // update the client seed with the input value when it changes
    clientSeed = e.target.value;
  });
});
