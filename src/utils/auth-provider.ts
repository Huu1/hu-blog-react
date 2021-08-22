// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

// 存token到本地
export const handleUserResponse = ({ token ,user}: { token: any ,user:any}) => {
  window.localStorage.setItem(localStorageKey, token || "");
  return {...user,token};
};

export const login = (data: { email: string; password: string }) => {
  return fetch(`${apiUrl}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      const { errorCode, data } = await response.json();
      if (errorCode === 0) {
        const { admin: user, token } = data;
        return handleUserResponse({ user, token })
      }
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const register = (data: { email: string; password: string }) => {
  return fetch(`${apiUrl}/admin/register`, {
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
