const _ = require('lodash');
const BillingCycle = require('./billingCycle');

BillingCycle.methods(['get', 'post', 'put', 'delete']);
BillingCycle.updateOptions({new: true, runValidators: true});

BillingCycle.after('post', sendErrosOrNext).after('put', sendErrosOrNext);

function sendErrosOrNext(req, res, next) {
  const bundle = req.locals.bundle;

  if(bundle.errors) {
    var erros = parseErrors(bundle.errors)
    res.status(500).json({erros})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const erros = [];
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return erros;
}

BillingCycle.route('count', function (req, res, next) {
  BillingCycle.count(function (error, value) {
    if(error) {
      res.status(500).json({error: [error]})
    } else {
      res.json({value})
    }
  })
})
module.exports = BillingCycle;