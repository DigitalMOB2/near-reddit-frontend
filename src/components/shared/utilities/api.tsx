import {config} from '../../../config';

export function getBackendEndpoint(path: string) {
    return `${config.backendUrl}${path}`
}