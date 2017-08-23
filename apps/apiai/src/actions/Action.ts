import { NluVerdict } from '../nlu/NluVerdict'


//WelcomeAnswerBuilder
//WelcomeAnswerer
//WelcomeProcesser
//AnswerForWelcome
export interface Action {
	process(verdict: NluVerdict): string
}
