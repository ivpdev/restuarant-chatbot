const restify = require('restify');
const builder = require('botbuilder');
const mainDialog = require('./dialog/mainDialog')
const helpDialog = require('./dialog/helpDialog')

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

const bot = new builder.UniversalBot(connector);

const appId = 'c9f81e49-e216-423f-9410-2f8fa879c96a'
const subscriptionKey = 'f96572e301d14a6283e3cd8cb38b5b50'
const luisAppUrl = process.env.LUIS_APP_URL ||
                        'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/' + appId + '?subscription-key=' + subscriptionKey;

const luisRecognizer = new builder.LuisRecognizer(luisAppUrl);
bot.recognizer(luisRecognizer);

bot.dialog('debug', [(session, args, next) => {
               // Resolve and store any Note.Title entity passed from LUIS.
               var intent = args.intent;
               session.endDialog('Debug. Intent: %s!', intent) }])
.triggerAction({
    matches: 'Debug'
})


bot.dialog('showDrinks', (session, args, next) => {
               // Resolve and store any Note.Title entity passed from LUIS.
               var intent = args.intent;
               session.endDialog('In show drinks. Intent: %s!', intent) })
.triggerAction({
    matches: '?showDrinks'
})



