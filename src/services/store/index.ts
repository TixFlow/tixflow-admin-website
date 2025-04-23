import { authApi } from "@/services/apis/auth.api";
import { userApi } from "@/services/apis/user.api";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
export const makeStore = () => {
  return configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
  });
};

setupListeners(makeStore().dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
