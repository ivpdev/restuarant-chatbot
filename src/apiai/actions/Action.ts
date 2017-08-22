import { NluVerdict } from '../nlu/NluVerdict'


export interface Action {
	process (verdict: NluVerdict): string
}
