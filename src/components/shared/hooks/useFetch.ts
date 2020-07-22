import {useState, useEffect, useMemo, useCallback} from 'react';
import {AxiosResponse} from 'axios';
import HttpCodes from 'http-status-codes';

import {ApiService} from '../services/api.service';
import {FetchErrorType} from './fetch-error.type';
import {FetchOptionsType} from './fetch-options.type';
import {useAuth} from '../../pages/Main/Homepage/Auth.context';

export const useFetch = (options: FetchOptionsType = {}) => {

    const defaultErr: FetchErrorType = null;
    const authCtx = useAuth();

    const [response, setResponse] = useState({});
    const [responseData, setResponseData] = useState(options.initialResponseData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(defaultErr);

    const apiService = useMemo(() => new ApiService(), []);
    const apiInstance = useMemo(() => apiService.getInstance(), []);

    const put = useCallback((...args) => {
        const requestParams = buildRequestParams(args);
        return apiInstance.put(requestParams[0], requestParams[1]);
    }, []);

    const patch = useCallback((...args) => {
        const requestParams = buildRequestParams(args);
        return apiInstance.patch(requestParams[0], requestParams[1]);
    }, []);

    const post = useCallback((...args) => {
        const requestParams = buildRequestParams(args);
        return apiInstance.post(requestParams[0], requestParams[1]);
    }, []);

    const remove = useCallback((...args) => {
        const requestParams = buildRequestParams(args);
        return apiInstance.delete(requestParams[0], requestParams[1]);
    }, [options.path]);

    const get = useCallback((url = options.path) => {
        return apiInstance.get(url);
    }, []);

    const buildRequestParams: any = useCallback((args: any) => {
        if (args.length === 1) {
            return [options.path, args[0]];
        }
        return [args[0], args[1]];
    }, []);

    const buildError: any = useCallback((error: any) => {
        let errorResponse = {
            message: error.toJSON ? error.toJSON().message : 'An unexpected error appeared! Please try again later.',
            code: 0
        }

        if (error.response) {
            errorResponse = {
                ...error.response.data,
                code: error.response.status
            };
        }
        return errorResponse;
    }, []);

    apiService.setRequestHeaders({
        xsrfCookieName: 'xsrfCookieName'
    });

    apiService.loadRequestInterceptor(
        (request: any) => {
            setLoading(true);
            },
        () => {});

    apiService.loadResponseInterceptor(
        (response: AxiosResponse) => {
            setError(null);
            setLoading(false);
            setResponse(response);
            setResponseData(response.data);
        },
        (error: any) => {
            if (!error.response || (error.response.data.statusCode === HttpCodes.UNAUTHORIZED)) {
                authCtx.logout();
            }
            setError(buildError(error));
            setLoading(false);
        });

    const initRequestOptions = useCallback(async () => {
        const method = options.method || 'GET';
        const load = options.load !== undefined ? options.load : true;

        if (load) {
            try {
                setLoading(true);
                setError(null);
                await apiInstance.request({
                    url: options.path,
                    data: options.requestData,
                    method,
                });
            } catch(error) {
                setLoading(false);
                setError(buildError(error));
            }
        }

    }, [apiInstance, options]);

    useEffect(() => {
        if (Object.keys(options).length > 0) {
            initRequestOptions();
        }
    }, []);

    return { responseData, loading, response, error, put, get, post, patch, remove };
};