import { ApiAiNluService } from './nlu/impl/ApiAiNluService'
import { Dispatcher } from './Dispatcher'

const userConnector = {
    onUserMessage: (fn) => { conosle.log('TODO') },
    send: (fn) => { console.log('TODO') }
}

const nluService = new ApiAiNluService(null, null)

//TODO async
userConnector
    .onUserMessage(message => {
        //const semantics or meaning or essense or decitsion or judjement or decree or precept
        const verdict = nluService.understand(message) //or analyze or recognize or understand or seeInto or examine or consider
        const action = Dispatcher.findAction(verdict)
        const answer = action.process(verdict)

        userConnector.send(answer)
    })