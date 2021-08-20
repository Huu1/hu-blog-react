import React, { Fragment } from 'react';
import { TextField } from '@material-ui/core';

export default function Register(props: any) {
  const { dispatch } = props;


  const onUsernameChange = (value: any) => dispatch({
    type: 'username',
    payload: value.target.value
  });
  const onPassowrdChange = (value: any) => dispatch({
    type: 'password',
    payload: value.target.value
  });
  const onRePassowrdChange = (value: any) => dispatch({
    type: 'confirm',
    payload: value.target.value
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
      <TextField
        id="repassword"
        label="确认密码"
        type="password"
        fullWidth
        onChange={onRePassowrdChange}
      />
    </Fragment>
  );
}




// import React, { Fragment } from 'react';
// import { TextField } from '@material-ui/core';

// export default function Register(props: any) {
//   const { regUname, regPassword, regRePassword,setRegUname, setRegPassword,setRePassword } = props;

//   const onUsernameChange = (value: any) => setRegUname(value.target.value);
//   const onPassowrdChange = (value: any) => setRegPassword(value.target.value);
//   const onRePassowrdChange = (value: any) => setRePassword(value.target.value);

//   return (
//     <Fragment>
//       <TextField
//         autoFocus
//         margin="dense"
//         id="name"
//         label="账号"
//         type="text"
//         fullWidth
//         value={regUname}
//         onChange={onUsernameChange}
//       />
//       <TextField
//         autoFocus
//         margin="dense"
//         id="name"
//         label="密码"
//         type="password"
//         fullWidth
//         value={regPassword}
//         onChange={onPassowrdChange}
//       />
//       <TextField
//         autoFocus
//         margin="dense"
//         id="name"
//         label="确认密码"
//         type="password"
//         fullWidth
//         value={regRePassword}
//         onChange={onRePassowrdChange}
//       />
//     </Fragment>
//   );
// }
