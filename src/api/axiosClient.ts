import axios, { AxiosError, AxiosInstance } from 'axios'
import _ from 'lodash'

/** Setting timeout of axios */
const AXIOS_TIMEOUT: number = 10000

/** API url */
// const BASE_URL: string = import.meta.env.VITE_API_URL

class AxiosClient {
  private axios: AxiosInstance
  public exception: AxiosError | undefined
  private config = {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
  }

  constructor() {
    this.axios = axios.create({
      //   baseURL: BASE_URL,
      timeout: AXIOS_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    this.axios.interceptors.request.use(
      async (config: any) => {
        // const token = store.getState().user.token

        // if (token) {
        //   config.headers['X-API-TOKEN'] = `Bearer ${token}`
        // }
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      },
    )

    this.axios.interceptors.response.use(
      (response: any) => {
        return response
      },
      (error: any) => {
        const { statusCode } = _.get(error, 'response.data', {})
        const serverError = _.get(error, 'response.data', {})
        if (statusCode === 401) {
          //something
        }
        return Promise.reject(serverError)
      },
    )
  }
}

export default new AxiosClient()
