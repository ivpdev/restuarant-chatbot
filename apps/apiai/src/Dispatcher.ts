import { NluVerdict } from './nlu/NluVerdict'
import { Action } from './actions/Action'
import { PassAction } from './actions/PassAction'

const Intents = {
    findInMenu: '?findInMenu',
    callWaiter: '?callWaiter'
}

const IntentsToActions = {

}

const Dispatcher = {
    findAction: (verdict: NluVerdict): Action => {
        const ActionClass = IntentsToActions[verdict.intent]

        if (ActionClass) {
           return new ActionClass()
        } else {
            return new PassAction()
        }
    }
}

export { Dispatcher }