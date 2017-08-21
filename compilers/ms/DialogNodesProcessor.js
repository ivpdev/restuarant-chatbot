const _ = require('lodash')

var counter = 0

const stepCodeTemplate = `(session) => {  session.endDialog('$message') }`

const generateStepCode = (message) => {
    const messageEscaped = message.replace("'", ' ') //TODO

    return stepCodeTemplate.replace('$message', messageEscaped)
}

const DialogNodesProcessor = {
    prepareDialogs: (dialogSource) => {
        const nodes = dialogSource.dialog

        const dialogs = nodes.map((node) => {
            const name = node.name
            const intent = node.intent //TODO handle inline intents
            const responses = node.responses //TODO read from file
            //const action = node.action
            const type = node.type
            let dialog = null


            const normalNode = !type || type === 'normal'

            if (normalNode) {
                dialog = {}

                dialog.name = name || intent.replace(/[^a-zA-Z0-9]/g,'_') + counter++; //TODO check original name for uniqueness
                dialog.intent = intent

                let response = _.isArray(responses) ? responses[0] : responses
                if (!response) {
                    response = 'DEBUG: no action or response defined for intent "' + intent + '"'
                }

                dialog.steps = generateStepCode(response)

                //const action = node.action ? action :

            }

            return dialog
        })

        return _.filter(dialogs)
    }
}

module.exports = DialogNodesProcessor