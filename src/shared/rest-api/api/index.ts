import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
  baseURL: 'http://localhost:4200/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

class RestApiClient {
  client: AxiosInstance

  constructor() {
    this.client = axios.create(options)
  }
}

const restApiClient = new RestApiClient()

export const restApi = restApiClient.client
