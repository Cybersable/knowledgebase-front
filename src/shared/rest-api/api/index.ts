import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'

const isServer = typeof window === 'undefined'

const getBaseUrl = () => {
  let baseUrl = 'http://localhost:4200'

  if (isServer && process.env.BE_URL) {
    baseUrl = process.env.BE_URL
  }

  return `${baseUrl}/api`
}

const options: CreateAxiosDefaults = {
  baseURL: getBaseUrl(),
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
