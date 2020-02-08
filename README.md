# winston-mailgun

A Mailgun transport for [winston][0].

## Installation

### Installing npm (node package manager)

``` bash
  $ curl http://npmjs.org/install.sh | sh
```

### Installing winston-mailgun

``` bash
  $ npm install winston
  $ npm install winston-mailgun (Not ready on NPM)
```

There are a few required options for logging to Papertrail:

* __apiKey:__ The apiKey provided by mailGun
* __domain:__ The domain setup or provided by mailGun
* __to:__ The to email is where the emails will be sent to


## Usage
``` js
  var winston = require('winston');
  winston.transports.MailGun = require('winston-mailgun');
  
  var winstonMailgun = new winston.transports.MailGun({
	apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_API_DOMAIN,
    to: 'TO EMAIL',
    from: 'FROM EMAIL',
    level: 'LEVEL',
    silent: false,
    subject: 'SUBJECT LINE',
  });

  var logger = new winston.Logger({
	transports: [winstonMailgun]
  });

  logger.info('this is my message');
```

There are a number of optional settings:

- `from`    - The from email is who the emails will be sent from, defaults to `winston@ + os.hostname()`
- `level`   - The log level to use for this transport, defaults to `info`
- `silent`  - defaults to `false`
- `subject` - The subject line of the email, defaults to ``
- `handleExceptions` - defaults to `false`
- `proxy` - 
- `timeout` - 

#### Author: [Mateo Wartelle](https://github.com/MateoWartelle)

[0]: https://github.com/flatiron/winston
