import { bff, Object } from "@/services/bff/server";

export const ENDPOINTS = {
  ONE: () => "/v1/one",
};

export const BFF = {
  ONE: (): Object<{}> => bff.get(ENDPOINTS.ONE()),
};
