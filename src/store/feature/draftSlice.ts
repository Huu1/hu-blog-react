import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http, useHttp } from 'utils/http';

// 草稿

const initialState = {
  drafts: [],
  status: 'idle',
  error: null
}

export const fetchDrafts: any = createAsyncThunk('drafts/fetchDrafts', async (cb: () => void = () => { }) => {
  const { errorCode: code, data } = await http('draft/all');
  if (code === 0) {
    cb();
    return data;
  } else {
    return []
  }
})

export const delDrafts: any = createAsyncThunk('drafts/delDrafts', async (param: any = {}) => {
  const { errorCode: code, data } = await http('draft/delete', { data: param, method: 'post' });
  if (code === 0) {
    return param.id;
  } else {
    // return []
  }
})

const draftSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchDrafts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchDrafts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.drafts = action.payload
    },
    [fetchDrafts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [delDrafts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [delDrafts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.drafts.splice(state.drafts.findIndex((i: any) => i.id === action), 1);
    },
    [delDrafts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export default draftSlice.reducer

export const selectAllDrafts = (state: { drafts: { drafts: any; }; }) => state.drafts.drafts