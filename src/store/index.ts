import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";

import app, { IAppState } from "./modules/app";
import settings, { ISettingState } from "./modules/setting";
import user, { IUserSate } from './modules/user'


export interface GlobalDataProps {
  app: IAppState;
  user: IUserSate;
  settings: ISettingState
}

export const GlobalDataPropsKey: InjectionKey<Store<GlobalDataProps>> = Symbol()


export default createStore<GlobalDataProps>({
  getters: {
    sidebar: (state) => state.app.sidebar,
    device: (state) => state.app.device,
    token: (state) => state.user.token,
    avatar: (state) => state.user.avatar,
    name: (state) => state.user.name,
  },
  modules: {
    settings,
    user,
    app,
  },
});
