import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface IRequestConfig extends AxiosRequestConfig {
  onFailure?: (error: AxiosError) => void
  onSuccess?: (response: AxiosResponse) => void
}