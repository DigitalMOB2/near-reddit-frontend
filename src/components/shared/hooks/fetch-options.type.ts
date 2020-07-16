export type FetchOptionsType = {
    path?: string,
    requestData?: any,
    method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT',
    load?: boolean,
    initialResponseData?: any
};
