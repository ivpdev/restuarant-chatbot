const builder = require('botbuilder');

const dialog = {
    name: 'main',
    trigger: {
        matches: /^hi$/i,
    },
    steps: [(session) => {
               builder.Prompts.text(session, 'Hi! What is your name?') },

            (session, results) => {
               session.endDialog('Hello %s!', results.response) }]}

module.exports = dialog;