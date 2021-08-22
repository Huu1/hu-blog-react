/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import WriterTopBar from "./WriteTopVar";

import Vditor from 'vditor'
import "../../../node_modules/vditor/dist/index.css"
import './index.less';
import _ from "lodash";
import { useHttp } from "utils/http";
import { useHistory, useParams } from "react-router-dom";
import { useDebounce, useMount } from "utils/hooks";
import { useAsync } from "utils/useAsync";
import qs from "qs";
import { useCallback } from "react";
import { useDataApi } from "utils/useApi";
import { createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const articleReducer = (state: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case 'TITLE-CHANGE':
      return {
        ...state,
        title: payload
      };
    case 'CONTENT-CHANGE':
      return {
        ...state,
        content: payload,
      };
    case 'INIT':
      return {
        ...state,
        ...payload,
      }
    default:
      throw new Error();
  }
};
export function Write() {

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [state, dispatch] = useReducer(articleReducer, { title: '无标题文章', content: '' });
  const { title, content } = state;
  const [vditor, setVditor] = useState<Vditor | null>(null);

  const { run, isLoading } = useAsync();
  const client = useHttp();

  const classes = useStyles();

  // 初始化编辑器
  useEffect(() => {
    const vditor: Vditor = new Vditor('vditor', {
      height: '100%',
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      input() {
        dispatch({
          type: 'CONTENT-CHANGE',
          payload: vditor.getValue()
        })
      },
      after() {
        // vditor?.setValue('res.data.content');
      }
    })
    setVditor(vditor);
    return (() => {
      vditor && vditor.destroy();
    })
  }, [id])

  useEffect(() => {
    // if (id !== 'new') {
    //   // 获取文章数据 回显编辑器
    //   client('draft/detail/' + id, { method: 'GET' }).then(res => {
    //     if (res.errorCode === 0)
    // vditor?.setValue('res.data.content');
    // console.log(vditor);

    //   }).catch(() => {

    //   })
    // }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const debounceTitle = useDebounce(title, 300);
  const debounceContent = useDebounce(content, 300);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    } else {
      run(client('draft/edit', {
        method: 'post', data: {
          title: debounceTitle,
          content: debounceContent,
          id
        }
      })).then((res: any) => {

      })
    }
  }, [debounceTitle, debounceContent, id]);

  const onTitleChange = (value: string) => {
    dispatch({
      type: 'TITLE-CHANGE',
      payload: value
    })
  }

  return (
    <div className="">
      <WriterTopBar loading={isLoading} title={title} onTitleChange={onTitleChange} />
      <div className='flex'>
        <div className='side'>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">分类</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
            >
              <MenuItem value="">
                <em>默认</em>
              </MenuItem>
              <MenuItem value={10}>分类1</MenuItem>
              <MenuItem value={10}>分类2</MenuItem>
              <MenuItem value={10}>分类3</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="edit-wrap">
          <div id='vditor' style={{ height: '100%' }}></div>
        </div>
      </div>

    </div>
  );
}


