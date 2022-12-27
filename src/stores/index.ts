import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createLogger } from 'redux-logger';
import globalReducer from './modules/global';
import StoreName from '@/stores/constant';

const logger = createLogger({
  collapsed: true,
  duration: true
});

const store = configureStore({
  reducer: {
    [StoreName.Global]: globalReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true // 不让生产环境调试
});

export type StoreType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
