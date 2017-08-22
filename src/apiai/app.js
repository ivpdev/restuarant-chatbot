
const userConnector = new UserConnector('whatever')

//TODO async
//onFrontEndMessage
userConnector
    .onUserMessage(message => {
        //const semantics or meaning or essense or decitsion or judjement or decree or precept
        const verdict = NLUService.understand(message) //or analyze or recognize or understand or seeInto or examine or consider
        const action = Dispatcher.findAction(verdict)
        const answer = action.process(verdict)

        userConnector.send(answer)
    })