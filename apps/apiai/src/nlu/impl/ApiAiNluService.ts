import { NluService } from '../NluService'
import { NluVerdict } from '../NluVerdict'

class ApiAiNluService implements NluService {
	constructor(private serviceUrl: string, private apiKey: string) {}

	understand(message: string): NluVerdict {
		return null
	}
}

export { ApiAiNluService }