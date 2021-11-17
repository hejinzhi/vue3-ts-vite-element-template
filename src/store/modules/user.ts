import { login, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import { ActionContext } from "vuex";

export interface IUserSate {
  token: string | undefined;
  name: string;
  avatar: string;
}

const getDefaultState = (): IUserSate => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state: IUserSate) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state: IUserSate, token: string) => {
    state.token = token;
  },
  SET_NAME: (state: IUserSate, name: string) => {
    state.name = name;
  },
  SET_AVATAR: (state: IUserSate, avatar: string) => {
    state.avatar = avatar;
  },
};

interface IUserInfo {
  avatar: string;
  dept: string;
  deptId: number;
  id: number;
  isSuper: boolean;
  name: string;
  power: string;
  roles: Array<string>;
  tel: string;
  type: string;
  password: string;
}

const actions = {
  // user login
  login({ commit }: ActionContext<IUserSate, {}>, userInfo: IUserInfo) {
    const { tel, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ tel: tel.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve(1);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit }: ActionContext<IUserSate, {}>) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((data) => {
          if (!data) {
            return reject("Verification failed, please Login again.");
          }
          const { name, avatar } = data;
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }: ActionContext<IUserSate, {}>) {
    return new Promise((resolve, reject) => {
      removeToken(); // must remove  token  first
      resetRouter();
      commit("RESET_STATE");
      resolve(true);
    });
  },

  // remove token
  resetToken({ commit }: ActionContext<IUserSate, {}>) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve(true);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
