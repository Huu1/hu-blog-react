import React, { ReactNode, useContext } from "react";
import * as auth from 'utils/auth-provider';
import { User } from "types";
import { http } from "utils/http";
import { useMount } from "../util";
import { useAsync } from "utils/useAsync";
import { log } from "console";
import { IUser } from "components/Auth";
// import { FullPageError, FullPageLoading } from "components/lib";

interface AuthForm extends IUser {

}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // const data = await http('me', { token })
    // user = data.user;
  }
  return user;
}

const AuthContext = React.createContext<{
  user: User | null,
  register: (form: AuthForm) => Promise<void>,
  login: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>,
} | undefined>(undefined);

AuthContext.displayName = 'AuthContext'


export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const { data: user, error, isLoading, isIdel, isError, run, setData: setUser } = useAsync<User | null>()

  const login = (form: AuthForm) => auth.login(form).then()
  const register = (form: AuthForm) => auth.register(form).then()
  const logout = () => auth.logout().then(() => setUser(null))
  
  useMount(() => {
    run(bootstrapUser())
  })
  
  if (isIdel || isLoading) {
    // return (
    //   <FullPageLoading />
    // )
  }

  if (isError) {
    // return <FullPageError error={error}></FullPageError>
  }

  return <AuthContext.Provider value={{ user, login, register, logout }} >
    {children}
  </AuthContext.Provider>
}

// 获取 全局 provider信息
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('userAuth必须在AuthProvider中使用')
  }
  return context;
}