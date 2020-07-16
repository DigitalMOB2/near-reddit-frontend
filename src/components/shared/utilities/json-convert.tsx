import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript'

export const getJsonConvert = () => new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL)