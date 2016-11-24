'use strict';

const fs = require('fs');
const yargs = require('yargs');
const express = require('express');
const NFSPrometheus = require('./util/NFSPrometheus');
const nfsParser = require('./util/nfsParser');

const argv = yargs.usage('Usage: $0 [options]')
              .example('$0 -p 9123 -n /proc/net/rpc/nfsd')
              .alias('p', 'port')
              .alias('n', 'nfs')
              .alias('h', 'help')
              .default('p', 9123)
              .default('n', '/proc/net/rpc/nfsd')
              .describe('n', 'Location of nfsd proc file')
              .help('h')
              .argv;

const nfsprom = new NFSPrometheus();

function scrape(req, res, next) {
  fs.readFile(argv.n, 'utf8', (err, data) => {
    if (err) console.error(`Error reading ${argv.n}: ${err}`);
    else {
      const parsedData = nfsParser.parse(data);
      nfsprom.setGauges(parsedData);
    }
    next();
  });
}

const app = express();

app.get('/metrics', scrape, nfsprom.getProm().metricsFunc());

app.listen(argv.p, () => {
  console.log(`Server listening on port ${argv.p}`);
});
app.on('error', (err) => {
  console.error(`Metric server error: ${err}`);
});
