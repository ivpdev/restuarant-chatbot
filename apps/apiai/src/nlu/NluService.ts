import { NluVerdict } from './NluVerdict'

interface NluService {
    understand(message: string): NluVerdict 
}

export { NluService }
