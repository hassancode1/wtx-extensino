import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocalItem = (item: string) => localStorage.getItem(item);

export const setLocalItem = (item: string, value: string) =>
  localStorage.setItem(item, value);

export const clearLocalItem = (item: string) => localStorage.removeItem(item);

export const getLocalAccessToken = () => getLocalItem("accessToken");
export const getLocalRefreshToken = () => getLocalItem("ds_refresh_token");
export const getLocalUser = () => JSON.parse(getLocalItem("ds_user") || "{}");

export const setLocalAccessToken = (value: string) =>
  setLocalItem("accessToken", value);
export const setLocalRefreshToken = (value: string) =>
  setLocalItem("ds_refresh_token", value);
export const setLocalUser = (value: string) => setLocalItem("ds_user", value);

export const clearLocalAccessToken = () => clearLocalItem("accessToken");
export const clearLocalRefreshToken = () => clearLocalItem("ds_refresh_token");
export const clearLocalUser = () => clearLocalItem("ds_user");
