import qs from "qs";
import * as auth from "./auth-provider";
import { useAuth } from "context/auth-provider";
import { encode } from 'js-base64';

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

/**
 * 
 * @param endpoint 请求地址
 * @param param1 请求设置
 * @returns 
 */
export const http = async (endpoint: string, { data, token, headers, ...costomConfig }: Config ={}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Basic ${encode(token+':')}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...costomConfig
  }
  if (config.method?.toLocaleUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(
    async response => {
      if (response.status === 401) {
        // 无权限
        // await auth.logout();
        // window.location.reload();
        return Promise.reject({ messgae: '请重新登录' })
      }

      const data = await response.json()
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    }
  )
}

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}
