let restify = require('restify');
let builder = require('botbuilder');
let mainDialog = require('./dialog/mainDialog')
let helpDialog = require('./dialog/helpDialog')

// Setup Restify Server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
let connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
let bot = new builder.UniversalBot(connector, mainDialog.steps);

bot.dialog('help', helpDialog.steps)
.triggerAction(helpDialog.trigger);