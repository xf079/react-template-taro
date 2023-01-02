import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import StoreName from '@/stores/constant';
import storage from '@/utils/storage/persistStorage';

const initialState = {
  appName: '',
  enterFirstMiniProgram: false
};

/**
 * 获取小程序全局配置
 */
export const getGlobalData = createAsyncThunk(
  `${StoreName.Global}/getGlobalConfig`,
  (userId: number) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(userId + '---');
      }, 2000);
    });
  }
);

const globalSlice = createSlice({
  name: StoreName.Global,
  initialState,
  reducers: {
    updateEnterFirstMiniProgram: (state, action) => {
      state.enterFirstMiniProgram = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getGlobalData.fulfilled, (state, action) => {
      state.appName = action.payload;
    });
  }
});

const persistConfig = {
  key: StoreName.Global,
  storage: storage
};

const { reducer, actions } = globalSlice;

export const { updateEnterFirstMiniProgram } = actions;

export default persistReducer(persistConfig, reducer);
