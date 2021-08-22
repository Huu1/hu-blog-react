import { Avatar, Button, Menu, MenuItem } from "@material-ui/core";
import React, { Fragment } from "react";
import { useState } from "react";
import { User } from "types";
import './index.less'

export const UserAvatar = ({ user }: { user: User }) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Fragment>
      <div onClick={handleClick}>
        <Avatar src={user!.avatar} />
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>个人中心</MenuItem>
        <MenuItem onClick={handleClose}>退出</MenuItem>
      </Menu>
    </Fragment>
  )
}
