let builder = require('botbuilder');

let dialog = {
    name: 'help',
    trigger: {
        matches: /^help$/i,
    },
    steps: [(session) => {
               builder.Prompts.text(session, 'Ololo') },

            (session, results) => {
               session.endDialog('Help: %s!', results.response) }]}

module.exports = dialog;