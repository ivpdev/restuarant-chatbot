const builder = require('botbuilder');

const dialog = {
    name: '$name',

    trigger: {
        matches: '$matches'
    },

    steps: [(session) => {
        session.endDialog('$message')
    }]}

module.exports = dialog;