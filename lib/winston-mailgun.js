const Transport = require('winston-transport');
const os = require('os');
const mailgun = require('mailgun-js');

//
// Inherit from `winston-transport` so you can take advantage
// of the base functionality and `.exceptions.handle()`.
//
module.exports = class MailGun extends Transport {
    constructor(opts) {
        super(opts);
        if (!opts.to) {
            throw new Error("winston-mailgun requires 'to' property");
        }
        if (!opts.apiKey) {
            throw new Error("winston-mailgun requires 'apiKey' property");
        }
        if (!opts.domain) {
            throw new Error("winston-mailgun requires 'domain' property");
        }
        this.to = opts.to;
        this.from = opts.from || "winston@" + os.hostname();
        this.level = opts.level || 'info';
        this.silent = opts.silent || false;
        this.subject = opts.subject

        this.handleExceptions = opts.handleExceptions || false;
        this.mailgun = mailgun({
            apiKey: opts.apiKey,
            domain: opts.domain,
            proxy: opts.proxy,
            timeout: opts.timeout
        });
    }

    log(info, callback) {
        let self = this;
        if (this.silent) return callback(null, true);

        var body = JSON.stringify(info);
        var msgOptions = {
            from: this.from,
            to: this.to,
            subject: this.subject,
            text: body
        };
        this.mailgun.messages().send(msgOptions, function (err) {
            if (err) self.emit('error', err);
            self.emit('logged', info);
            callback(null, true);
        });
    }
};