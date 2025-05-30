/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { toast } from 'sonner';

type THeaderConfig = { [key: string]: string };

interface IApiConfig {
  path?: string;
  method?: 'GET' | 'POST';
  params?: Record<string, any>;
  headers?: THeaderConfig;
  body?: BodyInit | null;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  next?: { tags: string[] };
}

export const createConfig = async (config: IApiConfig) => {
  const baseURL = process.env.NEXT_PUBLIC_SERVICE_URL + '/';
  const path = config.path ? baseURL + config.path : baseURL;

  const headers: THeaderConfig = {
    'Content-Type': 'application/json',
    ...config.headers,
  };

  const manipulatedConfig: IApiConfig = {
    ...config,
    method: 'GET',
    redirect: 'follow',
    credentials: 'include',
    cache: 'no-store',
    headers: headers,
    next: { tags: ['quote'] },
    params: { ...config.params },
  };

  return { path, manipulatedConfig };
};

export async function baseFetch<T = any>(url: string, config: IApiConfig): Promise<TServiceListResponse<T> | null> {
  const { path, manipulatedConfig } = await createConfig(config);
  const manipulatedUrl = url?.[0] === '/' || url === '' ? url : '/' + url;
  const completeURL = new URL(path + manipulatedUrl);
  const params = { ...manipulatedConfig.params, ...(config.params || {}) };

  if (params) {
    Object.keys(params).forEach((key) => completeURL.searchParams.append(key, params![key]));
  }

  try {
    const response = await fetch(completeURL, manipulatedConfig);
    if (!response.ok) throw response;
    return response.json();
  } catch (error: any) {
    toast.error(error.message);
    return null;
  }
}

export const get = async <T>(url: string, config?: IApiConfig) => {
  const response = await baseFetch<T>(url, { ...config, method: 'GET' });
  return response;
};
