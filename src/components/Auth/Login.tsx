import React, { Fragment, useEffect } from 'react';
import { TextField } from '@material-ui/core';

export default function Login(props: any) {
  const { dispatch }=props;

  const onUsernameChange = (value: any) => dispatch({
    type:'username',
    payload:value.target.value
  });
  const onPassowrdChange = (value: any) => dispatch({
    type:'password',
    payload:value.target.value
  });

  return (
    <Fragment>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="账号"
        type="text"
        fullWidth
        onChange={onUsernameChange}
      />
      <TextField
        margin="dense"
        id="password"
        label="密码"
        type="password"
        fullWidth
        onChange={onPassowrdChange}
      />
    </Fragment>
  );
}