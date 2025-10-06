import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiResponse } from '../models'

/**
 * Base API client configuration for JSONPlaceholder
 * This client handles all HTTP communication with external APIs
 */
class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      config => {
        // Add any request modifications here (auth tokens, etc.)
        console.log(
          `Making ${config.method?.toUpperCase()} request to: ${config.url}`
        )
        return config
      },
      error => {
        console.error('Request error:', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Add any response modifications here
        console.log(
          `Response received: ${response.status} ${response.statusText}`
        )
        return response
      },
      error => {
        console.error('Response error:', error)
        return Promise.reject(error)
      }
    )
  }

  /**
   * Generic GET request
   */
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.get<T>(url, config)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    }
  }

  /**
   * Generic POST request
   */
  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<T>(url, data, config)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    }
  }

  /**
   * Generic PUT request
   */
  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<T>(url, data, config)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    }
  }

  /**
   * Generic PATCH request
   */
  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch<T>(url, data, config)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    }
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<T>(url, config)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    }
  }

  /**
   * Get the underlying axios instance for advanced usage
   */
  getInstance(): AxiosInstance {
    return this.client
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
export default apiClient
