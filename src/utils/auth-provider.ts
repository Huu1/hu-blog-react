// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

// 存token到本地
export const handleUserResponse = ({ token }: { token: any }) => {
  window.localStorage.setItem(localStorageKey, token || "");
  return undefined;
};

export const login = (data: { email: string; password: string }) => {
  return fetch(`${apiUrl}/api/v1/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      // return handleUserResponse(await response.json());
      const { errorCode, data } = await response.json();
      if (errorCode === 0) {
        return handleUserResponse(data)
      }
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const register = (data: { email: string; password: string }) => {
  return fetch(`${apiUrl}/api/v1/admin/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
