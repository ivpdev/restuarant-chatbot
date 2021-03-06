const restify = require('restify');
const builder = require('botbuilder');
const mainDialog = require('./dialog/mainDialog')
const helpDialog = require('./dialog/helpDialog')

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});


const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());


const bot = new builder.UniversalBot(connector);

const appId = process.env.LUIS_APP_ID
const subscriptionKey = process.env.LUIS_SUBSCRIPTION_KEY
const luisAppUrl = process.env.LUIS_APP_URL ||
                        'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/' + appId + '?subscription-key=' + subscriptionKey;

const luisRecognizer = new builder.LuisRecognizer(luisAppUrl);
bot.recognizer(luisRecognizer);

bot
  .dialog('debug', [(session, args, next) => {
        const intent = args.intent;
        session.endDialog('Debug. Intent: %s!', intent) }])
  .triggerAction({
        matches: 'Debug' })

bot
  .dialog('showDrinks', (session, args, next) => {
        const intent = args.intent;
        session.endDialog('In show drinks. Intent: %s!', intent) })
   .triggerAction({
        matches: '?showDrinks' })



