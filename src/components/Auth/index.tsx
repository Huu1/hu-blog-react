import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useReducer } from 'react';
import Login from './Login';
import Register from './Register';
import { login } from 'utils/auth-provider';
import { useAuth } from 'context/auth-provider';
import { useAsync } from 'utils/useAsync';

const Transition: any = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface ILoginModal {
  open: boolean;
  modalClose: () => void;
}

export interface IUser {
  email: string;
  password: string;
  confirm?: string;
  nickname?:string
}

function reducer(state: IUser, action: { type: string, payload?: any }) {
  const { type, payload } = action;
  switch (type) {
    case 'username':
      return { ...state, email: payload }
    case 'password':
      return { ...state, password: payload }
    case 'confirm':
      return { ...state, confirm: payload }
    case 'loginReset':
      return { ...state, ...loginInitState };
    case 'registerReset':
      return { ...state, ...registerInitState }
    default:
      throw new Error();
  }
}

const loginInitState: IUser = {
  email: '',
  password: ''
}
const registerInitState: IUser = {
  email: '',
  password: '',
  confirm: ''
}


export default function Auth(props: ILoginModal) {
  const { modalClose, open } = props;

  const { login ,register} = useAuth();

  const { run, isLoading } = useAsync();


  const [isLogin, setIslogin] = useState(true);

  const [loginState, loginDispatch] = useReducer(reducer, loginInitState);
  const [registerState, registerDispatch] = useReducer(reducer, registerInitState);

  const action = () => {
    isLogin ? toLogin() : toRegister();
  }

  const toLogin = async () => {
    try {
      await run(login(loginState));
    } catch (error) {
      console.log(error);
    }
  }

  const toRegister = async () => {
    try {
      await run(register(registerState));
    } catch (error) {
      console.log(error);
    }
  }

  const changeType = () => {
    setIslogin(value => !value);
    loginDispatch({
      type: 'loginReset'
    })
    registerDispatch({
      type: 'registerReset'
    })
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={modalClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" onClick={changeType}>
          {
            isLogin ? '登录' : '注册'
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            加入我们吧
          </DialogContentText>
          {
            isLogin ? <Login dispatch={loginDispatch} /> : <Register dispatch={registerDispatch} />
          }
        </DialogContent>

        <DialogActions>
          <Button onClick={modalClose} color="primary">
            取消
          </Button>
          <Button onClick={action} color="primary" >
            {
              isLogin ? "登录" : "注册"
            }
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
