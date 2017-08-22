import { NluVerdict } from './nlu/NluVerdict'
import { PassAction } from './actions/PassAction'

const Intents = {
    findInMenu: '?findInMenu',
    callWaiter: '?callWaiter'
}

const IntentsToActions = {
}


export const Dispatcher = {
    findAction: (verdict: NluVerdict) => {
        const Action = IntentsToActions[verdict.intent]

        if (Action) {
            return new Action()
        } else {
            //return PassAction
        }
    }
}