import { APP } from "#/constants";
import axios, { AxiosResponse } from "axios";

export interface Response<T = any> extends AxiosResponse<T> {}
export interface List<T> extends Promise<Response<Array<T>>> { }
export interface Object<T> extends Promise<Response<T>> { }

export const bff = axios.create({
  baseURL: APP.BFF_URL,
  timeout: 30000,
});