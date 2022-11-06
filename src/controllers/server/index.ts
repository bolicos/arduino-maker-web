import { APP } from "#/constants";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export type Bff = AxiosInstance;
export type Get = typeof axios.get;
export type Post = typeof axios.post;
export type Delete = typeof axios.delete;
export type Put = typeof axios.put;
export type Patch = typeof axios.patch;

export type ResponseDto<T = any> = AxiosResponse<T>
export type ListDto<T> = Promise<ResponseDto<Array<T>>>
export type ObjectDto<T> = Promise<ResponseDto<T>>

export const BFF_INSTANCE: Bff = axios.create({
  baseURL: APP.BFF_URL,
  timeout: 30000,
});