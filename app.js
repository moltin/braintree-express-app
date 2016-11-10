const express = require('express');
const braintree = require('braintree');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Braintree configuration
const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'mbpcg2mwhg3k97fh',
  publicKey: 'gjdnzjymtvcr2fq8',
  privateKey: '65ecbf82a2d043fcfc2998a6934af1ad',
});

// App configuration
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cors());

app.get('/braintree', (req, res) => {
  const customerId = req.query.customer;

  gateway.customer.find(customerId, (err, customer) => {
    res.json(customer.paymentMethods);
  });
});

app.listen(3000, () => {});
