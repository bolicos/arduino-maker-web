import axios, { AxiosResponse } from "axios";

export interface Response<T = any> extends AxiosResponse<T> {}
export interface List<T> extends Promise<Response<Array<T>>> { }
export interface Object<T> extends Promise<Response<T>> { }

export const bff = axios.create({
  baseURL: "https://arduino-maker-bff.herokuapp.com/",
  timeout: 30000,
});
