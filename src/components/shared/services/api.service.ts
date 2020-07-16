import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

import {config} from '../../../config';

export class ApiService {

    private axiosApiInstance: AxiosInstance;

    constructor() {
        const axiosConfig: AxiosRequestConfig = {
            baseURL: config.backendUrl
        };
        this.axiosApiInstance = axios.create(axiosConfig);
    }

    setRequestHeaders(headers: any) {
        this.axiosApiInstance.defaults.headers = headers;
    }

    loadRequestInterceptor(successCallback: any, errorCallback: any) {
        this.axiosApiInstance.interceptors.request.use((request: AxiosRequestConfig) => {
            successCallback(request);
            return request;
        }, (err: any) => {
            errorCallback(err);
            return Promise.reject(err);
        });
    }

    loadResponseInterceptor(successCallback: any, errorCallback: any) {
        this.axiosApiInstance.interceptors.response.use((response: AxiosResponse) => {
            successCallback(response);
            return response;
        }, (err) => {
            errorCallback(err);
            return Promise.reject(err);
        });
    }

    getInstance() {
        return this.axiosApiInstance;
    }
}
