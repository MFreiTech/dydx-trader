const rp = require ('request-promise');

// URIs - esto se supone que no lo vas a tocar @lucas
const BASE_URI = 'http://localhost:3000'
const CANCEL_ALL_URI = BASE_URI + '/api/orders/cancel-all';
const BUY_MANY_URI = BASE_URI + '/api/orders/buy-many';
const SELL_MANY_URI = BASE_URI + '/api/orders/sell-many';

/* ----------------------   PARÁMETROS CONFIGURABLES ------------------------------  */
const SECONDS_INTERVAL = 10; // Cycle interval in seconds

// Buy Many params
const BUY_MANY_BODY = {
  "amount": 0.1,
	"separation": 2
};

// Sell Many params
const SELL_MANY_BODY = {
  "amount": 0.1,
	"separation": 2
};

/* ---------------------------------------------------------------------------------- */

const doRequest = async ({ uri, body = {} }) => {
  let response = null;
  try {
    response = await rp.post({
      uri,
      body,
      json: true
    })
  } catch (error) {
    console.log(`[${new Date().toISOString()}]`, error.message);
  }

  return response && response.body;
}

let counter = 1;

setInterval(async () => {
  console.log(`${counter++} - Starting cycle at [${new Date().toISOString()}]`)
  // Cancel all of the orders
  const cancelResponse = await doRequest({ uri: CANCEL_ALL_URI });
  console.log(JSON.stringify(cancelResponse));
  console.log('-------------------------------------------------\n');

  // Buy Many
  const buyResponse = await doRequest({ uri: BUY_MANY_URI, body: BUY_MANY_BODY });
  console.log(JSON.stringify(buyResponse));
  console.log('-------------------------------------------------\n');

  // Sell Many
  const sellResponse = await doRequest({ uri: SELL_MANY_URI, body: SELL_MANY_BODY });
  console.log(JSON.stringify(sellResponse));
  console.log('-------------------------------------------------\n');
}, SECONDS_INTERVAL * 1000);