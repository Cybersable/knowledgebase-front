import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { provideRestApiMethods } from '@/shared/rest-api/api/provideRestApiMethods';

const options: CreateAxiosDefaults = {
  baseURL: 'http://localhost:4200/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

class RestApiClient {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create(options);
  }
}

const restApiClient = new RestApiClient();

export const restApiMethods = provideRestApiMethods(restApiClient.client);
