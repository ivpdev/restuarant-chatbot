import { Action } from './Action'
import { NluVerdict} from '../nlu/NluVerdict'


//IdentityAction ?
export class PassAction implements Action {
    process(verdict: NluVerdict): any {
        return verdict.response

    }
}
