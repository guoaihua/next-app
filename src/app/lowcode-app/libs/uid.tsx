import { nanoid, customAlphabet } from 'nanoid'


export const createId = ()=> {
    return +customAlphabet('1234567890', 10)()
}